import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Impact from '@/components/Impact'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import GitHubWidget from '@/components/GitHubWidget'
import Skills from '@/components/Skills'
import Contact, { Footer } from '@/components/Contact'
import VapiWidget from '@/components/VapiWidget'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Impact />
        <Experience />
        <Projects />
        <GitHubWidget />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <VapiWidget />
    </>
  )
}
