import React from 'react';

export default function Resources() {
  const articles = [
    {
      badge: 'Legal Technology',
      title: 'Understanding Artificial Intelligence Regulatory Frameworks',
      desc: 'An in-depth review of how new AI safety bills and legal compliance affect software startups worldwide.',
      readTime: '5 min read'
    },
    {
      badge: 'Contracts',
      title: 'Top 5 Critical Mistakes to Avoid in Startup Co-founder Agreements',
      desc: 'Prevent future equity disputes by learning exactly what terms are frequently litigated under federal corporate law.',
      readTime: '8 min read'
    },
    {
      badge: 'Privacy',
      title: 'GDPR Compliance Checklists for Cross-Border SaaS Products',
      desc: 'A step-by-step documentation guide to auditing user privacy rules and securing database pipelines.',
      readTime: '6 min read'
    }
  ];

  return (
    <section id="resources" className="resources-section container">
      <div className="section-header center-text">
        <span className="section-tag font-teal">Legal Library</span>
        <h2 className="section-title">Articles, Guides & Learning Resources</h2>
        <p className="section-subtitle">Stay informed with the latest insights on legal tech regulations, intellectual property laws, and digital compliance standards.</p>
      </div>
      
      <div className="resources-grid">
        {articles.map((art, idx) => (
          <article key={idx} className="resource-card glass-card">
            <div className="resource-badge">{art.badge}</div>
            <h3>{art.title}</h3>
            <p>{art.desc}</p>
            <div className="resource-footer">
              <span>{art.readTime}</span>
              <a href="#" className="read-more">
                Read Guide <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
