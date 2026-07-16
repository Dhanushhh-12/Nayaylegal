import React, { useState, useEffect, useRef } from 'react';

// Preset QA Database for Offline Fallback
const qaPairs = {
  nda: "A Non-Disclosure Agreement (NDA) is a legally binding contract that establishes a confidential relationship. The party signing it agrees that sensitive information they obtain will not be made available to others. Key clauses include Definition of Confidentiality, Obligations, Term (duration), and Exclusions. Under corporate rules, signing an NDA protects trade secrets and IP during partner meetings.",
  indemnity: "In contracts, an 'indemnity' clause acts as a promise by one party to pay for the losses, damages, or legal costs incurred by the other party if certain specified events happen (e.g., breach of contract or IP infringement claims). IMPORTANT: Startups should always negotiate an Indemnification Cap (limit of liability) equivalent to fees paid to prevent severe uncapped exposure.",
  property: "Intellectual Property (IP) protection duration depends on the asset type:\n- Patents: Generally last 20 years from the filing date.\n- Trademarks: Can last indefinitely if renewed every 10 years.\n- Copyrights: Usually last for the life of the author plus 70 years.\n- Trade Secrets: Last indefinitely as long as the secrecy is maintained (e.g. via strict NDA policies).",
  privacy: "Yes, absolutely. Startups collecting any user details (emails, phone numbers, cookies, IP addresses) must publish a Privacy Policy. Global regulations like GDPR (Europe) and CCPA (California) impose hefty penalties for non-compliance. A transparent policy builds consumer trust and satisfies payment gateway requirements."
};

export default function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState('chat');

  // --- 1. CHAT STATE ---
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am Nyaya AI, your digital legal assistant. How can I help you today? Feel free to ask a legal question or click one of the templates below:',
      isOffline: false
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isTyping]);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text || isTyping) return;

    const newMessages = [...chatMessages, { sender: 'user', text }];
    setChatMessages(newMessages);
    setChatInput('');
    await triggerBotResponse(text, newMessages);
  };

  const handleSuggestionClick = async (text) => {
    if (isTyping) return;

    const newMessages = [...chatMessages, { sender: 'user', text }];
    setChatMessages(newMessages);
    await triggerBotResponse(text, newMessages);
  };

  const triggerBotResponse = async (text, history) => {
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: text, history })
      });

      let errMsg = 'Proxy API returned an error status.';
      if (!response.ok) {
        try {
          const errData = await response.json();
          errMsg = errData.error || (errData.details?.error?.message || JSON.stringify(errData.details)) || errMsg;
        } catch (e) {}
        throw new Error(errMsg);
      }

      const data = await response.json();
      setIsTyping(false);
      setChatMessages(prev => [...prev, { sender: 'bot', text: data.reply || "I couldn't formulate a response. Please try again." }]);
    } catch (error) {
      console.error("Chat API Proxy Error:", error);
      setIsTyping(false);
      setChatMessages(prev => [
        ...prev, 
        { 
          sender: 'bot', 
          text: `[System Error: Failed to generate response. Details: ${error.message}]`,
          isError: true 
        }
      ]);
    }
  };

  // --- 2. SCANNER STATE ---
  const [scanState, setScanState] = useState('idle'); // idle | scanning | completed
  const [scanDocType, setScanDocType] = useState('employment'); // employment | lease
  const [scanProgress, setScanProgress] = useState(0);
  const [scannerStatus, setScannerStatus] = useState('OCR Engine extracting text data...');

  const startScanProcess = (docType) => {
    setScanDocType(docType);
    setScanState('scanning');
    setScanProgress(0);
    setScannerStatus('OCR Engine extracting text data...');

    const steps = [
      { width: 25, status: "OCR Engine extracting text data..." },
      { width: 55, status: "Auditing liability exposure..." },
      { width: 85, status: "Verifying regional compliance rules..." },
      { width: 100, status: "Compiling risk audit report..." }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setScanProgress(steps[currentStep].width);
        setScannerStatus(steps[currentStep].status);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setScanState('completed');
        }, 400);
      }
    }, 600);
  };

  const resetScanner = () => {
    setScanState('idle');
    setScanProgress(0);
  };

  // --- 3. CONTRACT AUDIT STATE ---
  const [activeRiskId, setActiveRiskId] = useState(1);
  const auditListRef = useRef(null);

  const handleClauseClick = (riskId) => {
    setActiveRiskId(riskId);
    // Scroll the corresponding audit item into view
    const targetAudit = document.getElementById(`audit-risk-${riskId}`);
    if (targetAudit && auditListRef.current) {
      targetAudit.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <section id="features" className="interactive-demo-section">
      <div className="container">
        <div className="section-header center-text">
          <span className="section-tag font-teal">Experience Nyaya AI</span>
          <h2 className="section-title">Futuristic Interactive AI Features</h2>
          <p className="section-subtitle">Interact directly with our functional simulator tools to experience the intelligence and speed of Nyaya AI in real time.</p>
        </div>
        
        <div className="demo-wrapper glass-card">
          {/* Demo Menu Navigation */}
          <div className="demo-tabs">
            <button 
              className={`demo-tab ${activeTab === 'chat' ? 'active' : ''}`} 
              onClick={() => setActiveTab('chat')}
            >
              <i className="fa-solid fa-comments"></i> <span>Smart AI Chat</span>
            </button>
            <button 
              className={`demo-tab ${activeTab === 'scanner' ? 'active' : ''}`} 
              onClick={() => setActiveTab('scanner')}
            >
              <i className="fa-solid fa-wand-magic-sparkles"></i> <span>Document Scanner</span>
            </button>
            <button 
              className={`demo-tab ${activeTab === 'contract' ? 'active' : ''}`} 
              onClick={() => setActiveTab('contract')}
            >
              <i className="fa-solid fa-shield-halved"></i> <span>Contract Review</span>
            </button>
          </div>

          {/* Demo Content Container */}
          <div className="demo-content">
            
            {/* 1. SMART AI CHAT SIMULATOR */}
            {activeTab === 'chat' && (
              <div className="demo-pane active" id="pane-chat">
                <div className="chat-container">
                  <div className="chat-header">
                    <div className="chat-avatar">
                      <i className="fa-solid fa-scale-balanced text-gold"></i>
                      <span className="online-indicator"></span>
                    </div>
                    <div className="chat-info">
                      <h4>Nyaya Legal Assistant</h4>
                      <p>Powered by Nyaya-Legal-LLM</p>
                    </div>
                  </div>
                  <div className="chat-messages" id="chat-messages">
                    {chatMessages.map((msg, i) => (
                      <div key={i} className={`chat-msg ${msg.sender === 'user' ? 'user-msg' : 'bot-msg'}`}>
                        <p style={{ whiteSpace: 'pre-line' }}>{msg.text}</p>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="chat-msg bot-msg typing-msg">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  <div className="chat-suggestions">
                    <button className="chat-suggest-btn" disabled={isTyping} onClick={() => handleSuggestionClick('What is a non-disclosure agreement (NDA)?')}>
                      What is a non-disclosure agreement (NDA)?
                    </button>
                    <button className="chat-suggest-btn" disabled={isTyping} onClick={() => handleSuggestionClick('What does "indemnity" mean in a contract?')}>
                      What does "indemnity" mean in a contract?
                    </button>
                    <button className="chat-suggest-btn" disabled={isTyping} onClick={() => handleSuggestionClick('How long does intellectual property protection last?')}>
                      How long does intellectual property protection last?
                    </button>
                    <button className="chat-suggest-btn" disabled={isTyping} onClick={() => handleSuggestionClick('Do startups need a privacy policy?')}>
                      Do startups need a privacy policy?
                    </button>
                  </div>
                  <form className="chat-input-area" id="chat-form" onSubmit={handleChatSubmit}>
                    <input 
                      type="text" 
                      id="chat-input" 
                      placeholder="Ask Nyaya AI a legal question..." 
                      required 
                      autoComplete="off"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      disabled={isTyping}
                    />
                    <button type="submit" className="chat-send-btn" disabled={isTyping}>
                      <i className="fa-solid fa-paper-plane"></i>
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* 2. DOCUMENT SCANNER SIMULATOR */}
            {activeTab === 'scanner' && (
              <div className="demo-pane active" id="pane-scanner">
                <div className="scanner-container">
                  {scanState === 'idle' && (
                    <div className="scanner-upload-area" id="scanner-upload">
                      <div className="scanner-graphic">
                        <i className="fa-solid fa-file-pdf document-icon text-purple"></i>
                        <div className="laser-scanner"></div>
                      </div>
                      <h3>Legal Document Scanner</h3>
                      <p>Select a sample document below to simulate instant optical scanning and deep legal auditing:</p>
                      <div className="sample-doc-buttons">
                        <button 
                          className="btn btn-secondary select-sample-doc" 
                          onClick={() => startScanProcess('employment')}
                        >
                          <i className="fa-solid fa-file-contract"></i> Employment_Agreement.pdf
                        </button>
                        <button 
                          className="btn btn-secondary select-sample-doc" 
                          onClick={() => startScanProcess('lease')}
                        >
                          <i className="fa-solid fa-building"></i> Commercial_Lease.pdf
                        </button>
                      </div>
                    </div>
                  )}

                  {scanState === 'scanning' && (
                    <div className="scanner-progress-area" id="scanner-progress">
                      <div className="progress-bar-wrapper">
                        <div className="progress-bar-fill" style={{ width: `${scanProgress}%` }} id="progress-fill"></div>
                      </div>
                      <p id="scanner-status">{scannerStatus}</p>
                    </div>
                  )}

                  {scanState === 'completed' && (
                    <div className="scanner-results" id="scanner-results">
                      <div className="results-header">
                        <i className="fa-solid fa-circle-check text-teal"></i>
                        <div>
                          <h4>Scan Completed successfully</h4>
                          <p>Processed 12 pages in 1.8 seconds</p>
                        </div>
                      </div>
                      <div className="results-grid">
                        <div className="result-metric card-light">
                          <span className="metric-val text-red">High Risk</span>
                          <span className="metric-label" id="scanner-high-risks">
                            {scanDocType === 'employment' ? '1 Clause' : '2 Clauses'}
                          </span>
                        </div>
                        <div className="result-metric card-light">
                          <span className="metric-val text-gold">Medium Risk</span>
                          <span className="metric-label" id="scanner-med-risks">
                            {scanDocType === 'employment' ? '3 Clauses' : '5 Clauses'}
                          </span>
                        </div>
                        <div className="result-metric card-light">
                          <span className="metric-val text-teal">Compliance Score</span>
                          <span className="metric-label">87%</span>
                        </div>
                      </div>
                      <div className="results-actions">
                        <button className="btn btn-primary" id="reset-scanner" onClick={resetScanner}>
                          Scan Another Document
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3. AI CONTRACT REVIEW SIMULATOR */}
            {activeTab === 'contract' && (
              <div className="demo-pane active" id="pane-contract">
                <div className="contract-container">
                  <div className="contract-split">
                    <div className="contract-doc-view">
                      <div className="doc-header">
                        <i className="fa-solid fa-file-signature text-blue"></i>
                        <span>NDA_Agreement_Draft.docx</span>
                      </div>
                      <div className="doc-body font-mono">
                        <p>This Non-Disclosure Agreement (the "Agreement") is entered into by and between Nyaya Tech Corp and Acme LLC...</p>
                        <p 
                          className={`highlighted-clause h-red ${activeRiskId === 1 ? 'active' : ''}`} 
                          onClick={() => handleClauseClick(1)}
                        >
                          <strong>Section 4. Indemnification:</strong> The Receiving Party agrees to indemnify, defend, and hold harmless the Disclosing Party from any and all damages, liabilities, losses, costs, and attorney's fees arising directly or indirectly from any unauthorized breach of this Agreement without cap.
                        </p>
                        <p><strong>Section 5. Term:</strong> The obligations of confidentiality shall remain in effect for a period of five (5) years from the date of disclosure...</p>
                        <p 
                          className={`highlighted-clause h-gold ${activeRiskId === 2 ? 'active' : ''}`} 
                          onClick={() => handleClauseClick(2)}
                        >
                          <strong>Section 8. Governing Law:</strong> This Agreement shall be governed by, and construed in accordance with, the laws of the State of Delaware, and any disputes shall be resolved exclusively in the courts of Wilmington, Delaware.
                        </p>
                        <p><strong>Section 9. Severability:</strong> If any provision of this Agreement is held to be invalid or unenforceable...</p>
                      </div>
                    </div>
                    <div className="contract-audit-panel">
                      <h4>Risk Audit Analysis</h4>
                      <div className="audit-list" ref={auditListRef}>
                        <div 
                          className={`audit-item risk-high ${activeRiskId === 1 ? 'active' : ''}`} 
                          id="audit-risk-1"
                          onClick={() => setActiveRiskId(1)}
                        >
                          <div className="audit-risk-header">
                            <span className="risk-pill bg-red">CRITICAL RISK</span>
                            <span>Indemnification Cap</span>
                          </div>
                          <p>Section 4 forces the receiving party to indemnify all losses "without cap". Uncapped indemnities pose a severe financial risk for startups.</p>
                          <div className="audit-suggestion">
                            <strong>Recommendation:</strong> Propose a maximum liability cap equal to fees paid under this agreement.
                          </div>
                        </div>
                        <div 
                          className={`audit-item risk-med ${activeRiskId === 2 ? 'active' : ''}`} 
                          id="audit-risk-2"
                          onClick={() => setActiveRiskId(2)}
                        >
                          <div className="audit-risk-header">
                            <span className="risk-pill bg-gold">MODERATE WARNING</span>
                            <span>Jurisdiction</span>
                          </div>
                          <p>Section 8 specifies Delaware courts. Verify if your local corporation has representation or if arbitration in a closer region is preferred.</p>
                          <div className="audit-suggestion">
                            <strong>Recommendation:</strong> Propose local arbitration or state courts to minimize travel expenses and legal overhead.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Secondary Features Highlights */}
        <div className="secondary-features-grid">
          <div className="sec-feat-card glass-card">
            <i className="fa-solid fa-magnifying-glass text-gold"></i>
            <h4>Precision Case Search</h4>
            <p>Semantic legal search engine cross-references millions of national judicial precedents.</p>
          </div>
          <div className="sec-feat-card glass-card">
            <i className="fa-solid fa-microphone text-purple"></i>
            <h4>Voice Dictation Assistant</h4>
            <p>Explain your legal concerns verbally and have our AI record, transcribe, and research instantly.</p>
          </div>
          <div className="sec-feat-card glass-card">
            <i className="fa-solid fa-language text-teal"></i>
            <h4>Multi-Language Support</h4>
            <p>Seamless translation of legal terms across Hindi, English, Spanish, French, and 12 other dialects.</p>
          </div>
          <div className="sec-feat-card glass-card">
            <i className="fa-solid fa-cloud-shield text-blue"></i>
            <h4>Secure Cloud Storage</h4>
            <p>All scanned files are stored in decentralized, zero-knowledge encrypted cloud environments.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
