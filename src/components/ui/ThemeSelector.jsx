import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTheme, themes } from '@/context/ThemeContext'
import ExperienceModal from '@/components/ui/ExperienceModal'

export default function ThemeSelector() {
  const { currentTheme, changeTheme } = useTheme()
  const themeList = Object.values(themes).filter(t => t.id !== 'default')
  const [expandedTheme, setExpandedTheme] = useState(null)

  const handleCardClick = (themeId) => {
    changeTheme(themeId)
    setExpandedTheme(themeId)
  }

  const expandedThemeData = expandedTheme ? themes[expandedTheme] : null

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {themeList.map((theme, index) => (
          <motion.div
            key={theme.id}
            onClick={() => handleCardClick(theme.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleCardClick(theme.id)}
            className={`
              group relative overflow-hidden p-6 md:p-8 rounded-sm
              border transition-all duration-700 ease-cinematic
              theme-transition text-left cursor-pointer
              ${currentTheme === theme.id
                ? 'border-[var(--theme-accent)]'
                : 'border-[var(--color-text-secondary)]/20 hover:border-[var(--theme-accent)]/50'
              }
            `}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {theme.image && (
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${theme.image})` }}
              />
            )}
            <div
              className="absolute inset-0 transition-opacity duration-700"
              style={{
                background: `linear-gradient(to bottom, ${theme.colors.bg}cc 0%, ${theme.colors.bg}f0 60%, ${theme.colors.bg} 100%)`,
              }}
            />
            <div className="relative z-10">
              <span
                className="text-[10px] tracking-[0.3em] uppercase mb-4 block"
                style={{ color: theme.colors.accent }}
              >
                {theme.genre}
              </span>
              <h3
                className="font-display text-lg md:text-xl mb-3 leading-snug"
                style={{ color: theme.colors.text, fontStyle: 'italic' }}
              >
                {theme.tagline}
              </h3>
              <span
                className="text-[10px] tracking-[0.22em] uppercase mb-3 block opacity-50"
                style={{ color: theme.colors.text }}
              >
                {theme.name}
              </span>
              <p
                className="text-xs leading-relaxed"
                style={{ color: theme.colors.text, opacity: 0.55 }}
              >
                {theme.description}
              </p>
            </div>

            {currentTheme === theme.id && (
              <motion.div
                className="absolute top-4 right-4 w-2 h-2 rounded-full z-10"
                style={{ backgroundColor: theme.colors.accent }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {expandedThemeData && (
          <ExperienceModal
            theme={expandedThemeData}
            onClose={() => setExpandedTheme(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
