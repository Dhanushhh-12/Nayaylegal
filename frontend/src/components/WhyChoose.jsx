import React from 'react';

export default function WhyChoose() {
  const specs = [
    {
      label: 'Performance / Speed',
      val: 'Sub-second Execution',
      desc: 'Generate legally compliant contracts and analyze massive files in seconds instead of waiting days for counsel reviews.'
    },
    {
      label: 'Data Integrity & Security',
      val: 'AES-256 Bit Encryption',
      desc: 'Your documents are encrypted using AES-256 zero-knowledge architectures, ensuring client confidentiality remains private.'
    },
    {
      label: 'AI Parameters Configuration',
      val: 'Domain-tuned LLM parameters',
      desc: 'Engineered using highly tuned specialized legal parameters that outperform vanilla LLMs in legal exam benchmarks.'
    },
    {
      label: 'UX Design System',
      val: 'Drag-and-Drop workflows',
      desc: 'No training required. A simple conversational system built with intuitive workflows similar to modern design tools.'
    },
    {
      label: 'Audit Precision Rate',
      val: '99.4% Accuracy',
      desc: 'Nyaya AI undergoes rigorous evaluations by board attorneys, resulting in a industry-leading 99.4% audit accuracy rate.'
    },
    {
      label: 'Service Availability',
      val: '24/7/365 Continuous Uptime',
      desc: "Legal bottlenecks don't wait for business hours. Get advice and generate standard agreements in the middle of the night."
    }
  ];

  return (
    <section className="why-choose-section specs-section container">
      <div className="section-header center-text">
        <span className="section-tag font-gold">Product Specifications</span>
        <h2 className="section-title">Designed for Unmatched Accuracy</h2>
        <p className="section-subtitle">A deep breakdown of the core engine benchmarks and technical capability values that empower the Nyaya AI platform.</p>
      </div>
      
      <div className="specs-table-wrapper glass-card">
        <div className="specs-table">
          <div className="specs-header-row">
            <div className="spec-col spec-label-hdr">Technical Specification</div>
            <div className="spec-col spec-value-hdr">Benchmark Value</div>
            <div className="spec-col spec-desc-hdr">Function & Impact</div>
          </div>
          
          {specs.map((spec, idx) => (
            <div key={idx} className="specs-row">
              <div className="spec-col spec-label">{spec.label}</div>
              <div className="spec-col spec-value">
                <span className="spec-val-badge">{spec.val}</span>
              </div>
              <div className="spec-col spec-desc">{spec.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
