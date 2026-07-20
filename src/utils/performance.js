/**
 * Performance Optimization Utilities
 * Handles lazy loading, prefetching, and caching strategies
 */

/**
 * Prefetch a route for faster navigation
 */
export const prefetchRoute = (path) => {
  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = path
  document.head.appendChild(link)
}

/**
 * Image prefetching for critical images
 */
export const prefetchImage = (src) => {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = src
  document.head.appendChild(link)
}

/**
 * Debounce function for scroll/resize events
 */
export const debounce = (func, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

/**
 * Throttle function for frequent events
 */
export const throttle = (func, limit) => {
  let inThrottle
  return (...args) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Monitor Web Vitals
 */
export const reportWebVitals = (metric) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`${metric.name}:`, metric.value)
  }
}

/**
 * Setup page-specific optimizations
 */
export const optimizePage = (pageName) => {
  // Prefetch next likely routes
  const routePrefetch = {
    home: ['/studio', '/inspirations'],
    studio: ['/contact', '/inspirations'],
    contact: ['/', '/studio'],
    inspirations: ['/studio', '/contact'],
  }

  const prefetchRoutes = routePrefetch[pageName] || []
  prefetchRoutes.forEach(prefetchRoute)
}

/**
 * Intersection Observer for elements
 */
export const observeElements = (selector, callback) => {
  if (!('IntersectionObserver' in window)) {
    return
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry.target)
        observer.unobserve(entry.target)
      }
    })
  }, {
    rootMargin: '50px',
  })

  document.querySelectorAll(selector).forEach((el) => {
    observer.observe(el)
  })
}

/**
 * Reduce motion preference support
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Get animation config based on user preference
 */
export const getAnimationConfig = (defaultDuration = 0.3) => {
  if (prefersReducedMotion()) {
    return {
      duration: 0.01,
      transition: { duration: 0 },
    }
  }
  return {
    duration: defaultDuration,
    transition: { duration: defaultDuration, ease: [0.16, 1, 0.3, 1] },
  }
}

/**
 * Cache management
 */
export const cacheManager = {
  set: (key, value, ttl = 3600000) => {
    const item = {
      value,
      expiry: Date.now() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
  },

  get: (key) => {
    const item = localStorage.getItem(key)
    if (!item) return null

    const { value, expiry } = JSON.parse(item)
    if (Date.now() > expiry) {
      localStorage.removeItem(key)
      return null
    }
    return value
  },

  remove: (key) => {
    localStorage.removeItem(key)
  },

  clear: () => {
    localStorage.clear()
  },
}
