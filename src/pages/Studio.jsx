import { motion } from 'framer-motion'
import StudioSection from '@/components/sections/Studio'
export default function StudioPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="pt-20"
    >
      <StudioSection />
    </motion.div>
  )
}
