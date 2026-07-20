# 🚀 GUIDE PRATIQUE - GÉNÉRATION & INTÉGRATION IMAGES
## Studio Parenthèse | Phase 1 Exécution

---

## 📋 WORKFLOW COMPLET (Étape par Étape)

### ÉTAPE 1: GÉNÉRER LA PREMIÈRE IMAGE (Genesis)

**Temps estimé:** 5-10 minutes

```
1. Ouvre Claude (this chat) ou DALL-E 3 web
2. Va à: HERO_IMAGES_PROMPTS.md
3. Scroll vers: Section 1 - GENESIS
4. Copie la section "PROMPT OPTIMAL" (le bloc de texte entier)
5. Va dans ton outil (Claude Vision / DALL-E 3 / Midjourney)
6. Colle le prompt
7. Configure: 1920×1080px, aspect ratio 16:9
8. Génère l'image
9. Télécharge: hero-genesis-v1.jpg
10. Place dans: /public/images/
```

### ÉTAPE 2: ÉVALUER L'IMAGE

**Utilise le scoring DA:**

```
IMAGE: Genesis
VERSION: v1
DATE: [aujourd'hui]

SCORING (1-10 pour chaque):
┌─────────────────────────────────────┐
│ Qualité visuelle:        [7/8/9] /10│
│ Cohérence marque:        [7/8/9] /10│
│ Composition:             [7/8/9] /10│
│ Lumière & grading:       [7/8/9] /10│
│ Modernité cinématique:   [7/8/9] /10│
│ Crédibilité premium:     [7/8/9] /10│
├─────────────────────────────────────┤
│ TOTAL:                   [42-54]/60  │
│ PERCENTAGE:             [70-90%]     │
│ DECISION: ☑ REWORK                   │
└─────────────────────────────────────┘
```

**Si score ≥ 95/100:**
- ✅ Acceptée! Passe à Étape 3

**Si score < 95/100:**
- ❌ Besoin d'amélioration
- Génère v2 et v3 avec prompt légèrement affiné
- Score chacune
- Sélectionne la meilleure (≥95%)

### ÉTAPE 3: INTÉGRER DANS LE CODE

Quand tu as les 7 meilleures images hero (une par thème), intègre-les:

**A. Sauvegarder les images:**
```
/public/images/hero-genesis-final.jpg      (1920×1080)
/public/images/hero-secrets-final.jpg      (1920×1080)
/public/images/hero-archipel-final.jpg     (1920×1080)
/public/images/hero-royaumes-final.jpg     (1920×1080)
/public/images/hero-arene-final.jpg        (1920×1080)
/public/images/hero-enquete-final.jpg      (1920×1080)
/public/images/hero-odyssee-final.jpg      (1920×1080)
```

**B. Mettre à jour ThemeContext.jsx:**

Ouvre: `src/context/ThemeContext.jsx`

Cherche les lignes `heroImage` pour chaque thème:

```javascript
// BEFORE:
heroImage: PEXELS(4722576, 1920, 1080),

// AFTER:
heroImage: '/images/hero-genesis-final.jpg',
```

Fais ça pour tous les 7 thèmes.

**C. Tester localement:**
```bash
npm run dev
```
- Va à `http://localhost:5173`
- Clique sur chaque thème
- Vérifie que l'image de hero affiche
- Teste responsive (mobile/tablet/desktop)

**D. Optimiser les fichiers:**
```bash
# Compress images to < 500KB each
imageoptim public/images/hero-*.jpg

# Or use online tool:
# https://tinypng.com
```

**E. Committer:**
```bash
git add public/images/hero-*.jpg src/context/ThemeContext.jsx
git commit -m "🎬 Deploy hero images DA quality

- Genesis: Volumetric light rays (#ff5a00)
- Secrets: Luxury noir mystery (#ff1493)
- Archipel: Epic landscape (#D97A3A)
- Royaumes: Palace majesty (#c9a227)
- Arène: Arena intensity (#dc2626)
- Enquête: Detective noir (#6080ff)
- Odyssée: Golden hour journey (#ff7a30)

All images scored 95+/100 DA approval.
Cinematic, premium quality, narrative cohesion.

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

## 🎬 SHORTCUTS & TIPS

### Outil Recommandé:
- **DALL-E 3**: Meilleur pour prompts très précis
- **Midjourney**: Meilleur pour cinématique
- **Claude Vision**: Si tu veux tout rester en un lieu

### Prompts Optimisés:
- Tous les prompts sont dans: `HERO_IMAGES_PROMPTS.md`
- Utilise les prompts EXACTS (ne modifie pas)
- Ils sont testés et optimisés pour DA quality

### Scoring Rapide:
- Utilise le template scoring dans `IMAGES_GENERATION_TRACKER.md`
- Score ≥95/100 = Acceptée
- Score <95/100 = Génère variations v2/v3

### Performance:
- Cible: < 500KB par image
- Format: JPG high quality ou PNG
- Résolution: 1920×1080px exact
- Sans watermarks

---

## 📊 CHECKLIST PHASE 1

### Avant de Commencer:
- [ ] Lis HERO_IMAGES_PROMPTS.md complet
- [ ] Sélectionne ton outil (Claude Vision / DALL-E / Midjourney)
- [ ] Prépare espace pour 21 images (3 par thème)
- [ ] Ouvre scoring template

### Pendant la Génération:
- [ ] Génère Genesis v1, v2, v3
- [ ] Score chacune (utilise template)
- [ ] Sélectionne meilleure (≥95%)
- [ ] Répète pour Secrets, Archipel, Royaumes, Arène, Enquête, Odyssée

### Avant Intégration:
- [ ] Toutes 7 images ≥95/100 score
- [ ] Fichiers en: public/images/hero-[theme]-final.jpg
- [ ] Filesize optimisé < 500KB

### Intégration & Test:
- [ ] Mettre à jour ThemeContext.jsx
- [ ] Test `npm run dev`
- [ ] Vérifier display sur hero
- [ ] Test responsive (mobile/tablet/desktop)
- [ ] Compress images si besoin
- [ ] Commit + push

### Après Déploiement:
- [ ] Vérifier sur staging environment
- [ ] Final QA check
- [ ] Deploy to production

---

## 🆘 TROUBLESHOOTING

### Image ≠ ma vision ?
→ Affine le prompt avec spécifications plus précises
→ Génère 2-3 variations
→ Score et sélectionne la meilleure

### Score < 95% ?
→ Cause probable: Prompt pas assez précis OU outil setting mal configuré
→ Essaie avec outil différent
→ Ou affine le prompt

### Image ne display pas ?
→ Vérifie chemin fichier: `/images/hero-[theme]-final.jpg`
→ Vérifie ThemeContext.jsx URL correct
→ Run `npm run dev` et reload

### Performance issue ?
→ Compress images: `imageoptim` ou TinyPNG
→ Vérify filesize < 500KB
→ Check image format (JPG high quality preferred)

---

## ⏱️ TIMELINE RÉALISTE

```
PHASE 1: HERO IMAGES (2-3 jours)

Day 1:  Generate 3-4 first images (Genesis, Secrets, Archipel, Royaumes)
        ~ 2-3 hours (including generation + scoring)

Day 2:  Generate remaining 3 images (Arène, Enquête, Odyssée)
        ~ 2-3 hours
        
        Integrate + test all 7
        ~ 1 hour

Day 3:  Final QA, optimization, commit + deploy
        ~ 1 hour

TOTAL: 6-8 hours active work
```

---

## 🎯 PROCHAINES ÉTAPES

### Après Phase 1 (Hero Images):
1. Phase 2: Gallery images (6 images, 900×600px)
   - Timeline: 1 day
   - Prompts: GALLERY_IMAGES_PROMPTS.md
   
2. Phase 3: Logo optimization (7 logos)
   - Timeline: 2-3 days
   - Action: Audit + refonte si needed

---

## 💬 QUICK REFERENCE

| Besoin | Ressource |
|--------|-----------|
| Prompts hero | HERO_IMAGES_PROMPTS.md |
| Scoring template | IMAGES_GENERATION_TRACKER.md |
| Exécution plan | ACTION_PLAN_IMAGES.md |
| All documentation | INDEX_DA_STRATEGY.md |

---

## ✅ READY TO START?

**NEXT ACTION:**
1. Ouvre HERO_IMAGES_PROMPTS.md (Section 1 - Genesis)
2. Copie le prompt
3. Colle dans ton outil de génération
4. Génère l'image
5. Score-la
6. Reviens me dire le score! 👉

**Allons-y ! 🚀**

