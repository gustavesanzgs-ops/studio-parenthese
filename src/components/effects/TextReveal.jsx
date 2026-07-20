import { motion } from 'framer-motion'

/**
 * Enhanced Text Reveal Component
 * Features:
 * - Smooth slide-up animation
 * - Blur entrance effect
 * - Multiple reveal modes
 * - Customizable timing
 */
export default function TextReveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
  mode = 'slideUp', // slideUp, fadeUp, blur, gradient
  ...props
}) {
  const Component = motion[as] || motion.div

  const variants = {
    slideUp: {
      initial: { y: '100%', opacity: 0 },
      animate: { y: 0, opacity: 1 },
    },
    fadeUp: {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
    },
    blur: {
      initial: { y: 20, opacity: 0, filter: 'blur(10px)' },
      animate: { y: 0, opacity: 1, filter: 'blur(0px)' },
    },
    gradient: {
      initial: { backgroundPosition: '200% 0%', opacity: 0 },
      animate: { backgroundPosition: '0% 0%', opacity: 1 },
    },
  }

  const selected = variants[mode] || variants.slideUp

  return (
    <div className={`overflow-hidden ${mode === 'slideUp' ? '' : ''}`}>
      <Component
        initial={selected.initial}
        whileInView={selected.animate}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 0.6,
          delay,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={className}
        {...props}
      >
        {children}
      </Component>
    </div>
  )
}
