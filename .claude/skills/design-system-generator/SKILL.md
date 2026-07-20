# Design System Generator Skill

Generate comprehensive design system recommendations with color palettes, typography, motion patterns, and UX guidelines.

## Installation

The generator is already installed in `.claude/skills/design-system-generator/`

## Usage

### Python Module

```python
from design_system import generate_design_system

# Basic usage
result = generate_design_system("SaaS dashboard", "My Project")
print(result["text"])

# With design dials (1-10 sliders)
result = generate_design_system(
    "SaaS dashboard",
    "My Project",
    variance=3,    # 1=minimal/centered, 10=bold/asymmetric
    motion=7,      # 1=subtle, 10=complex animations
    density=5      # 1=spacious, 10=dense/dashboard
)
print(result["text"])
```

### Command Line

```bash
cd .claude/skills/design-system-generator
python3 design_system.py "SaaS dashboard" --project-name "My Project"
```

## Design Dials

Three optional 1-10 sliders that bias the search and generation:

- **Variance (1-10):** Visual complexity and asymmetry
  - 1-3: Minimalist, centered, symmetric
  - 4-7: Modern, balanced, structured
  - 8-10: Bold, asymmetric, experimental

- **Motion (1-10):** Animation intensity
  - 1-3: Subtle fades and basic transitions
  - 4-7: Standard smooth animations (recommended)
  - 8-10: Complex orchestrated motion

- **Density (1-10):** Information density and spacing
  - 1-3: Spacious, generous whitespace
  - 4-7: Standard balanced spacing
  - 8-10: Dense dashboard-style packing

## Data Sources

All recommendations are generated from CSV databases:

- `data/styles.csv` — 10+ design styles (Minimalism, Brutalism, etc.)
- `data/color-palettes.csv` — 5 curated color palettes
- `data/typography.csv` — 7 font pairings with Google Fonts
- `data/landing-patterns.csv` — 6 page layout patterns
- `data/motion.csv` — GSAP animation snippets and guidelines
- `data/ux-guidelines.csv` — 10 UX best practices
- `data/ui-reasoning.csv` — 7 UI category decision rules
- `data/products.csv` — 10 product/project types

## Output Structure

Returns a dict with:

```python
{
  "text": "ASCII formatted design system",
  "design_system": {
    "project_name": "string",
    "category": "SaaS Dashboard / E-Commerce / etc.",
    "pattern": {"name": "...", "sections": "...", "cta_placement": "..."},
    "style": {"name": "...", "keywords": "...", "effects": "..."},
    "colors": {"primary": "#...", "accent": "#...", ...},
    "typography": {"heading": "Inter", "body": "Inter", "mood": "..."},
    "key_effects": "Smooth hover transitions...",
    "anti_patterns": "Emojis as icons + ...",
    "dials": {"variance": 5, "motion": 7, "density": 4, ...},
    "motion_snippet": {...GSAP code...},
    "spacing_scale": {"xs": "4px", "sm": "8px", ...}
  }
}
```

## Examples

### Example 1: SaaS Dashboard

```python
result = generate_design_system("SaaS dashboard", "Analytics Pro", variance=3, density=8)
```

Returns:
- Pattern: Data-Centric Grid
- Style: Minimalism + Flat Design
- Colors: Professional neutral with accent for CTAs
- Typography: Inter for clean readable data
- Motion: Smooth transitions on hover
- Density: High information density, tight spacing

### Example 2: Marketing Landing

```python
result = generate_design_system("Marketing landing", "Product Launch", variance=9, motion=7)
```

Returns:
- Pattern: Narrative Flow
- Style: Brutalism + Exaggerated Minimalism
- Colors: Brand-heavy with bold accents
- Typography: Expressive bold headlines
- Motion: Staggered section reveals, parallax depth
- Density: Spacious generous layout

### Example 3: E-Commerce Store

```python
result = generate_design_system("E-commerce luxury products", "Fashion Shop")
```

Returns:
- Pattern: Product-Focused Hero
- Style: Minimalism + Neumorphism
- Colors: Warm with accent-heavy CTAs
- Typography: Elegant serif fonts
- Motion: Product image scale on hover
- Effects: Quick smooth transitions

## Customizing Data

Edit the CSV files in `data/` to add your own:

- Styles, color palettes, typography pairings
- Landing patterns, motion snippets
- UX guidelines, UI reasoning rules
- Product/project type definitions

All searches will automatically pick up the new data.

## Integration with Your Project

Use design system recommendations to:

1. **Bootstrap new pages** — Generate a design system for your project type
2. **Audit existing designs** — Compare your current design against recommendations
3. **Create design tokens** — Use the color, spacing, and typography output
4. **Write component specs** — Use pattern and effect recommendations for Storybook
5. **Document decision rules** — Export design_system dict for team reference

## Next Steps

- Run a design system generation for Studio Parenthèse
- Extract color and typography tokens for CSS variables
- Generate page-specific overrides for each theme
- Create design tokens JSON for Figma import
