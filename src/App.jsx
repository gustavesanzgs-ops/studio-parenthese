import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { ThemeProvider } from '@/context/ThemeContext'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import StudioPage from '@/pages/Studio'
import InspirationsPage from '@/pages/Inspirations'
import ContactPage from '@/pages/Contact'
import { optimizePage } from '@/utils/performance'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll to top smoothly when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [pathname])

  return null
}

function AnimatedRoutes() {
  const location = useLocation()

  // Prefetch related pages based on current route
  useEffect(() => {
    const pageMap = {
      '/': 'home',
      '/studio': 'studio',
      '/inspirations': 'inspirations',
      '/contact': 'contact',
    }
    const currentPage = pageMap[location.pathname]
    if (currentPage) {
      optimizePage(currentPage)
    }
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/studio" element={<StudioPage />} />
        <Route path="/inspirations" element={<InspirationsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  )
}
