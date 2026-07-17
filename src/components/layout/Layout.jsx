import Header from './Header'
import Footer from './Footer'
import Cursor from './Cursor'
import GrainOverlay from '@/components/ui/GrainOverlay'
import TransitionOverlay from '@/components/ui/TransitionOverlay'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
export default function Layout({ children }) {
  useSmoothScroll()
  return (
    <div className="min-h-screen theme-transition" style={{ background: 'var(--theme-bg-gradient)' }}>
      <Cursor />
      <GrainOverlay />
      <TransitionOverlay />
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}
