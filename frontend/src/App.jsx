import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Services from './components/Services';
import InteractiveDemo from './components/InteractiveDemo';
import About from './components/About';
import WhyChoose from './components/WhyChoose';
import CaseStudies from './components/CaseStudies';
import Testimonials from './components/Testimonials';
import Resources from './components/Resources';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      {/* Animated Gradient Background Mesh */}
      <div className="bg-mesh">
        <div className="mesh-orb orb-1"></div>
        <div class="mesh-orb orb-2"></div>
        <div className="mesh-orb orb-3"></div>
      </div>
      
      {/* Navbar Header */}
      <Navbar />

      {/* Main Sections */}
      <main>
        <Hero />
        <Intro />
        <Services />
        <InteractiveDemo />
        <About />
        <WhyChoose />
        <CaseStudies />
        <Testimonials />
        <Resources />
        <Faq />
        <Contact />
      </main>

      {/* Footer Section */}
      <Footer />
    </>
  );
}
