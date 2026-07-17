import { motion } from 'framer-motion'
import ThemeSelector from '@/components/ui/ThemeSelector'
import TextReveal from '@/components/effects/TextReveal'
import ParallaxLayer from '@/components/effects/ParallaxLayer'
import { useTheme } from '@/context/ThemeContext'
export default function InspirationsPage() {
  const { themeData } = useTheme()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen pt-32 pb-section"
    >
      <ParallaxLayer speed={-0.15}>
        <div 
          className="absolute top-24 right-0 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
      </ParallaxLayer>
      <ParallaxLayer speed={0.1}>
        <div 
          className="absolute bottom-48 -left-24 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
      </ParallaxLayer>
      <div className="px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-24 max-w-3xl">
            <motion.span
              className="text-xs tracking-[0.3em] uppercase block mb-8"
              style={{ color: 'var(--color-text-secondary)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Inspirations
            </motion.span>
            <TextReveal as="h1" className="font-display text-display-lg mb-8">
              <span style={{ color: 'var(--color-text-primary)' }}>
                Univers
              </span>
              <span 
                className="italic ml-4 transition-colors duration-700"
                style={{ color: 'var(--theme-accent)' }}
              >
                immersifs
              </span>
            </TextReveal>
            <motion.p
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Chaque thème raconte une histoire différente. 
              Sélectionnez un univers pour transformer l'atmosphère du site 
              et explorer une direction artistique possible.
            </motion.p>
          </div>
          <motion.div
            className="mb-16 p-8 rounded-sm border theme-transition"
            style={{ 
              borderColor: 'rgba(var(--color-text-secondary-rgb, 138, 138, 138), 0.1)',
              backgroundColor: 'var(--theme-accent-subtle)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span 
              className="text-xs tracking-[0.3em] uppercase block mb-2"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Ambiance actuelle
            </span>
            <h2 
              className="font-display text-2xl transition-colors duration-700"
              style={{ color: 'var(--theme-accent)' }}
            >
              {themeData.name}
            </h2>
            <p 
              className="mt-2 text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {themeData.description}
            </p>
          </motion.div>
          <ThemeSelector />
          <motion.div
            className="mt-24 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 
              className="font-display text-xl mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Comment ça fonctionne
            </h3>
            <p 
              className="text-base leading-relaxed mb-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Lorsque vous sélectionnez un thème, l'ensemble du site 
              s'adapte subtilement : couleurs, textures, lumière, 
              atmosphère générale. C'est une façon de montrer comment 
              nous pensons les expériences immersives.
            </p>
            <p 
              className="text-base leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Chaque univers pourrait devenir une direction artistique 
              pour votre projet. Explorez, ressentez, imaginez.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
