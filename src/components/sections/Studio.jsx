import { motion } from 'framer-motion'
import TextReveal from '@/components/effects/TextReveal'
import OptimizedImage from '@/components/ui/OptimizedImage'

export default function Studio() {
  return (
    <section className="min-h-screen px-6 py-20 md:px-12 lg:px-24 text-white">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-16 max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <TextReveal>
            <h1
              className="font-display tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase' }}
            >
              Studio{' '}
              <span style={{ color: 'var(--theme-accent)', fontStyle: 'italic', fontFamily: "'Playfair Display', Georgia, serif", textTransform: 'none' }}>
                Parenthèse
              </span>
            </h1>
          </TextReveal>
          <p className="font-body mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">
            Nous sommes Williams et Gustave. Ensemble, nous transformons des moments de vie —
            anniversaires, voyages entre amis, demandes en mariage — en expériences immersives
            où votre entourage devient acteur d'une histoire pensée pour lui.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div>
              <span className="font-body text-sm uppercase tracking-[0.32em] text-[var(--theme-accent)]">
                Notre approche
              </span>
              <h2 className="font-display mt-4 text-3xl font-semibold leading-tight md:text-4xl">
                L'art de transformer un moment en souvenir.
              </h2>
            </div>

            <div className="space-y-6 text-[var(--color-text-secondary)]">
              <p className="font-body">
                Chaque expérience naît d'une conversation. Nous partons de vos envies,
                de votre histoire, de vos proches — et nous construisons un récit sur mesure
                autour d'un univers qui vous ressemble.
              </p>
              <p className="font-body italic" style={{ color: 'var(--theme-accent)', opacity: 0.9 }}>
                « Nous créons le fond, vous en êtes la forme. »
              </p>
              <p className="font-body">
                Le décor s'adapte à l'histoire. Nous transformons votre lieu en un univers unique
                pour donner vie à votre expérience — villas, châteaux, lieux insolites, espaces naturels.
                Vous ne gérez rien. Vous vivez pleinement.
              </p>
              <p className="font-body">
                Basés à Paris, nous intervenons partout en France et en Europe.
                Storytelling, direction artistique, scénographie, logistique complète — de la première
                idée à la dernière scène.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-[2rem] bg-[#111111] shadow-2xl"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
          >
            <OptimizedImage
              src="https://images.pexels.com/photos/5610117/pexels-photo-5610117.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Studio Parenthèse — expérience immersive"
              width={1260}
              height={750}
              className="object-cover w-full h-[520px]"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8">
              <p className="text-sm uppercase tracking-[0.36em] text-[var(--theme-accent)]">
                En coulisses
              </p>
              <p className="mt-3 text-lg leading-7">
                Chaque expérience est orchestrée pour que votre entourage vive quelque chose de rare.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {[
            {
              title: 'Approche narrative',
              text: "Votre entourage reçoit un rôle, vit des temps forts scénarisés et repart avec un souvenir inoubliable. L'histoire est écrite pour lui.",
            },
            {
              title: 'Cadre sensoriel',
              text: "Ambiance visuelle, scénographie, lumières, musique. Chaque détail sert le récit et crée une immersion totale dans l'univers choisi.",
            },
            {
              title: 'Clé en main',
              text: 'Lieu, hébergement, traiteur, prestataires, encadrement sur place. De la première idée à la dernière scène, nous prenons tout en charge.',
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              className="rounded-[1.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="font-display text-xl font-semibold">{item.title}</h3>
              <p className="font-body mt-4 text-sm leading-7 text-[var(--color-text-secondary)]">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
