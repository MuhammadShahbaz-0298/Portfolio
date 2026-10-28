// The single page: navbar, sections in order, footer.
// To add a new section: copy a file in components/sections/, add a lazy
// import here, render it inside <Suspense> in <main>, and add its link in
// src/data/navigation.js.
//
// Sections below the fold are lazy-loaded: the browser only downloads and
// runs them after the hero has rendered, which makes the first paint and
// LCP noticeably faster (especially on slow connections).
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
      {/* Soft aurora glows fixed behind everything */}
      <div className="aurora" aria-hidden="true" />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        {/* Below-the-fold sections load in the background (no spinner —
            they appear as soon as their small chunk arrives, usually
            before the visitor scrolls that far). */}
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
