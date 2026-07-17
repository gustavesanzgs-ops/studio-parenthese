import { motion } from 'framer-motion'
export default function GrainOverlay() {
  return (
    <motion.div
      className="grain-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      aria-hidden="true"
    />
  )
}
