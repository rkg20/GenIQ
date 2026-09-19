import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import ChatWidget from './components/ChatWidget/ChatWidget'

const Home = lazy(() => import('./pages/Home/Home'))
const HowItWorks = lazy(() => import('./pages/HowItWorks/HowItWorks'))
const Journey = lazy(() => import('./pages/Journey/Journey'))
const Parents = lazy(() => import('./pages/Parents/Parents'))
const Students = lazy(() => import('./pages/Students/Students'))
const Mentors = lazy(() => import('./pages/Mentors/Mentors'))
const Pricing = lazy(() => import('./pages/Pricing/Pricing'))
const Resources = lazy(() => import('./pages/Resources/Resources'))
const Contact = lazy(() => import('./pages/Contact/Contact'))
const Login = lazy(() => import('./pages/Login/Login'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword/ForgotPassword'))
const Checkout = lazy(() => import('./pages/Checkout/Checkout'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main">
        <Suspense fallback={<div className="section container">Loading…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/parents" element={<Parents />} />
            <Route path="/students" element={<Students />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
