import React from 'react';

export default function About() {
  const milestones = [
    {
      side: 'left',
      date: 'Q2 2024',
      title: 'The Conception',
      desc: 'Founded in Silicon Valley and Bangalore by AI engineers and corporate attorneys to address legal search inefficiencies.'
    },
    {
      side: 'right',
      date: 'Q4 2024',
      title: 'Seed Funding & Prototype',
      desc: 'Secured $2.4M seed funding from leading Tech VCs. Released the initial version of Nyaya-Legal-LLM trained on federal code.'
    },
    {
      side: 'left',
      date: 'Q2 2025',
      title: 'Enterprise Rollout',
      desc: 'Launched the AI Contract Auditor, securing partnerships with over 50 startups and tech companies.'
    },
    {
      side: 'right',
      date: 'Q1 2026',
      title: 'Nyaya AI 2.0 Launch',
      desc: 'Upgraded models with multi-jurisdictional support, real-time voice, and visual OCR document parsing.'
    }
  ];

  return (
    <section id="about" className="about-section container">
      <div className="section-header center-text">
        <span className="section-tag font-purple">Our Story</span>
        <h2 className="section-title">The Digital Scales of Justice</h2>
        <p className="section-subtitle">Nyaya AI was founded by top tech engineers and seasoned legal advisors to build accessible, transparent judicial technology.</p>
      </div>
      
      <div className="about-vision-grid">
        <div className="vision-card glass-card">
          <i className="fa-solid fa-bullseye text-gold"></i>
          <h3>Our Mission</h3>
          <p>To deliver fast, reliable, and accessible legal guidance to businesses and individuals, breaking down barriers of complex vocabulary and cost.</p>
        </div>
        <div className="vision-card glass-card">
          <i className="fa-solid fa-eye text-teal"></i>
          <h3>Our Vision</h3>
          <p>A society where legal insights are a click away, making fair representation, document audits, and contracts transparent for everyone, everywhere.</p>
        </div>
      </div>

      {/* Timeline of Milestones */}
      <div className="timeline-wrapper">
        <h3 className="timeline-header center-text">Our Journey & Milestones</h3>
        <div className="timeline">
          {milestones.map((milestone, idx) => (
            <div key={idx} className={`timeline-item ${milestone.side}`}>
              <div className="timeline-content glass-card">
                <span className="time-date">{milestone.date}</span>
                <h4>{milestone.title}</h4>
                <p>{milestone.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
