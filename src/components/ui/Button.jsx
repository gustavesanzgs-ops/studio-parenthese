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
  disabled = false,
  ...props
}) {
  const baseStyles = `
    relative inline-flex items-center justify-center
    font-body tracking-wide
    rounded-sm overflow-hidden
    theme-transition
    disabled:opacity-50 disabled:cursor-not-allowed
  `

  const variants = {
    primary: `
      border border-[var(--theme-accent)]/40
      text-[var(--color-text-primary)]
      bg-gradient-to-br from-[var(--theme-accent)]/5 to-[var(--theme-accent)]/0
      hover:border-[var(--theme-accent)]/80
      hover:bg-gradient-to-br hover:from-[var(--theme-accent)]/12 hover:to-[var(--theme-accent)]/5
    `,
    ghost: `
      text-[var(--color-text-secondary)]
      hover:text-[var(--theme-accent)]
    `,
    accent: `
      bg-[var(--theme-accent)]/15
      border border-[var(--theme-accent)]/40
      text-[var(--color-text-primary)]
      hover:bg-[var(--theme-accent)]/25
      hover:border-[var(--theme-accent)]/60
    `,
  }

  const sizes = {
    sm: 'px-4 py-2.5 text-xs min-h-[2.5rem] min-w-[2.5rem]',
    md: 'px-6 py-3 text-sm min-h-[2.75rem] min-w-[2.75rem]',
    lg: 'px-8 py-4 text-base min-h-[3.25rem] min-w-[3.25rem]',
  }

  const isInternal = href && href.startsWith('/')
  const Component = isInternal ? MotionLink : href ? motion.a : motion.button

  return (
    <Component
      {...(isInternal ? { to: href } : { href })}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={!disabled ? { scale: 1.04 } : {}}
      whileTap={!disabled ? { scale: 0.96 } : {}}
      transition={{
        duration: 0.3,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      {...props}
    >
      {/* Gradient border effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, var(--theme-accent), rgba(var(--theme-accent-rgb), 0))`,
          mixBlendMode: 'overlay'
        }}
      />

      {/* Content wrapper */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </Component>
  )
}
