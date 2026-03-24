import Nav from './components/Nav'
import CursorRipple from './components/CursorRipple'
import Hero from './sections/Hero'
import About from './sections/About'
import Works from './sections/Works'
import Process from './sections/Process'
import Skills from './sections/Skills'
import Timeline from './sections/Timeline'
import Voice from './sections/Voice'
import Goals from './sections/Goals'
import Contact from './sections/Contact'

export default function App() {
  return (
    <>
      <CursorRipple />
      <Nav />
      <main>
        <Hero />
        <About />
        <Works />
        <Process />
        <Skills />
        <Timeline />
        <Voice />
        <Goals />
        <Contact />
      </main>
    </>
  )
}
