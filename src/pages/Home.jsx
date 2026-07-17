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
      <div className="py-12 md:py-24">
        <motion.div
          className="mx-auto w-px h-24"
          style={{ 
            background: `linear-gradient(to bottom, transparent, var(--theme-accent), transparent)`
          }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
      </div>
      <Manifesto />
      <div className="py-12 md:py-24">
        <motion.div
          className="mx-auto w-24 h-px"
          style={{ backgroundColor: 'var(--color-text-secondary)', opacity: 0.2 }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
      </div>
      <Gallery />
      <div className="py-12 md:py-24">
        <motion.div
          className="mx-auto w-24 h-px"
          style={{ backgroundColor: 'var(--color-text-secondary)', opacity: 0.2 }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
      </div>
      <Inspirations />
    </motion.div>
  )
}
