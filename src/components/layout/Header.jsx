import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  // Manage body class to prevent scrollbar shift
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }

    return () => {
      document.body.classList.remove('menu-open')
    }
  }, [isMenuOpen])
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 100], [0, 1])
  const headerBlur = useTransform(scrollY, [0, 100], [0, 10])
  const navItems = [
    { path: '/', label: 'Accueil' },
    { path: '/studio', label: 'Studio' },
    { path: '/inspirations', label: 'Inspirations' },
    { path: '/contact', label: 'Contact' },
  ]
  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 theme-transition"
        style={{
          backgroundColor: `rgba(var(--theme-bg-rgb, 26, 26, 26), ${headerOpacity})`,
          backdropFilter: `blur(${headerBlur}px)`,
        }}
      >
        <nav className="flex items-center justify-between px-6 md:px-12 h-20">
          <Link
            to="/"
            className="relative z-50 inline-flex items-center"
            aria-label="Studio Parenthèse — Accueil"
            onClick={() => setIsMenuOpen(false)}
          >
            <Logo />
          </Link>
          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                className="relative group"
                whileHover="hover"
              >
                <Link
                  to={item.path}
                  className="relative"
                >
                  <motion.span
                    className={`
                      text-sm tracking-wide transition-colors duration-300
                      ${
                        location.pathname === item.path
                          ? 'text-[var(--theme-accent)]'
                          : 'text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]'
                      }
                    `}
                    initial={{ y: 0 }}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>

                  {/* Animated underline */}
                  {location.pathname === item.path ? (
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-0.5"
                      style={{
                        background: 'linear-gradient(90deg, var(--theme-accent) 0%, var(--theme-accent) 50%, rgba(var(--theme-accent-rgb), 0) 100%)',
                      }}
                      layoutId="navIndicator"
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-0.5"
                      initial={{ scaleX: 0, originX: '0%' }}
                      whileHover={{ scaleX: 1 }}
                      style={{
                        background: 'linear-gradient(90deg, var(--theme-accent) 0%, rgba(var(--theme-accent-rgb), 0) 100%)',
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
          <button
            className="relative z-50 md:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <div className="relative w-6 h-4">
              <motion.span
                className="absolute left-0 w-full h-px"
                style={{ backgroundColor: 'var(--color-text-primary)' }}
                animate={{
                  top: isMenuOpen ? '50%' : '0%',
                  rotate: isMenuOpen ? 45 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.span
                className="absolute left-0 top-1/2 w-full h-px"
                style={{ backgroundColor: 'var(--color-text-primary)' }}
                animate={{
                  opacity: isMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute left-0 w-full h-px"
                style={{ backgroundColor: 'var(--color-text-primary)' }}
                animate={{
                  bottom: isMenuOpen ? '50%' : '0%',
                  top: isMenuOpen ? '50%' : 'auto',
                  rotate: isMenuOpen ? -45 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </button>
        </nav>
      </motion.header>
      <motion.div
        className={`
          fixed inset-0 z-30 md:hidden
          flex flex-col items-center justify-center
          theme-transition
        `}
        style={{ backgroundColor: 'var(--theme-bg)' }}
        initial={false}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? 'auto' : 'none',
          backdropFilter: isMenuOpen ? 'blur(8px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.4, ease: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <motion.nav
          className="flex flex-col items-center gap-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isMenuOpen ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isMenuOpen ? 1 : 0,
                y: isMenuOpen ? 0 : 20,
              }}
              transition={{
                duration: 0.4,
                delay: isMenuOpen ? index * 0.08 : 0,
                ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              whileHover={{ scale: 1.05, x: 10 }}
            >
              <Link
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`
                  font-display text-3xl transition-colors duration-300
                  ${
                    location.pathname === item.path
                      ? 'text-[var(--theme-accent)]'
                      : 'text-[var(--color-text-primary)]'
                  }
                `}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
      </motion.div>
    </>
  )
}
