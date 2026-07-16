import React, { useState } from 'react';

export default function Faq() {
  const faqs = [
    {
      q: 'Is Nyaya AI a replacement for a certified lawyer?',
      a: 'No, Nyaya AI is an intelligent legal assistant designed to simplify research, draft documents, and audit contracts. It does not provide official legal representation or establish an attorney-client relationship. We recommend consulting a licensed legal practitioner for complex representation in court filings.'
    },
    {
      q: 'How secure is my sensitive document upload?',
      a: 'Data security is our top priority. We use zero-knowledge architecture with AES-256 bit encryption at rest and TLS 1.3 in transit. Your uploaded contracts and files are processed strictly to extract insights and are never used to train global models, guaranteeing complete confidentiality.'
    },
    {
      q: 'Does the AI support languages other than English?',
      a: 'Yes! Nyaya AI is optimized for multi-language legal frameworks. It supports major regional languages including Hindi, Spanish, French, German, Arabic, and Portuguese. It translates complex legal notices and documents while retaining exact constitutional definitions.'
    },
    {
      q: 'What database does the case semantic search rely on?',
      a: 'Nyaya AI utilizes a dynamic database updated hourly containing Supreme Court rulings, high court decisions, federal codes, state regulations, and compliance guidelines across major jurisdictions worldwide.'
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <div className="section-header center-text">
          <span className="section-tag font-purple">FAQ</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Everything you need to know about the Nyaya Legal AI platform, data safety, and pricing structures.</p>
        </div>
        
        <div className="faq-accordion-wrapper">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-item glass-card ${isOpen ? 'active' : ''}`}>
                <button className="faq-trigger" onClick={() => toggleFaq(idx)}>
                  <span>{faq.q}</span>
                  <i className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'} faq-icon`}></i>
                </button>
                <div className="faq-content">
                  <p>{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
