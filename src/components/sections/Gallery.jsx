import { motion } from 'framer-motion'
import TextReveal from '@/components/effects/TextReveal'

const PEXELS = (id, w = 900, h = 600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&dpr=1`

const images = [
  {
    id: 1,
    src: PEXELS(16533085, 900, 1100),
    alt: 'Sculptures lumineuses — installation artistique',
    label: 'Installation',
    span: 'row-span-2',
  },
  {
    id: 2,
    src: PEXELS(14487298, 900, 600),
    alt: 'Scène de théâtre — lumière dramatique',
    label: 'Scénographie',
    span: '',
  },
  {
    id: 3,
    src: PEXELS(19883421, 900, 600),
    alt: 'Galerie immersive — lumières kaleidoscopiques',
    label: 'Immersif',
    span: '',
  },
  {
    id: 4,
    src: PEXELS(4722576, 900, 600),
    alt: 'Faisceau de lumière dans la fumée',
    label: 'Ambiance',
    span: '',
  },
  {
    id: 5,
    src: PEXELS(29224583, 900, 600),
    alt: 'Lumière dramatique sur métal — gros plan',
    label: 'Détail',
    span: '',
  },
  {
    id: 6,
    src: PEXELS(19943722, 900, 600),
    alt: 'Silhouettes dans une ruelle brumeuse',
    label: 'Cinématique',
    span: '',
  },
]

export default function Gallery() {
  return (
    <section className="relative py-section px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div>
            <motion.span
              className="text-xs tracking-[0.3em] uppercase block mb-4"
              style={{ color: 'var(--color-text-secondary)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              Portfolio
            </motion.span>
            <TextReveal as="h2" className="font-display text-display-lg">
              <span style={{ color: 'var(--color-text-primary)' }}>Nos</span>
              <span
                className="italic ml-3 transition-colors duration-700"
                style={{ color: 'var(--theme-accent)' }}
              >
                univers
              </span>
            </TextReveal>
          </div>
          <motion.p
            className="hidden md:block text-sm max-w-xs text-right leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Scénographie, ambiances cinématiques,<br />
            gros plans d'objets. Chaque image, une parenthèse.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[240px] md:auto-rows-[280px]">
          {images.map((img, index) => (
            <motion.div
              key={img.id}
              className={`relative overflow-hidden group cursor-pointer ${img.span}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-105"
                loading="lazy"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }}
              />
              <motion.span
                className="absolute bottom-4 left-4 text-xs tracking-[0.25em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ color: 'var(--theme-accent)' }}
              >
                {img.label}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
