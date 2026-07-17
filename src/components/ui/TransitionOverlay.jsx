import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'
export default function TransitionOverlay() {
  const { isTransitioning } = useTheme()
  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div 
              className="w-1 h-1 rounded-full"
              style={{ 
                backgroundColor: 'var(--theme-accent)',
                boxShadow: '0 0 60px 30px var(--theme-accent-subtle)'
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
