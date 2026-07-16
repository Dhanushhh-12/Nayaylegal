import React from 'react';

export default function Services() {
  const offerings = [
    {
      badge: 'Bestseller',
      iconClass: 'fa-solid fa-robot',
      bgClass: 'purple-bg',
      badgeBorder: 'bestseller-badge',
      title: 'AI Legal Assistant',
      desc: 'Receive immediate contextual guidance on civil, commercial, corporate, and labor disputes based on active legal databases.',
      rating: 4.9,
      reviewsCount: '248',
      price: 'Free Trial',
      subPrice: 'then $29/mo',
      bullets: [
        { icon: 'fa-solid fa-circle-chevron-right text-purple', text: 'Smart conversational reasoning' },
        { icon: 'fa-solid fa-circle-chevron-right text-purple', text: 'Instant definition of legal terms' }
      ]
    },
    {
      badge: 'Popular',
      iconClass: 'fa-solid fa-file-lines',
      bgClass: 'gold-bg',
      badgeBorder: 'popular-badge',
      title: 'Legal Summarizer',
      desc: 'Upload multi-page contracts, affidavits, or case laws and get brief, bullet-point summaries of critical clauses.',
      rating: 4.8,
      reviewsCount: '192',
      price: '$19/mo',
      subPrice: 'or $180 billed annually',
      bullets: [
        { icon: 'fa-solid fa-circle-chevron-right text-gold', text: 'Extract obligations & timelines' },
        { icon: 'fa-solid fa-circle-chevron-right text-gold', text: 'Translate legalese to plain language' }
      ]
    },
    {
      badge: 'Highly Rated',
      iconClass: 'fa-solid fa-signature',
      bgClass: 'teal-bg',
      badgeBorder: 'rated-badge',
      title: 'Contract Auditor',
      desc: 'Highlight potential liabilities, missing details, standard clauses, and unfair terms in agreements automatically.',
      rating: 4.9,
      reviewsCount: '315',
      price: 'Free Audit',
      subPrice: 'then $39/mo',
      bullets: [
        { icon: 'fa-solid fa-circle-chevron-right text-teal', text: 'Identifies severe liability risks' },
        { icon: 'fa-solid fa-circle-chevron-right text-teal', text: 'Clause modification advice' }
      ]
    },
    {
      badge: 'Research',
      iconClass: 'fa-solid fa-magnifying-glass-chart',
      bgClass: 'blue-bg',
      badgeBorder: 'info-badge',
      title: 'Semantic Case Search',
      desc: 'Search through thousands of court judgments, statutory laws, and code regulations using semantic natural language query.',
      rating: 4.7,
      reviewsCount: '154',
      price: '$49/mo',
      subPrice: 'unlimited database access',
      bullets: [
        { icon: 'fa-solid fa-circle-chevron-right text-blue', text: 'Match relevant court precedents' },
        { icon: 'fa-solid fa-circle-chevron-right text-blue', text: 'Up-to-date legislation references' }
      ]
    },
    {
      badge: 'Templates',
      iconClass: 'fa-solid fa-folder-open',
      bgClass: 'purple-bg',
      badgeBorder: 'info-badge',
      title: 'Vetted Legal Templates',
      desc: 'Generate professionally formatted NDAs, employment agreements, software licenses, lease deeds, and legal notices.',
      rating: 4.8,
      reviewsCount: '207',
      price: '$9/doc',
      subPrice: 'or $19/mo subscription',
      bullets: [
        { icon: 'fa-solid fa-circle-chevron-right text-purple', text: 'Dynamic input customization' },
        { icon: 'fa-solid fa-circle-chevron-right text-purple', text: 'Instantly ready PDF downloads' }
      ]
    },
    {
      badge: 'Compliance',
      iconClass: 'fa-solid fa-building-shield',
      bgClass: 'gold-bg',
      badgeBorder: 'info-badge',
      title: 'Compliance Assistant',
      desc: 'Ensure your company satisfies GDPR, HIPAA, financial regulations, and startup labor compliance guidelines automatically.',
      rating: 4.9,
      reviewsCount: '118',
      price: '$79/mo',
      subPrice: 'includes compliance risk reports',
      bullets: [
        { icon: 'fa-solid fa-circle-chevron-right text-gold', text: 'Dynamic regulatory checklists' },
        { icon: 'fa-solid fa-circle-chevron-right text-gold', text: 'Compliance risk reports' }
      ]
    }
  ];

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-header center-text">
          <span className="section-tag font-gold">Our Offerings</span>
          <h2 className="section-title">Intelligent Legal Services</h2>
          <p className="section-subtitle">A comprehensive suite of LegalTech tools tailored to automate document generation, search law precedents, and ensure compliance.</p>
        </div>
        
        <div className="services-grid">
          {offerings.map((offering, index) => (
            <div key={index} className="service-card glass-card product-card">
              <div className="service-header">
                <div className={`service-icon ${offering.bgClass}`}>
                  <i className={offering.iconClass}></i>
                </div>
                <span className={`product-badge-tag ${offering.badgeBorder}`}>
                  {offering.badge}
                </span>
              </div>
              
              <div className="product-details">
                <h3>{offering.title}</h3>
                
                {/* E-Commerce Star Ratings */}
                <div className="product-rating">
                  <div className="stars-wrapper">
                    <i className="fa-solid fa-star text-gold"></i>
                    <i className="fa-solid fa-star text-gold"></i>
                    <i className="fa-solid fa-star text-gold"></i>
                    <i className="fa-solid fa-star text-gold"></i>
                    <i className="fa-solid fa-star-half-stroke text-gold"></i>
                  </div>
                  <span className="rating-num">{offering.rating}</span>
                  <span className="reviews-count">({offering.reviewsCount} reviews)</span>
                </div>
                
                {/* Pricing Details */}
                <div className="product-pricing">
                  <span className="pricing-tag">{offering.price}</span>
                  <span className="pricing-sub">{offering.subPrice}</span>
                </div>
                
                <p className="product-desc">{offering.desc}</p>
                
                <ul className="service-bullets">
                  {offering.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx}>
                      <i className={bullet.icon}></i> {bullet.text}
                    </li>
                  ))}
                </ul>
                
                {/* E-commerce purchase-style buttons */}
                <div className="product-actions">
                  <a href="#features" className="btn btn-primary btn-product-action">
                    <i className="fa-solid fa-bolt"></i> Launch Simulator
                  </a>
                  <a href="#contact" className="btn btn-secondary btn-product-secondary">
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
