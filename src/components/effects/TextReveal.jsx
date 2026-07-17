import { motion } from 'framer-motion'
export default function TextReveal({ 
  children, 
  delay = 0,
  className = '',
  as = 'div',
  ...props 
}) {
  const Component = motion[as] || motion.div
  return (
    <div className="overflow-hidden">
      <Component
        initial={{ y: '100%', opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 1,
          delay,
          ease: [0.16, 1, 0.3, 1]
        }}
        className={className}
        {...props}
      >
        {children}
      </Component>
    </div>
  )
}
