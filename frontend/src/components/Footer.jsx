import React, { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | submitted

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');

    // Simulate API call
    setTimeout(() => {
      setStatus('submitted');
      setEmail('');
    }, 800);
  };

  return (
    <footer className="main-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="#" className="nav-logo">
            <div className="logo-icon">
              <i className="fa-solid fa-scale-balanced"></i>
            </div>
            <span>Nyaya<span class="gold-text">AI</span></span>
          </a>
          <p className="footer-desc">Legal Technology built to simplify compliance, audit agreements, and research case laws dynamically with advanced intelligence.</p>
        </div>
        
        <div className="footer-links-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#case-studies">Success Stories</a></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4>Legal Resources</h4>
          <ul>
            <li><a href="#resources">Blogs & Articles</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Cookie Guidelines</a></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h4>Subscribe to Nyaya Brief</h4>
          <p>Get weekly analyses of changing AI regulations and LegalTech advancements directly in your inbox.</p>
          
          {status !== 'submitted' ? (
            <form id="newsletter-form" className="newsletter-input-group" onSubmit={handleSubmit}>
              <input 
                type="email" 
                placeholder="enter your email..." 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'submitting'}
              />
              <button type="submit" aria-label="Subscribe" disabled={status === 'submitting'}>
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          ) : (
            <div className="newsletter-success" id="newsletter-success" style={{ display: 'block' }}>
              <p className="text-teal">
                <i className="fa-solid fa-circle-check"></i> Subscribed successfully!
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="footer-bottom container">
        <p>&copy; 2026 Nyaya AI Inc. All rights reserved. Designed for digital justice advocacy.</p>
      </div>
    </footer>
  );
}
