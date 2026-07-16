import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | submitted

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('submitted');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <section id="contact" className="contact-section container">
      <div className="section-header center-text">
        <span className="section-tag font-gold">Get in Touch</span>
        <h2 className="section-title">Talk to our LegalTech Consultants</h2>
        <p className="section-subtitle">Reach out to request an investor demo, enquire about custom enterprise solutions, or ask a question.</p>
      </div>
      
      <div className="contact-split">
        {/* Info & Map */}
        <div className="contact-info-panel glass-card">
          <h3>Contact Information</h3>
          <p>Connect with our engineering or support team directly through our active channels.</p>
          
          <div className="info-items">
            <div className="info-item">
              <i className="fa-solid fa-envelope info-icon"></i>
              <div>
                <span>Email Us</span>
                <a href="mailto:info@nyaya.ai">info@nyaya.ai</a>
              </div>
            </div>
            <div className="info-item">
              <i className="fa-solid fa-phone info-icon"></i>
              <div>
                <span>Phone Number</span>
                <a href="tel:+18005556929">+1 (800) 555-NYAYA</a>
              </div>
            </div>
            <div className="info-item">
              <i className="fa-solid fa-location-dot info-icon"></i>
              <div>
                <span>Headquarters</span>
                <p>500 Justice Boulevard, Tech District, San Francisco, CA 94107</p>
              </div>
            </div>
          </div>

          {/* Social Handles */}
          <div className="contact-socials-wrapper">
            <h4>Follow Our Progress</h4>
            <div className="social-icons">
              <a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>
              <a href="#" aria-label="X"><i class="fa-brands fa-x-twitter"></i></a>
              <a href="#" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
              <a href="#" aria-label="Youtube"><i class="fa-brands fa-youtube"></i></a>
            </div>
          </div>

          {/* Holographic Office Map Simulation */}
          <div className="office-map-widget">
            <div className="map-glow"></div>
            <div className="map-overlay">
              <i className="fa-solid fa-location-pin text-gold ping"></i>
              <span>Nyaya HQ (San Francisco)</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-panel glass-card">
          <h3>Send Us a Message</h3>
          {status !== 'submitted' ? (
            <form id="contact-form" className="styled-form" onSubmit={handleSubmit}>
              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="form-name">Full Name</label>
                  <input 
                    type="text" 
                    id="form-name" 
                    placeholder="John Doe" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={status === 'submitting'}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="form-email">Email Address</label>
                  <input 
                    type="email" 
                    id="form-email" 
                    placeholder="john@company.com" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={status === 'submitting'}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="form-subject">Subject</label>
                <input 
                  type="text" 
                  id="form-subject" 
                  placeholder="Enterprise Consultation" 
                  required 
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  disabled={status === 'submitting'}
                />
              </div>
              <div className="form-group">
                <label htmlFor="form-message">Message Details</label>
                <textarea 
                  id="form-message" 
                  rows="5" 
                  placeholder="Tell us about your legal workload or enterprise inquiries..." 
                  required 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  disabled={status === 'submitting'}
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="btn btn-primary btn-full btn-glow" 
                id="form-submit-btn"
                disabled={status === 'submitting'}
              >
                <span>{status === 'submitting' ? 'Submitting Request...' : 'Submit Request'}</span>
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          ) : (
            <div className="form-success-msg" id="form-success" style={{ display: 'block' }}>
              <i className="fa-solid fa-circle-check text-teal"></i>
              <h4>Message Sent Successfully!</h4>
              <p>Our consultants will reach back to you within 24 hours.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
