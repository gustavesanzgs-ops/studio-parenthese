import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const MotionLink = motion(Link)

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  ...props
}) {
  const baseStyles = `
    relative inline-flex items-center justify-center
    font-body tracking-wide
    transition-all duration-700 ease-cinematic
    theme-transition
  `
  const variants = {
    primary: `
      border border-[var(--theme-accent)]/30
      text-[var(--color-text-primary)]
      hover:border-[var(--theme-accent)]
      hover:shadow-[0_0_30px_var(--theme-accent-subtle)]
      bg-transparent
    `,
    ghost: `
      text-[var(--color-text-secondary)]
      hover:text-[var(--theme-accent)]
    `,
    accent: `
      bg-[var(--theme-accent)]/10
      border border-[var(--theme-accent)]/20
      text-[var(--color-text-primary)]
      hover:bg-[var(--theme-accent)]/20
      hover:border-[var(--theme-accent)]/40
    `,
  }
  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }
  const isInternal = href && href.startsWith('/')
  const Component = isInternal ? MotionLink : href ? motion.a : motion.button
  return (
    <Component
      {...(isInternal ? { to: href } : { href })}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </Component>
  )
}
