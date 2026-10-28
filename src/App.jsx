// The single page: navbar, sections in order, footer.
// To add a new section: copy a file in components/sections/, import it here,
// render it inside <main>, and add its link in src/data/navigation.js.
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BackToTop from './components/ui/BackToTop';
import ScrollProgress from './components/ui/ScrollProgress';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';
import { usePageMetadata } from './hooks/usePageMetadata';

export default function App() {
  usePageMetadata();

  return (
    <div className="min-h-screen bg-page text-ink">
      {/* Soft aurora glows fixed behind everything */}
      <div className="aurora" aria-hidden="true" />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
