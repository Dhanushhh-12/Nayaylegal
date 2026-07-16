import React, { useState, useEffect, useRef } from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      initials: 'KB',
      bgClass: 'purple-bg',
      name: 'Karan Bhasin',
      role: 'General Counsel, NeoFintech',
      stars: 5,
      title: 'Game-changer for tech startups and corporate agreements!',
      date: 'Reviewed in India on January 14, 2026',
      verified: true,
      text: 'Nyaya AI revolutionized our legal review timeline. Contract risk analysis that previously took three business days is now flagged in 30 seconds, improving deal closure times significantly.'
    },
    {
      initials: 'SM',
      bgClass: 'gold-bg',
      name: 'Sarah Miller',
      role: 'Co-Founder, SparkAI',
      stars: 5,
      title: 'Saved us thousands in early-stage legal consulting fees.',
      date: 'Reviewed in the United States on March 22, 2026',
      verified: true,
      text: "As a startup founder, I couldn't afford expensive attorney hours for basic corporate contracts. Nyaya's legal templates and automated analyzer gave me peace of mind when drafting NDAs."
    },
    {
      initials: 'RJ',
      bgClass: 'teal-bg',
      name: 'Rajesh Joshi',
      role: 'Senior Partner, Joshi & Associates',
      stars: 5,
      title: 'The semantic case law search matches obscure rulings with high precision.',
      date: 'Reviewed in India on April 11, 2026',
      verified: true,
      text: 'The accuracy of the semantic case law research is impressive. It surfaces obscure federal rulings that standard search portals completely omit. A must-have for litigation experts.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [helpfulVotes, setHelpfulVotes] = useState([12, 8, 15]);
  const [voted, setVoted] = useState([false, false, false]);
  const autoSlideTimer = useRef(null);

  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlideTimer.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (autoSlideTimer.current) {
      clearInterval(autoSlideTimer.current);
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    startAutoSlide();
  };

  const handleHelpfulClick = (idx, e) => {
    e.stopPropagation();
    if (voted[idx]) return;
    const newVotes = [...helpfulVotes];
    newVotes[idx] += 1;
    setHelpfulVotes(newVotes);
    
    const newVoted = [...voted];
    newVoted[idx] = true;
    setVoted(newVoted);
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header center-text">
          <span className="section-tag font-gold">Customer Reviews</span>
          <h2 className="section-title">Verified Customer Feedback</h2>
          <p className="section-subtitle">Read detailed reviews from verified compliance officers, corporate counsels, and startup founders.</p>
        </div>
        
        <div className="testimonial-carousel-wrapper">
          <div 
            className="testimonial-carousel" 
            id="testimonial-carousel"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((t, idx) => (
              <div key={idx} className="testimonial-card glass-card review-card">
                
                {/* User Profile Header */}
                <div className="review-profile-header">
                  <div className={`reviewer-initials ${t.bgClass}`}>{t.initials}</div>
                  <div>
                    <h4 className="reviewer-name">{t.name}</h4>
                    <p className="reviewer-role">{t.role}</p>
                  </div>
                </div>

                {/* Star Rating and Title */}
                <div className="review-stars-row">
                  <div className="stars">
                    {Array.from({ length: 5 }).map((_, sIdx) => (
                      <i key={sIdx} className="fa-solid fa-star text-gold"></i>
                    ))}
                  </div>
                  <h4 className="review-title-text">{t.title}</h4>
                </div>

                {/* Review Date and Location */}
                <div className="review-date-text">{t.date}</div>

                {/* Verified Purchase Tag */}
                {t.verified && (
                  <div className="verified-purchase-badge">
                    <i className="fa-solid fa-circle-check text-gold"></i>
                    <span>Verified Purchase</span>
                  </div>
                )}

                {/* Review Content */}
                <p className="testimonial-text review-body-text">{t.text}</p>

                {/* E-commerce Helpful actions footer */}
                <div className="review-actions-footer">
                  <button 
                    className={`helpful-btn ${voted[idx] ? 'voted' : ''}`}
                    onClick={(e) => handleHelpfulClick(idx, e)}
                    disabled={voted[idx]}
                  >
                    Helpful
                  </button>
                  <span className="helpful-count-text">
                    {helpfulVotes[idx]} people found this helpful.
                  </span>
                  <span className="report-abuse-link">Report</span>
                </div>

              </div>
            ))}
          </div>
          
          <div className="carousel-dots">
            {testimonials.map((_, idx) => (
              <span 
                key={idx} 
                className={`carousel-dot ${currentIndex === idx ? 'active' : ''}`}
                onClick={() => handleDotClick(idx)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
