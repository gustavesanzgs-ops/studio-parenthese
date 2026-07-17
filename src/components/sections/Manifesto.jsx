import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import TextReveal from '@/components/effects/TextReveal'
import ParallaxLayer from '@/components/effects/ParallaxLayer'
export default function Manifesto() {
  const manifestoLines = [
    "Nous ne faisons pas des événements.",
    "Nous écrivons des histoires.",
    "",
    "Où chaque participant joue un rôle.",
    "Une aventure à incarner.",
    "",
    "Chaque détail est une ligne du récit —",
    "narration, scénographie, émotions.",
    "",
    "Des expériences uniques,",
    "dont chacun garde un souvenir marquant.",
  ]
  return (
    <section className="relative py-section px-6 md:px-12">
      <ParallaxLayer speed={-0.2}>
        <div 
          className="absolute top-1/4 -right-48 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        />
      </ParallaxLayer>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <span 
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Manifeste
          </span>
        </motion.div>
        <div className="space-y-4 md:space-y-6">
          {manifestoLines.map((line, index) => (
            <TextReveal 
              key={index} 
              delay={index * 0.08}
              as="p"
              className={
                `
                font-body text-display-md
                transition-colors duration-700
                ${line === '' ? 'h-8' : ''}
              `}
              style={{ 
                color: line.includes('expériences') && line.includes('uniques')
                  ? 'var(--theme-accent)' 
                  : 'var(--color-text-primary)' 
              }}
            >
              {line || '\u00A0'}
            </TextReveal>
          ))}
        </div>
        <motion.div
          className="mt-24 flex flex-col gap-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div 
            className="w-12 h-px"
            style={{ backgroundColor: 'var(--theme-accent)' }}
          />
          <span
            className="text-sm italic"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Un moment unique, intense et inoubliable.
          </span>
          <Button href="/studio" variant="primary" size="md">
            Découvrir le studio
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
