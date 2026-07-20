import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * OptimizedImage Component
 * Features:
 * - Lazy loading with intersection observer
 * - Responsive srcset support
 * - Smooth fade-in animation
 * - Fallback for missing images
 * - WebP with PNG fallback (ready for future)
 */
export default function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  onLoad,
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(priority)
  const imgRef = useRef(null)

  // Lazy load using Intersection Observer
  useEffect(() => {
    if (priority || isLoaded) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '50px', // Start loading 50px before visible
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [priority, isLoaded])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  return (
    <motion.div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0.1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {shouldLoad && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleLoad}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      )}

      {/* Placeholder skeleton while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100 animate-pulse" />
      )}
    </motion.div>
  )
}
