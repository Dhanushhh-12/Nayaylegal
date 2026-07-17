import React, { useState, useEffect, useRef } from 'react';

function StatCard({ icon, target, label }) {
  const [value, setValue] = useState(0);
  const cardRef = useRef(null);
  const animStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !animStarted.current) {
          animStarted.current = true;
          startAnimation();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [target]);

  const startAnimation = () => {
    const isFloat = target % 1 !== 0;
    const duration = 2000; // ms
    const stepTime = 30; // ms
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(current);
      }
    }, stepTime);
  };

  const isFloat = target % 1 !== 0;
  const displayValue = isFloat
    ? value.toFixed(1) + '%'
    : Math.round(value).toLocaleString() + (target > 100 ? '+' : '');

  return (
    <div ref={cardRef} className="stat-card glass-card">
      <div className="stat-icon">
        <i className={icon}></i>
      </div>
      <h3 className="stat-number">{displayValue}</h3>
      <p className="stat-label">{label}</p>
    </div>
  );
}

export default function Hero() {
  const stats = [
    { icon: 'fa-solid fa-microchip', target: 99.4, label: 'AI Accuracy Rate' },
    { icon: 'fa-solid fa-file-invoice', target: 15000, label: 'Contracts Analyzed' },
    { icon: 'fa-solid fa-gauge-high', target: 2, label: 'Second Avg Response' },
    { icon: 'fa-solid fa-user-shield', target: 100, label: 'Data Privacy Level (%)' },
  ];

  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="badge animate-fade-in animated">
            <span class="badge-dot"></span>
            <span class="badge-text">Next-Gen Legal Technology</span>
          </div>
          <h1 className="hero-title animate-fade-in-up animated">
            Justice Powered by <br />
            <span className="gradient-text">Artificial Intelligence</span>
          </h1>
          <p className="hero-subtitle animate-fade-in-up delay-1 animated">
            Nyaya AI simplifies legal information, document analysis, and AI-assisted legal guidance through intelligent technology designed for individuals, businesses, startups, and legal professionals.
          </p>
          <div className="hero-ctas animate-fade-in-up delay-2 animated">
            <a href="#features" className="btn btn-primary btn-glow">
              <span>Try AI Assistant</span>
              <i className="fa-solid fa-arrow-right"></i>
            </a>
            <a href="#services" className="btn btn-secondary">
              <span>Explore Services</span>
            </a>
          </div>
      </div>
      
      {/* Statistics Counters Section */}
      <div className="stats-section">
        <div className="container stats-container">
          {stats.map((stat, i) => (
            <StatCard key={i} icon={stat.icon} target={stat.target} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
