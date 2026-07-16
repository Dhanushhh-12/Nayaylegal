import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'features', label: 'AI Features' },
    { id: 'resources', label: 'Resources' },
    { id: 'case-studies', label: 'Cases' },
    { id: 'contact', label: 'Contact' },
  ];

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const handleScroll = () => {
      // Scrolled state for header background
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scroll Spy logic
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.pageYOffset;

      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 150;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id) => {
    setActiveSection(id);
    setIsMobileOpen(false);
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <a href="#" className="nav-logo" onClick={() => handleLinkClick('home')}>
          <div className="logo-icon">
            <i className="fa-solid fa-scale-balanced"></i>
          </div>
          <span>Nyaya<span class="gold-text">AI</span></span>
        </a>
        
        <button 
          className="mobile-toggle" 
          aria-label="Toggle Navigation" 
          id="mobile-toggle"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <i className={isMobileOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars-staggered"}></i>
        </button>
        
        <nav className={`nav-links ${isMobileOpen ? 'open' : ''}`} id="nav-links">
          {navLinks.map((link) => (
            <a 
              key={link.id} 
              href={`#${link.id}`} 
              className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={() => handleLinkClick(link.id)}
            >
              {link.label}
            </a>
          ))}
          <button 
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <i className={theme === 'dark' ? "fa-solid fa-sun" : "fa-solid fa-moon"}></i>
          </button>
          <a 
            href="#features" 
            className="cta-btn nav-cta"
            onClick={() => handleLinkClick('features')}
          >
            Try AI Assistant
          </a>
        </nav>
      </div>
    </header>
  );
}
