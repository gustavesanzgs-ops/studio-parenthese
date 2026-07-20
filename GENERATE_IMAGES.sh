#!/bin/bash

# 🎬 HERO IMAGES GENERATION SCRIPT
# Studio Parenthèse | Directeur Artistique Phase 1
# This script helps generate and track all hero images

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  🎬 HERO IMAGES GENERATION - PHASE 1                          ║"
echo "║  Studio Parenthèse | Directeur Artistique                     ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Configuration
IMAGES_DIR="./public/images"
TRACKER_FILE="./hero-images-generated.txt"

# Create tracking file
cat > "$TRACKER_FILE" << 'EOF'
# HERO IMAGES GENERATION TRACKER
# Generated: $(date)
# Phase: 1 | Status: IN PROGRESS

## IMAGES TO GENERATE:

1. Genesis (#ff5a00)
   Prompt: See HERO_IMAGES_PROMPTS.md [Section 1]
   Status: PENDING
   Variations: 0/3

2. Secrets (#ff1493)
   Prompt: See HERO_IMAGES_PROMPTS.md [Section 2]
   Status: PENDING
   Variations: 0/3

3. Archipel (#D97A3A)
   Prompt: See HERO_IMAGES_PROMPTS.md [Section 3]
   Status: PENDING
   Variations: 0/3

4. Royaumes (#c9a227)
   Prompt: See HERO_IMAGES_PROMPTS.md [Section 4]
   Status: PENDING
   Variations: 0/3

5. Arène (#dc2626)
   Prompt: See HERO_IMAGES_PROMPTS.md [Section 5]
   Status: PENDING
   Variations: 0/3

6. Enquête (#6080ff)
   Prompt: See HERO_IMAGES_PROMPTS.md [Section 6]
   Status: PENDING
   Variations: 0/3

7. Odyssée (#ff7a30)
   Prompt: See HERO_IMAGES_PROMPTS.md [Section 7]
   Status: PENDING
   Variations: 0/3

## SCORING TEMPLATE:

For each image generated, score using:

IMAGE: [Theme]
VERSION: v[1-3]

SCORING:
- Qualité visuelle:        [ ] /10
- Cohérence marque:        [ ] /10
- Composition:             [ ] /10
- Lumière & color grading: [ ] /10
- Modernité cinématique:   [ ] /10
- Crédibilité premium:     [ ] /10
────────────────────────────────
TOTAL:                     [ ] /60
STATUS: ☐ REJECT ☐ REWORK ☐ ACCEPT

## INSTRUCTIONS:

1. Go to DALL-E 3, Midjourney, or use Claude Vision
2. Copy prompt from HERO_IMAGES_PROMPTS.md
3. Generate image at 1920×1080px
4. Download image
5. Save to: public/images/hero-[theme]-v[1-3].jpg
6. Score using template above
7. When all 3 variations scored, select best (≥95/100)
8. Mark as DONE in this tracker

## COMPLETION CHECKLIST:

[ ] Genesis - 3 variations generated, best selected
[ ] Secrets - 3 variations generated, best selected
[ ] Archipel - 3 variations generated, best selected
[ ] Royaumes - 3 variations generated, best selected
[ ] Arène - 3 variations generated, best selected
[ ] Enquête - 3 variations generated, best selected
[ ] Odyssée - 3 variations generated, best selected

When ALL images are generated and selected (7/7):
[ ] Update ThemeContext.jsx with new URLs
[ ] Test responsive display
[ ] Run git add + commit
[ ] Deploy to staging

## NOTES:

- Minimum acceptance score: 95/100 (57/60 points)
- If image < 95: REGENERATE with refined prompt
- Quality is non-negotiable
- This is professional studio work

EOF

echo "✅ Tracking file created: $TRACKER_FILE"
echo ""
echo "📋 NEXT STEPS:"
echo ""
echo "1. Open: HERO_IMAGES_PROMPTS.md"
echo "2. Copy prompt for Genesis (Section 1)"
echo "3. Use Claude Vision / DALL-E 3 / Midjourney to generate"
echo "4. Generate image at 1920×1080px"
echo "5. Save to: public/images/hero-genesis-v1.jpg"
echo "6. Score using template in: $TRACKER_FILE"
echo "7. Repeat for all 7 themes"
echo ""
echo "📊 Ready to generate? (y/n)"
read -r response

if [ "$response" = "y" ]; then
  echo ""
  echo "🚀 STARTING PHASE 1 GENERATION..."
  echo ""
  echo "Open your image generation tool and use prompts from:"
  echo "  👉 HERO_IMAGES_PROMPTS.md"
  echo ""
  echo "Track progress in:"
  echo "  👉 $TRACKER_FILE"
  echo ""
  echo "When done, run:"
  echo "  👉 ./INTEGRATE_IMAGES.sh"
  echo ""
else
  echo "Setup aborted. Run this script again when ready."
fi
