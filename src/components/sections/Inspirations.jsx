import { motion, AnimatePresence } from 'framer-motion'
import ThemeSelector from '@/components/ui/ThemeSelector'
import TextReveal from '@/components/effects/TextReveal'
import { useTheme } from '@/context/ThemeContext'
export default function Inspirations() {
  const { currentTheme, themeData, changeTheme } = useTheme()
  return (
    <section className="relative py-section px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 md:mb-24">
          <motion.span
            className="text-xs tracking-[0.3em] uppercase block mb-8"
            style={{ color: 'var(--color-text-secondary)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Nos univers
          </motion.span>
          <TextReveal as="h2" className="font-display text-display-lg mb-6" style={{ textTransform: 'uppercase' }}>
            <span style={{ color: 'var(--color-text-primary)' }}>
              Univers
            </span>
            <span
              className="ml-3 transition-colors duration-700"
              style={{ color: 'var(--theme-accent)' }}
            >
              Immersifs
            </span>
          </TextReveal>
          <motion.div
            className="max-w-xl space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
              Des univers inspirés de la culture pop, du jeu, des livres et du cinéma — chacun conçu
              comme un scénario complet, adapté à votre groupe, vos dates et le lieu de votre choix.
            </p>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)', opacity: 0.7 }}>
              Chaque univers est modulable et personnalisable pour s'adapter à vos envies : entre amis,
              en séminaire, pour un anniversaire, un voyage ou tout autre événement.
            </p>
          </motion.div>
        </div>

        <AnimatePresence>
          {currentTheme !== 'default' && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              {/* Carte ambiance actuelle */}
              <div
                className="flex items-center gap-4 px-6 py-4 rounded-sm border mb-4"
                style={{ borderColor: 'var(--theme-accent)', backgroundColor: 'var(--theme-bg)' }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: 'var(--theme-accent)' }}
                />
                <div>
                  <span
                    className="text-[10px] tracking-[0.3em] uppercase block mb-0.5"
                    style={{ color: 'var(--theme-accent)', opacity: 0.7 }}
                  >
                    Ambiance actuelle
                  </span>
                  <span
                    className="font-display text-sm"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {themeData.name}
                  </span>
                </div>
              </div>
              <button
                onClick={() => changeTheme('default')}
                className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase mb-8 transition-opacity duration-300 opacity-35 hover:opacity-80"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <span className="w-3 h-px block" style={{ backgroundColor: 'var(--color-text-secondary)' }} />
                Revenir à GENESIS
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <ThemeSelector />

        {/* Comment ça fonctionne */}
        <motion.div
          className="mt-24 pt-12"
          style={{ borderTop: '1px solid rgba(138,138,138,0.1)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span
            className="text-[10px] tracking-[0.3em] uppercase block mb-4"
            style={{ color: 'var(--theme-accent)', opacity: 0.7 }}
          >
            Comment ça fonctionne ?
          </span>
          <p
            className="text-sm leading-relaxed max-w-xl"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Lorsque vous sélectionnez un univers, le site vous guide pour construire une expérience
            entièrement personnalisée, adaptée à votre groupe, votre lieu et vos envies.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
