import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springConfig = { damping: 25, stiffness: 200 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  useEffect(() => {
    const hasHover = window.matchMedia('(hover: hover)').matches
    if (!hasHover) return
    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)
    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll('a, button, [data-hover]')
      hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovering(true))
        el.addEventListener('mouseleave', () => setIsHovering(false))
      })
    }
    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    addHoverListeners()
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      observer.disconnect()
    }
  }, [cursorX, cursorY])
  if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches) {
    return null
  }
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div 
            className="w-8 h-8 rounded-full border transition-colors duration-500"
            style={{ borderColor: 'var(--theme-accent)' }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
            style={{ backgroundColor: 'var(--theme-accent)' }}
            animate={{
              scale: isHovering ? 3 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, var(--theme-accent) 0%, transparent 70%)`,
          }}
          animate={{
            scale: isHovering ? 1.2 : 1,
            opacity: isVisible ? 0.15 : 0,
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </>
  )
}
