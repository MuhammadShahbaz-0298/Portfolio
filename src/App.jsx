import { lazy, Suspense } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BackToTop from './components/ui/BackToTop';
import ScrollProgress from './components/ui/ScrollProgress';
import Hero from './components/sections/Hero';
import { usePageMetadata } from './hooks/usePageMetadata';

const About = lazy(() => import('./components/sections/About'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Contact = lazy(() => import('./components/sections/Contact'));

export default function App() {
  usePageMetadata();

  return (
    <div className="min-h-screen bg-page text-ink">
      <div className="aurora" aria-hidden="true" />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Projects />
          <Experience />
          <Skills />
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
