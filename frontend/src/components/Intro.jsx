import React from 'react';

export default function Intro() {
  return (
    <section className="intro-section container">
      <div className="section-header center-text">
        <h2 className="section-title">The Future of Legal Assistance</h2>
        <p className="section-subtitle">Bridging the gap between complex legal code and daily human understanding with state-of-the-art Large Language Models customized for judicial systems.</p>
      </div>
      <div className="intro-grid">
        <div className="intro-card glass-card">
          <i className="fa-solid fa-circle-check intro-card-icon text-purple"></i>
          <h3>Accessible to All</h3>
          <p>Democratizing legal resources, translation of legalese into layman's terms, and providing instant definitions of complex legal vocabulary.</p>
        </div>
        <div className="intro-card glass-card">
          <i className="fa-solid fa-business-time intro-card-icon text-gold"></i>
          <h3>Built for Enterprise</h3>
          <p>Speed up commercial deal flows, identify hidden liability risks, and verify compliance with regional laws automatically.</p>
        </div>
        <div className="intro-card glass-card">
          <i className="fa-solid fa-scale-balanced intro-card-icon text-teal"></i>
          <h3>Empowering Lawyers</h3>
          <p>Not a replacement, but an amplifier. Cut legal research time from days to minutes, drafting documents seamlessly from vetted templates.</p>
        </div>
      </div>
    </section>
  );
}
