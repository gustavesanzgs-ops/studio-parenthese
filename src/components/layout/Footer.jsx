import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Logo from './Logo'
export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="relative py-20 md:py-32 px-6 md:px-12 theme-transition">
      <div 
        className="absolute top-0 left-6 right-6 md:left-12 md:right-12 h-px opacity-10"
        style={{ backgroundColor: 'var(--color-text-primary)' }}
      />
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/" className="inline-block" aria-label="Studio Parenthèse — Accueil">
                <Logo footer />
              </Link>
              <p 
                className="mt-6 text-sm leading-relaxed max-w-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Créer des parenthèses émotionnelles dans un monde saturé. 
                Des expériences immersives, contemplatives et artistiques.
              </p>
            </motion.div>
          </div>
          <div className="flex flex-col md:items-end">
            <motion.nav
              className="flex flex-col md:items-end gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {['Studio', 'Inspirations', 'Contact'].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="text-sm transition-colors duration-500 hover:text-[var(--theme-accent)]"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {item}
                </Link>
              ))}
            </motion.nav>
            <motion.div
              className="mt-12 flex gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {['Instagram', 'Vimeo', 'Behance'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-xs tracking-wider uppercase transition-colors duration-500 hover:text-[var(--theme-accent)]"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {social}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
        <motion.div
          className="mt-20 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          style={{ borderTop: '1px solid rgba(var(--color-text-secondary-rgb, 138, 138, 138), 0.1)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span 
            className="text-xs"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            © {currentYear} Studio Parenthèse
          </span>
          <span 
            className="text-xs"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Expériences immersives & contemplatives
          </span>
        </motion.div>
      </div>
    </footer>
  )
}
