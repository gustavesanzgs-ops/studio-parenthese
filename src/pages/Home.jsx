import { motion } from 'framer-motion'
import Hero from '@/components/sections/Hero'
import Manifesto from '@/components/sections/Manifesto'
import Gallery from '@/components/sections/Gallery'
import Inspirations from '@/components/sections/Inspirations'
export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Hero />

      {/* Premium Divider 1 */}
      <div className="py-12 md:py-24 flex items-center justify-center">
        <motion.div
          className="mx-auto w-px h-32"
          style={{
            background: `linear-gradient(to bottom, transparent, var(--theme-accent), transparent)`,
            boxShadow: '0 0 20px var(--shadow-accent-sm)',
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.7,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>

      <Manifesto />

      {/* Premium Divider 2 */}
      <div className="py-12 md:py-24 flex items-center justify-center">
        <motion.div
          className="mx-auto w-24 h-px"
          style={{
            backgroundColor: 'var(--color-text-secondary)',
            opacity: 0.3,
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.6,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>

      <Gallery />

      {/* Premium Divider 3 */}
      <div className="py-12 md:py-24 flex items-center justify-center">
        <motion.div
          className="mx-auto w-24 h-px"
          style={{
            backgroundColor: 'var(--color-text-secondary)',
            opacity: 0.3,
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.6,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>

      <Inspirations />
    </motion.div>
  )
}
