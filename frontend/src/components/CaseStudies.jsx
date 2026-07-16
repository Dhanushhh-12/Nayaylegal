import React from 'react';

export default function CaseStudies() {
  const cases = [
    {
      img: 'assets/digital_justice.png',
      category: 'Deal of the Day',
      savings: 'Save 80% on Compliance Audits',
      title: 'PayGiga Case Study: Automated Compliance',
      desc: 'PayGiga used Nyaya\'s compliance checker to align their multi-national merchant policies with GDPR regulations within 48 hours, eliminating major legal consulting fees.',
      tag: 'Best Business Value'
    },
    {
      img: 'assets/contract_scanner.png',
      category: 'Limited Time Offer',
      savings: 'Save 20+ Hours / Week',
      title: 'Apex VC Case Study: Due Diligence Acceleration',
      desc: 'Apex VC automated the risk check of investment NDA filings, flagging severe liabilities in standard term sheets instantaneously to close deals faster.',
      tag: 'Partner Choice'
    }
  ];

  return (
    <section id="case-studies" className="case-studies-section container">
      <div className="section-header center-text">
        <span className="section-tag font-blue">Success Spotlights</span>
        <h2 className="section-title">AI Workflows in Action</h2>
        <p className="section-subtitle">Read how our customers optimized operations, minimized compliance risk, and saved hours using our tools.</p>
      </div>
      
      <div className="cases-grid ecom-promo-grid">
        {cases.map((c, idx) => (
          <div key={idx} className="case-card glass-card promo-banner-card">
            <div className="case-image-wrapper promo-img-wrapper">
              <img src={c.img} alt={c.title} className="case-img promo-img" />
              <span className="promo-badge-ribbon">{c.tag}</span>
            </div>
            <div className="case-body promo-body">
              <div className="case-meta promo-meta">
                <span className="promo-category-badge">{c.category}</span>
                <span className="case-savings promo-savings-badge">
                  <i className="fa-solid fa-tags"></i> {c.savings}
                </span>
              </div>
              <h3>{c.title}</h3>
              <p className="promo-desc">{c.desc}</p>
              <div className="promo-footer">
                <a href="#" className="btn btn-primary btn-promo-action">
                  Read Success Story <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
