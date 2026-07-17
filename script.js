/* ==========================================
   NYAYA AI - INTERACTION ENGINE (JS)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    let theme = localStorage.getItem('theme') || 'dark';
    
    const applyTheme = (t) => {
        document.documentElement.setAttribute('data-theme', t);
        localStorage.setItem('theme', t);
        if (themeToggleBtn) {
            const icon = themeToggleBtn.querySelector('i');
            if (icon) {
                if (t === 'dark') {
                    icon.className = 'fa-solid fa-sun';
                    themeToggleBtn.title = "Switch to Light Mode";
                } else {
                    icon.className = 'fa-solid fa-moon';
                    themeToggleBtn.title = "Switch to Dark Mode";
                }
            }
        }
    };
    
    // Apply initial theme
    applyTheme(theme);
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            theme = theme === 'dark' ? 'light' : 'dark';
            applyTheme(theme);
        });
    }

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Nav Link highlight on Scroll
        highlightNavLink();
    });

    // Mobile Navbar Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const icon = mobileToggle.querySelector('i');
        if (navLinks.classList.contains('open')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars-staggered';
        }
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            mobileToggle.querySelector('i').className = 'fa-solid fa-bars-staggered';
        });
    });

    function highlightNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }


    // 2. INTERSECTION OBSERVER FOR FADE-IN ON SCROLL
    const fadeElements = document.querySelectorAll('.animate-fade-in, .animate-fade-in-up');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => fadeObserver.observe(el));


    // 3. STATS COUNTING ANIMATION
    const statsSection = document.querySelector('.stats-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
                startCounters();
                countersStarted = true;
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    function startCounters() {
        statNumbers.forEach(num => {
            const target = parseFloat(num.getAttribute('data-target'));
            const isFloat = target % 1 !== 0;
            const duration = 2000; // ms
            const stepTime = 30; // ms
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    num.innerText = isFloat ? target.toFixed(1) + '%' : Math.round(target).toLocaleString() + '+';
                    clearInterval(timer);
                } else {
                    num.innerText = isFloat ? current.toFixed(1) + '%' : Math.round(current).toLocaleString();
                }
            }, stepTime);
        });
    }


    // 4. INTERACTIVE FEATURES DEMO - TAB SWITCHER
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoPanes = document.querySelectorAll('.demo-pane');

    demoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');

            demoTabs.forEach(t => t.classList.remove('active'));
            demoPanes.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(`pane-${targetTab}`).classList.add('active');
        });
    });


    // 5. CHAT SIMULATOR LOGIC
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const suggestBtns = document.querySelectorAll('.chat-suggest-btn');

    // Preset QA Database
    const qaPairs = {
        "nda": "A Non-Disclosure Agreement (NDA) is a legally binding contract that establishes a confidential relationship. The party signing it agrees that sensitive information they obtain will not be made available to others. Key clauses include Definition of Confidentiality, Obligations, Term (duration), and Exclusions. Under corporate rules, signing an NDA protects trade secrets and IP during partner meetings.",
        "indemnity": "In contracts, an 'indemnity' clause acts as a promise by one party to pay for the losses, damages, or legal costs incurred by the other party if certain specified events happen (e.g., breach of contract or IP infringement claims). IMPORTANT: Startups should always negotiate an Indemnification Cap (limit of liability) equivalent to fees paid to prevent severe uncapped exposure.",
        "property": "Intellectual Property (IP) protection duration depends on the asset type:\n- Patents: Generally last 20 years from the filing date.\n- Trademarks: Can last indefinitely if renewed every 10 years.\n- Copyrights: Usually last for the life of the author plus 70 years.\n- Trade Secrets: Last indefinitely as long as the secrecy is maintained (e.g. via strict NDA policies).",
        "privacy": "Yes, absolutely. Startups collecting any user details (emails, phone numbers, cookies, IP addresses) must publish a Privacy Policy. Global regulations like GDPR (Europe) and CCPA (California) impose hefty penalties for non-compliance. A transparent policy builds consumer trust and satisfies payment gateway requirements."
    };

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (!text) return;

        addUserMessage(text);
        chatInput.value = '';

        simulateBotResponse(text);
    });

    suggestBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.innerText;
            addUserMessage(text);
            simulateBotResponse(text);
        });
    });

    function addUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-msg user-msg';
        msgDiv.innerText = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function simulateBotResponse(text) {
        // Typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-msg bot-msg typing-msg';
        typingDiv.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: text })
            });

            if (!response.ok) {
                throw new Error("Proxy API endpoint returned an error status.");
            }

            const data = await response.json();
            const answer = data.reply || "I apologize, but I could not formulate a response. Please try again.";

            chatMessages.removeChild(typingDiv);
            const responseDiv = document.createElement('div');
            responseDiv.className = 'chat-msg bot-msg';
            responseDiv.innerText = answer;
            chatMessages.appendChild(responseDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;

        } catch (error) {
            console.error("Chatbot Fetch Error:", error);

            // Clean up typing indicator
            chatMessages.removeChild(typingDiv);

            // Graceful fallback to local preset QA database if backend server is not running
            const lowerText = text.toLowerCase();
            let answer = "Thank you for asking. Nyaya AI is currently checking regional legislative precedents for your query. To protect your rights, verify all contract clauses under local corporate guidelines.";

            if (lowerText.includes('nda') || lowerText.includes('disclosure')) {
                answer = qaPairs.nda;
            } else if (lowerText.includes('indemnity') || lowerText.includes('indemnification')) {
                answer = qaPairs.indemnity;
            } else if (lowerText.includes('property') || lowerText.includes('patent') || lowerText.includes('copyright')) {
                answer = qaPairs.property;
            } else if (lowerText.includes('privacy') || lowerText.includes('gdpr') || lowerText.includes('compliance')) {
                answer = qaPairs.privacy;
            }

            const responseDiv = document.createElement('div');
            responseDiv.className = 'chat-msg bot-msg';
            responseDiv.innerText = `[Offline Mode: Fallback Response]\n\n${answer}\n\nDisclaimer: This is general information, not formal legal advice.`;
            chatMessages.appendChild(responseDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }


    // 6. DOCUMENT SCANNER SIMULATOR
    const uploadArea = document.getElementById('scanner-upload');
    const progressArea = document.getElementById('scanner-progress');
    const resultsArea = document.getElementById('scanner-results');
    const progressFill = document.getElementById('progress-fill');
    const scannerStatus = document.getElementById('scanner-status');
    const resetScannerBtn = document.getElementById('reset-scanner');

    const sampleButtons = document.querySelectorAll('.select-sample-doc');

    sampleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const docType = btn.getAttribute('data-doc');
            startScanProcess(docType);
        });
    });

    resetScannerBtn.addEventListener('click', () => {
        resultsArea.classList.add('hidden');
        uploadArea.classList.remove('hidden');
    });

    function startScanProcess(type) {
        uploadArea.classList.add('hidden');
        progressArea.classList.remove('hidden');
        progressFill.style.width = '0%';

        const steps = [
            { width: 25, status: "OCR Engine extracting text data..." },
            { width: 55, status: "Auditing liability exposure..." },
            { width: 85, status: "Verifying regional compliance rules..." },
            { width: 100, status: "Compiling risk audit report..." }
        ];

        let currentStep = 0;

        const interval = setInterval(() => {
            if (currentStep < steps.length) {
                progressFill.style.width = steps[currentStep].width + '%';
                scannerStatus.innerText = steps[currentStep].status;
                currentStep++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    progressArea.classList.add('hidden');
                    displayScannerResults(type);
                }, 400);
            }
        }, 600);
    }

    function displayScannerResults(type) {
        const highMetric = document.getElementById('scanner-high-risks');
        const medMetric = document.getElementById('scanner-med-risks');

        if (type === 'employment') {
            highMetric.innerText = "1 Clause";
            medMetric.innerText = "3 Clauses";
        } else {
            highMetric.innerText = "2 Clauses";
            medMetric.innerText = "5 Clauses";
        }

        resultsArea.classList.remove('hidden');
    }


    // 7. AI CONTRACT REVIEW HIGHLIGHT CLINIC
    const clauses = document.querySelectorAll('.highlighted-clause');
    const auditItems = document.querySelectorAll('.audit-item');

    clauses.forEach(clause => {
        clause.addEventListener('click', () => {
            const riskId = clause.getAttribute('data-risk');

            // Remove active states
            clauses.forEach(c => c.classList.remove('active'));
            auditItems.forEach(i => i.classList.remove('active'));

            // Activate selected
            clause.classList.add('active');
            const targetAudit = document.getElementById(`audit-risk-${riskId}`);
            if (targetAudit) {
                targetAudit.classList.add('active');
                targetAudit.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });

    // Clicking audit items also highlights corresponding clause
    auditItems.forEach(item => {
        item.addEventListener('click', () => {
            const riskId = item.getAttribute('id').replace('audit-risk-', '');

            clauses.forEach(c => c.classList.remove('active'));
            auditItems.forEach(i => i.classList.remove('active'));

            item.classList.add('active');
            const targetClause = document.querySelector(`.highlighted-clause[data-risk="${riskId}"]`);
            if (targetClause) {
                targetClause.classList.add('active');
            }
        });
    });


    // 8. TESTIMONIAL CAROUSEL
    const carousel = document.getElementById('testimonial-carousel');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentIndex = 0;
    let autoSlideTimer;

    function showSlide(index) {
        if (!carousel) return;
        currentIndex = index;
        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;

        dots.forEach((dot, idx) => {
            if (idx === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetAutoSlide();
        });
    });

    function nextSlide() {
        if (!carousel) return;
        let next = currentIndex + 1;
        if (next >= dots.length) {
            next = 0;
        }
        showSlide(next);
    }

    function startAutoSlide() {
        autoSlideTimer = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideTimer);
        startAutoSlide();
    }

    if (carousel) {
        startAutoSlide();
    }


    // 9. FAQ ACCORDIONS
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');

        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Collapse all
            faqItems.forEach(i => i.classList.remove('active'));

            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });


    // 10. CONTACT FORM SUBMISSION
    const contactForm = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success');
    const submitBtn = document.getElementById('form-submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Set loading state
            submitBtn.disabled = true;
            submitBtn.querySelector('span').innerText = 'Submitting Request...';

            setTimeout(() => {
                contactForm.classList.add('hidden');
                successMsg.classList.remove('hidden');
            }, 1000);
        });
    }


    // 11. NEWSLETTER SUBSCRIPTION FORM
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterSuccess = document.getElementById('newsletter-success');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            input.disabled = true;
            newsletterForm.querySelector('button').disabled = true;

            setTimeout(() => {
                newsletterForm.classList.add('hidden');
                newsletterSuccess.classList.remove('hidden');
            }, 800);
        });
    }

});
