import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import TextReveal from '@/components/effects/TextReveal'
import { useTheme } from '@/context/ThemeContext'
export default function Hero() {
  const containerRef = useRef(null)
  const { themeData } = useTheme()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Filtres SVG */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>

          {/* Archipel — érosion écorce */}
          <filter id="bark-edges" x="-10%" y="-25%" width="120%" height="150%">
            <feTurbulence type="fractalNoise" baseFrequency="0.22 0.12" numOctaves="4" seed="8" result="erosionNoise"/>
            <feColorMatrix type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      10 0 0 0 -1.6"
              in="erosionNoise" result="erosionMask"/>
            <feComposite in="SourceGraphic" in2="erosionMask" operator="in" result="distressedText"/>
            <feMorphology operator="erode" radius="8" in="SourceGraphic" result="skeleton"/>
            <feComposite in="distressedText" in2="skeleton" operator="out"/>
          </filter>

          {/*
            Royaumes — fer forgé volumétrique
            Principe : feGaussianBlur(SourceAlpha) = carte de relief (bump map).
            feDiffuseLighting lit la surface de façon mate (body de la lettre).
            feSpecularLighting ajoute les éclats tranchants (arêtes de la lame).
            Source de lumière : azimuth=225° (haut-gauche), elevation=38°.
            Aucun background-clip:text → pas de conflit de contexte de composition.
          */}
          <filter id="iron-sword" x="-6%" y="-18%" width="112%" height="136%">
            {/* Bump map — flou de l'alpha = normales de surface simulées */}
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="bump"/>

            {/* Composante diffuse — éclairage mat acier-bleu */}
            <feDiffuseLighting in="bump" surfaceScale="5" diffuseConstant="1.4"
              lightingColor="#7090a0" result="diffuse">
              <feDistantLight azimuth="225" elevation="38"/>
            </feDiffuseLighting>
            <feComposite in="diffuse" in2="SourceAlpha" operator="in" result="diff"/>

            {/* Composante spéculaire — éclats brillants sur les arêtes */}
            <feSpecularLighting in="bump" surfaceScale="5" specularConstant="2.8"
              specularExponent="26" lightingColor="#deeefa" result="specular">
              <feDistantLight azimuth="225" elevation="38"/>
            </feSpecularLighting>
            <feComposite in="specular" in2="SourceAlpha" operator="in" result="spec"/>

            {/* Base fer sombre — couleur ambiante des lettres */}
            <feFlood floodColor="#0c1820" floodOpacity="1" result="ironFlood"/>
            <feComposite in="ironFlood" in2="SourceAlpha" operator="in" result="darkBase"/>

            {/* Screen : base + diffuse → surface d'acier éclairée */}
            <feBlend in="darkBase" in2="diff" mode="screen" result="litBase"/>

            {/* Screen : + spéculaire → arêtes brillantes */}
            <feBlend in="litBase" in2="spec" mode="screen" result="fullLit"/>

            {/* Grain de métal usé (rayures anisotropes + grain fin) */}
            <feTurbulence type="fractalNoise" baseFrequency="0.55 0.07" numOctaves="2" seed="5" result="grain"/>
            <feColorMatrix type="saturate" values="0" in="grain" result="greyGrain"/>
            <feComponentTransfer in="greyGrain" result="subtleGrain">
              <feFuncR type="linear" slope="0.16" intercept="0.42"/>
              <feFuncG type="linear" slope="0.16" intercept="0.42"/>
              <feFuncB type="linear" slope="0.16" intercept="0.42"/>
            </feComponentTransfer>
            <feBlend in="fullLit" in2="subtleGrain" mode="soft-light" result="textured"/>

            {/* Recadrage final sur l'alpha des lettres */}
            <feComposite in="textured" in2="SourceAlpha" operator="in"/>
          </filter>

          {/*
            Grand Tournoi — Or fondu volumétrique style Hunger Games
            Référence : lettres or/ambre 3D à biseaux nets, halo de chaleur.

            Pipeline :
            1. Outer ember aura  — halo rouge-sombre large (σ=14)
            2. Inner fire glow   — couronne orange vif proche des lettres (σ=5)
            3. Bump map (σ=3.5) → feDiffuseLighting or-ambre + feSpecularLighting
               blanc-or → lettres dorées en relief très prononcé
            4. Base sombre #2c1206 → zones d'ombre = brun brûlé
            5. Grain métal chaud → texture or fondu
            6. feMerge : ember → glow → texte 3D
          */}
          <filter id="fire-text" x="-30%" y="-60%" width="160%" height="200%">

            {/* ── 1. OUTER EMBER AURA (rouge sombre, large) ── */}
            <feGaussianBlur in="SourceAlpha" stdDeviation="14" result="outerBlur"/>
            <feFlood floodColor="#8a2000" floodOpacity="0.55" result="outerColor"/>
            <feComposite in="outerColor" in2="outerBlur" operator="in" result="outerGlow"/>

            {/* ── 2. INNER FIRE GLOW (orange vif, proche) ── */}
            <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="innerBlur"/>
            <feFlood floodColor="#ff5e00" floodOpacity="0.70" result="innerColor"/>
            <feComposite in="innerColor" in2="innerBlur" operator="in" result="innerGlow"/>

            {/* ── 3. BUMP MAP → PHONG OR/AMBRE ── */}
            <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" result="bump"/>

            {/* Diffuse : or-ambre chaud — corps éclairé des lettres */}
            <feDiffuseLighting in="bump" surfaceScale="9" diffuseConstant="1.5"
              lightingColor="#e08020" result="diffuse">
              <feDistantLight azimuth="248" elevation="50"/>
            </feDiffuseLighting>
            <feComposite in="diffuse" in2="SourceAlpha" operator="in" result="diff"/>

            {/* Spéculaire : blanc-or tranchant — arêtes haut-gauche */}
            <feSpecularLighting in="bump" surfaceScale="9" specularConstant="3.0"
              specularExponent="18" lightingColor="#fffab0" result="specular">
              <feDistantLight azimuth="248" elevation="50"/>
            </feSpecularLighting>
            <feComposite in="specular" in2="SourceAlpha" operator="in" result="spec"/>

            {/* ── 4. BASE SOMBRE (zones d'ombre = brun brûlé) ── */}
            <feFlood floodColor="#2c1206" floodOpacity="1" result="baseFlood"/>
            <feComposite in="baseFlood" in2="SourceAlpha" operator="in" result="darkBase"/>

            <feBlend in="darkBase" in2="diff" mode="screen" result="litBase"/>
            <feBlend in="litBase"  in2="spec" mode="screen" result="litText"/>

            {/* ── 5. GRAIN OR FONDU ── */}
            <feTurbulence type="fractalNoise" baseFrequency="0.5 0.5"
              numOctaves="2" seed="4" result="grain"/>
            <feColorMatrix type="saturate" values="0" in="grain" result="greyGrain"/>
            <feComponentTransfer in="greyGrain" result="subtleGrain">
              <feFuncR type="linear" slope="0.12" intercept="0.44"/>
              <feFuncG type="linear" slope="0.12" intercept="0.44"/>
              <feFuncB type="linear" slope="0.12" intercept="0.44"/>
            </feComponentTransfer>
            <feBlend in="litText" in2="subtleGrain" mode="soft-light" result="textured"/>
            <feComposite in="textured" in2="SourceAlpha" operator="in" result="finalText"/>

            {/* ── 6. COMPOSITE : ember → glow → texte ── */}
            <feMerge>
              <feMergeNode in="outerGlow"/>
              <feMergeNode in="innerGlow"/>
              <feMergeNode in="finalText"/>
            </feMerge>
          </filter>

        </defs>
      </svg>

      <motion.div className="absolute inset-0" style={{ scale }}>
        <AnimatePresence mode="sync">
          <motion.div
            key={themeData.id}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${themeData.heroImage}')` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4 }}
          />
        </AnimatePresence>
        <div
          className="absolute inset-0 transition-all duration-1500"
          style={{ background: 'linear-gradient(to bottom, rgba(10,10,15,0.72) 0%, var(--theme-bg) 100%)' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30"
          style={{ background: `radial-gradient(circle, var(--theme-accent-subtle) 0%, transparent 70%)` }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ backgroundColor: 'var(--theme-accent)', left: `${20 + i * 15}%`, top: `${30 + i * 10}%`, opacity: 0.2 }}
            animate={{ y: [0, -30, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          />
        ))}
      </motion.div>

      <motion.div
        className="relative z-10 text-center px-6 max-w-3xl w-full"
        style={{ y, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Studio d'expériences immersives
          </span>
        </motion.div>

        <h1
          className="font-display mb-8"
          style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em' }}
        >
          <TextReveal delay={0.2}>
            <span style={{ color: 'var(--color-text-primary)', whiteSpace: 'nowrap' }}>
              Donnez<span style={{ letterSpacing: 'inherit' }}>{' '}</span>du sens<span style={{ letterSpacing: 'inherit' }}>{' à '}</span>la
            </span>
          </TextReveal>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'block', lineHeight: 1.3, paddingTop: '0.15em', textAlign: 'center', width: '100%' }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={themeData.id}
                className="inline-block"
                style={{
                  fontFamily: themeData.wordFont || 'inherit',
                  fontStyle: themeData.wordFont ? 'normal' : 'italic',
                  textTransform: ['secrets','archipel','royaumes','arene'].includes(themeData.id) ? 'uppercase' : 'none',
                  WebkitTextStroke: themeData.id === 'secrets' ? '10px rgba(255, 255, 255, 1)' : 'unset',
                  paintOrder: themeData.id === 'secrets' ? 'stroke fill' : 'unset',
                  color: 'var(--theme-accent)',
                  textShadow: 'none',
                  fontWeight: undefined,
                  letterSpacing: undefined,
                  position: undefined,
                  filter: themeData.id === 'archipel'
                    ? 'url(#bark-edges)'
                    : 'none',
                }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {themeData.id === 'secrets'
                  ? (
                    <img
                      src="/images/logo-secrets.png"
                      alt="Parenthèse Secrets"
                      style={{
                        height: 'clamp(4rem, 16vw, 6.5rem)',
                        width: 'auto',
                        display: 'inline-block',
                      }}
                    />
                  )
                  : themeData.id === 'archipel'
                  ? (
                    <img
                      src="/images/logo-archipel.png"
                      alt="Parenthèse Archipel"
                      style={{
                        height: 'clamp(4rem, 16vw, 6.5rem)',
                        width: 'auto',
                        display: 'inline-block',
                      }}
                    />
                  )
                  : themeData.id === 'arene'
                  ? (
                    <img
                      src="/images/logo-arene.png"
                      alt="Parenthèse Arène"
                      style={{
                        height: 'clamp(4rem, 16vw, 6.5rem)',
                        width: 'auto',
                        display: 'inline-block',
                      }}
                    />
                  )
                  : themeData.id === 'royaumes'
                  ? (
                    <img
                      src="/images/logo-royaumes.png"
                      alt="Parenthèse Royaumes"
                      style={{
                        height: 'clamp(4rem, 16vw, 6.5rem)',
                        width: 'auto',
                        display: 'inline-block',
                      }}
                    />
                  )
                  : themeData.id === 'odyssee'
                  ? (
                    <img
                      src="/images/logo-odyssee.png"
                      alt="Parenthèse Odyssée"
                      style={{
                        height: 'clamp(4rem, 16vw, 6.5rem)',
                        width: 'auto',
                        display: 'inline-block',
                      }}
                    />
                  )
                  : themeData.id === 'enquete'
                  ? (
                    <img
                      src="/images/logo-enquete.png"
                      alt="Parenthèse Enquête"
                      style={{
                        height: 'clamp(4rem, 16vw, 6.5rem)',
                        width: 'auto',
                        display: 'inline-block',
                      }}
                    />
                  )
                  : 'parenthèse'
                }
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </h1>

        <motion.p
          className="font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span style={{ whiteSpace: 'nowrap' }}>Des expériences</span> <span style={{ whiteSpace: 'nowrap' }}>sur mesure</span> <span style={{ whiteSpace: 'nowrap' }}>où vous</span> <span style={{ whiteSpace: 'nowrap' }}>vivez l'histoire,</span>
          <br />
          <span style={{ whiteSpace: 'nowrap' }}>car vous</span> <span style={{ whiteSpace: 'nowrap' }}>en êtes</span> <span style={{ whiteSpace: 'nowrap' }}>le scénario.</span>
        </motion.p>
      </motion.div>

      {/* Explorer — ancré en bas, hors du parallax */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-3"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Explorer
          </span>
          <div
            className="w-px h-12"
            style={{ background: `linear-gradient(to bottom, var(--theme-accent), transparent)` }}
          />
        </motion.div>
      </motion.div>

      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: `linear-gradient(to top, var(--theme-bg), transparent)` }}
      />
    </section>
  )
}
