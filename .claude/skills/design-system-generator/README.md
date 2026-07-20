# Design System Generator for Studio Parenthèse

A comprehensive design system generation tool that provides color palettes, typography pairings, layout patterns, motion guidelines, and UX best practices.

## Quick Start

### Test the Generator

```bash
cd .claude/skills/design-system-generator
python3 design_system.py "Creative agency immersive experiences" --project-name "Studio Parenthèse"
```

### Use in Python

```python
from design_system import generate_design_system

# Generate for Studio Parenthèse
result = generate_design_system(
    "Creative agency immersive experiences",
    "Studio Parenthèse",
    variance=8,    # Bold asymmetric creative style
    motion=7,      # Standard to complex animations
    density=5      # Balanced spacing
)

print(result["text"])
print(json.dumps(result["design_system"], indent=2))
```

## Features

✅ **Color Palettes** — 5 professionally curated palettes with accessibility ratios
✅ **Typography** — 7 font pairings with Google Fonts links and CSS imports
✅ **Layout Patterns** — 6 page structure templates (Hero, SaaS, E-commerce, etc.)
✅ **Motion Guidelines** — GSAP animation snippets with intensity tiers
✅ **UX Best Practices** — 10 categorized do/don't guidelines
✅ **UI Reasoning** — Intelligent category-based recommendations
✅ **Design Dials** — 1-10 sliders for variance, motion, and density

## Project Structure

```
.claude/skills/design-system-generator/
├── core.py                    # Search and data access module
├── design_system.py          # Main generator (700+ lines)
├── SKILL.md                  # Skill documentation
├── README.md                 # This file
└── data/
    ├── styles.csv           # 10 design styles
    ├── color-palettes.csv   # 5 curated color palettes
    ├── typography.csv       # 7 font pairings
    ├── landing-patterns.csv # 6 page patterns
    ├── motion.csv           # GSAP animation library
    ├── ux-guidelines.csv    # 10 UX best practices
    ├── ui-reasoning.csv     # 7 UI categories
    └── products.csv         # 10 product types
```

## For Studio Parenthèse

The generator has been tuned to support your project with:

- **Project Types:** Creative agencies, experience design, immersive events
- **Styles:** Brutalism, Minimalism, Exaggerated Minimalism (all present in your site)
- **Colors:** Professional palettes with accent colors for CTAs
- **Typography:** Modern clean fonts (Inter, Satoshi) and expressive fonts (Cinzel, Playfair)
- **Motion:** Smooth transitions and orchestrated animations
- **Patterns:** Hero + Features for landing, Data-Centric Grid for dashboards

## Next Steps for Your Site

1. **Generate design system for each theme:**
   ```python
   themes = [
       ("Secrets: Social reality show", "secrets"),
       ("Archipel: Survivor-style survival", "archipel"),
       ("Royaumes: Game of Thrones strategy", "royaumes"),
       ("Arène: Hunger Games tournament", "arene"),
       ("Enquête: Murder mystery investigation", "enquete"),
       ("Odyssée: Unknown road adventure", "odyssee"),
   ]
   
   for query, theme_id in themes:
       result = generate_design_system(query, f"Studio Parenthèse — {theme_id}")
       # Extract and apply tokens
   ```

2. **Create design tokens from output:**
   - Export colors as CSS variables
   - Use typography recommendations in Figma
   - Apply motion patterns to Framer Motion components

3. **Document design decisions:**
   - Store design_system dict in version control
   - Create page-specific overrides in `design-system/<project>/pages/`
   - Reference in code comments and docs

## Extending the Generator

### Add New Styles

Edit `data/styles.csv`:
```
Style Category,Type,Keywords,Best For,Effects & Animation,Performance,Accessibility,Light Mode ✓,Dark Mode ✓
My New Style,Custom,keywords here,Description,Effect details,Performance level,A11y level,Yes,Yes
```

### Add New Color Palettes

Edit `data/color-palettes.csv`:
```
Palette Name,Primary,On Primary,Secondary,Accent,Background,Foreground,Muted,Border,Destructive,Ring,Notes
```

### Add New Reasoning Rules

Edit `data/ui-reasoning.csv` to customize recommendations for new UI categories.

## API Reference

### `generate_design_system(query, project_name, variance, motion, density)`

Returns:
```python
{
    "text": "Formatted ASCII design system",
    "design_system": {
        "project_name": "string",
        "category": "Product type (SaaS, E-commerce, etc.)",
        "pattern": {"name": "...", "sections": "...", "cta_placement": "..."},
        "style": {"name": "...", "keywords": "...", "effects": "...", ...},
        "colors": {"primary": "#...", "accent": "#...", ...},
        "typography": {"heading": "Font", "body": "Font", "mood": "..."},
        "key_effects": "Animation descriptions",
        "anti_patterns": "What to avoid",
        "dials": {"variance": 5, "motion": 7, "density": 5},
        "motion_snippet": {...GSAP code...},
        "spacing_scale": {"xs": "4px", "sm": "8px", ...}
    }
}
```

## Examples

### Creative Agency (Your Use Case)

```python
result = generate_design_system(
    "Creative agency immersive experiences",
    "Studio Parenthèse",
    variance=8,
    motion=7,
    density=5
)
```

Output includes:
- Bold asymmetric styles
- Complex smooth animations
- Standard spacing (not too dense, not too spacious)
- Colors: Brand-forward with accent emphasis
- Effects: Orchestrated reveals and depth

### For Each Experience Theme

```python
# Secrets theme
result = generate_design_system(
    "Social reality show cohabitation manipulation",
    "La Maison des Secrets",
    variance=9,
    motion=8
)

# Archipel theme
result = generate_design_system(
    "Survivor-style tribal survival challenge",
    "L'Archipel",
    variance=8,
    motion=6,
    density=6
)
```

## Version

Design System Generator v1.0.0
Built for Studio Parenthèse

## License

This generator is part of the Studio Parenthèse project.
