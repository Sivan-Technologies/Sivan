import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Audience from './components/Audience.jsx'
import Services from './components/Services.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Transparency from './components/Transparency.jsx'
import Scope from './components/Scope.jsx'
import Avalanche from './components/Avalanche.jsx'
import Pilot from './components/Pilot.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Audience />
        <Services />
        <HowItWorks />
        {/* "Safety" — operations grouping (matches the live site's #operations anchor) */}
        <div id="operations">
          <Transparency />
          <Scope />
          <Avalanche />
        </div>
        <Pilot />
      </main>
      <Footer />
    </>
  )
}
