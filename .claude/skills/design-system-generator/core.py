#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Core search and data access module for Design System Generator.
Provides unified search API across CSV data sources.
"""

import csv
from pathlib import Path
from typing import Dict, List, Any

# Data directory
DATA_DIR = Path(__file__).parent / "data"


def search(query: str, domain: str, max_results: int = 5) -> Dict[str, Any]:
    """
    Search across CSV data sources for matching results.

    Args:
        query: Search query string
        domain: Data domain (style, color, typography, landing, ux, gsap, product)
        max_results: Maximum number of results to return

    Returns:
        dict with keys: "query", "domain", "results" (list of matching rows as dicts)
    """

    # Map domain to CSV file
    domain_files = {
        "style": "styles.csv",
        "color": "color-palettes.csv",
        "typography": "typography.csv",
        "landing": "landing-patterns.csv",
        "ux": "ux-guidelines.csv",
        "gsap": "motion.csv",
        "product": "products.csv",
    }

    filename = domain_files.get(domain, f"{domain}.csv")
    filepath = DATA_DIR / filename

    # Return empty if file doesn't exist
    if not filepath.exists():
        return {"query": query, "domain": domain, "results": []}

    # Search the CSV
    results = []
    query_lower = query.lower()

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                # Search across all fields
                row_str = " ".join(str(v).lower() for v in row.values())

                # Score based on matches
                score = 0
                for word in query_lower.split():
                    if word in row_str:
                        # Boost score for matches in category/name fields
                        if word in row.get("Style Category", "").lower() or \
                           word in row.get("Product Type", "").lower() or \
                           word in row.get("Category", "").lower():
                            score += 10
                        else:
                            score += 1

                if score > 0:
                    results.append((score, row))
    except Exception as e:
        print(f"Warning: Could not read {filepath}: {e}")
        return {"query": query, "domain": domain, "results": []}

    # Sort by score and return top N
    results.sort(key=lambda x: x[0], reverse=True)
    top_results = [row for score, row in results[:max_results]]

    return {"query": query, "domain": domain, "results": top_results}
