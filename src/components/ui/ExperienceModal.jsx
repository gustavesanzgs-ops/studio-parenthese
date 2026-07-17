import { motion } from 'framer-motion'
import { useEffect } from 'react'
import Button from '@/components/ui/Button'
import { useTheme } from '@/context/ThemeContext'

export default function ExperienceModal({ theme, onClose }) {
  const { changeTheme } = useTheme()

  const handleReset = () => {
    changeTheme('default')
    onClose()
  }

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${theme.heroImage})` }}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(160deg, ${theme.colors.bg}d0 0%, ${theme.colors.bg}f0 50%, ${theme.colors.bg} 100%)`,
        }}
      />

      {/* Top bar — reset + close */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-4">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase transition-all duration-300 opacity-30 hover:opacity-75"
          style={{ color: theme.colors.text }}
        >
          <span className="w-3 h-px block" style={{ backgroundColor: theme.colors.text }} />
          GENESIS
        </button>
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full border text-sm transition-all duration-300 hover:scale-110"
          style={{
            borderColor: `${theme.colors.text}28`,
            color: `${theme.colors.text}70`,
            backgroundColor: `${theme.colors.bg}80`,
            backdropFilter: 'blur(8px)',
          }}
        >
          ×
        </button>
      </div>

      {/* Scrollable content — data-lenis-prevent bloque Lenis ici */}
      <div
        className="absolute inset-0 overflow-y-auto"
        data-lenis-prevent
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <motion.div
          className="relative z-10 px-6 py-20 md:px-16 max-w-5xl mx-auto"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <motion.span
            className="text-[11px] tracking-[0.38em] uppercase block mb-6"
            style={{ color: theme.colors.accent }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {theme.genre}
          </motion.span>

          <motion.h2
            className="font-display text-5xl md:text-7xl mb-4 leading-tight"
            style={{ color: theme.colors.text }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            {theme.name}
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl italic mb-10"
            style={{ color: theme.colors.accent }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            «&nbsp;{theme.tagline}&nbsp;»
          </motion.p>

          <motion.p
            className="font-body text-lg leading-relaxed mb-20 max-w-2xl"
            style={{ color: theme.colors.text, opacity: 0.72 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
          >
            {theme.description}
          </motion.p>

          {/* Elements */}
          <motion.span
            className="text-[11px] tracking-[0.38em] uppercase block mb-10"
            style={{ color: theme.colors.accent }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.32 }}
          >
            Ce qui compose l'expérience
          </motion.span>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
            {theme.elements.map((el, i) => (
              <motion.div
                key={el.label}
                className="relative overflow-hidden rounded-2xl"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34 + i * 0.07, duration: 0.55 }}
                style={{ minHeight: '220px' }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{
                    backgroundImage: `url(${theme.cardImages ? theme.cardImages[i] : theme.heroImage})`,
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to bottom, transparent 0%, ${theme.colors.bg}b0 55%, ${theme.colors.bg}f5 100%)`,
                  }}
                />
                <span
                  className="absolute top-4 left-4 text-[10px] tracking-[0.3em] font-semibold"
                  style={{ color: theme.colors.accent, opacity: 0.8 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h4
                    className="font-display text-base font-semibold mb-1"
                    style={{ color: theme.colors.text }}
                  >
                    {el.label}
                  </h4>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: theme.colors.text, opacity: 0.55 }}
                  >
                    {el.note}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA bloc */}
          <motion.div
            className="relative overflow-hidden rounded-2xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${theme.heroImage})` }}
            />
            <div
              className="absolute inset-0"
              style={{ background: `${theme.colors.bg}d8` }}
            />
            <div
              className="absolute inset-0 border rounded-2xl"
              style={{ borderColor: `${theme.colors.accent}30` }}
            />
            <div className="relative z-10 px-8 py-12 md:px-14 md:py-16 text-center">
              <span
                className="text-[11px] tracking-[0.38em] uppercase block mb-5"
                style={{ color: theme.colors.accent }}
              >
                Cet univers vous correspond ?
              </span>
              <p
                className="font-display text-2xl md:text-3xl mb-8"
                style={{ color: theme.colors.text }}
              >
                Construisons votre expérience.
              </p>
              <Button href="/contact" variant="primary" size="lg">
                Prendre contact
              </Button>
            </div>
          </motion.div>

          {/* Espace bas */}
          <div className="h-16" />
        </motion.div>
      </div>
    </motion.div>
  )
}
