import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Process from './components/Process.jsx'
import WhyUs from './components/WhyUs.jsx'
import Scope from './components/Scope.jsx'
import Payouts from './components/Payouts.jsx'
import CTA from './components/CTA.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <WhyUs />
        <Scope />
        <Payouts />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
