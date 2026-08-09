import Nav from './components/Nav'
import CursorRipple from './components/CursorRipple'
import AmbientBackground from './components/AmbientBackground'
import Reveal from './components/Reveal'
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
      <AmbientBackground />
      <CursorRipple />
      <Nav />
      <main>
        <Hero />
        <Reveal><About /></Reveal>
        <Reveal><Works /></Reveal>
        <Reveal><Process /></Reveal>
        <Reveal><Skills /></Reveal>
        <Reveal><Timeline /></Reveal>
        <Reveal><Voice /></Reveal>
        <Reveal><Goals /></Reveal>
        <Reveal><Contact /></Reveal>
      </main>
    </>
  )
}
