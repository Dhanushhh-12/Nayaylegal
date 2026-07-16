const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Model configuration: gemini-3.5-flash (current GA model).
// Note: gemini-2.5-flash is scheduled to shut down Oct 16, 2026.
const GEMINI_MODEL = 'gemini-3.5-flash';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static frontend assets
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Startup API Key Validation
const apiKeyStartupCheck = process.env.GEMINI_API_KEY;
if (!apiKeyStartupCheck || apiKeyStartupCheck === 'your_gemini_api_key_here') {
    console.warn(`\x1b[33m[WARNING] GEMINI_API_KEY is missing or set to placeholder in .env!\x1b[0m`);
    console.warn(`\x1b[33mTo run in live AI mode, please configure GEMINI_API_KEY in c:/FitTrack/.env with a key from https://aistudio.google.com/apikey\x1b[0m`);
    console.log(`[INFO] Server will start in Local Simulator mode.`);
} else {
    console.log(`[INFO] GEMINI_API_KEY is detected. Live AI assistant mode enabled using model: ${GEMINI_MODEL}`);
}

// Local Simulation QA Database
const qaPairs = {
  nda: "A Non-Disclosure Agreement (NDA) is a legally binding contract that establishes a confidential relationship. The party signing it agrees that sensitive information they obtain will not be made available to others. Key clauses include Definition of Confidentiality, Obligations, Term (duration), and Exclusions. Under corporate rules, signing an NDA protects trade secrets and IP during partner meetings.",
  indemnity: "In contracts, an 'indemnity' clause acts as a promise by one party to pay for the losses, damages, or legal costs incurred by the other party if certain specified events happen (e.g., breach of contract or IP infringement claims). IMPORTANT: Startups should always negotiate an Indemnification Cap (limit of liability) equivalent to fees paid to prevent severe uncapped exposure.",
  property: "Intellectual Property (IP) protection duration depends on the asset type:\n- Patents: Generally last 20 years from the filing date.\n- Trademarks: Can last indefinitely if renewed every 10 years.\n- Copyrights: Usually last for the life of the author plus 70 years.\n- Trade Secrets: Last indefinitely as long as the secrecy is maintained (e.g. via strict NDA policies).",
  privacy: "Yes, absolutely. Startups collecting any user details (emails, phone numbers, cookies, IP addresses) must publish a Privacy Policy. Global regulations like GDPR (Europe) and CCPA (California) impose hefty penalties for non-compliance. A transparent policy builds consumer trust and satisfies payment gateway requirements."
};

// API Route for live AI chatbot proxy
app.post('/api/chat', async (req, res) => {
    const { message, history } = req.body;
    
    if (!message) {
        return res.status(400).json({ error: "Message is required." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    // Fallback if API key is not defined in .env
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
        console.warn("WARN: GEMINI_API_KEY is not set. Using local database simulation.");
        const lowerText = message.toLowerCase();
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

        return res.json({ 
            reply: `[System Notice: Live API key is missing. Running in simulator mode.]\n\n${answer}\n\nDisclaimer: This is general information, not formal legal advice.` 
        });
    }

    try {
        const systemPrompt = `You are Nyaya Legal Assistant, a legal information assistant for startups and businesses in India.

Rules:
1. Answer only with legally accurate, well-established information. Do not guess or invent legal facts, section numbers, or case names.
2. If a question involves jurisdiction-specific law (e.g. India vs. US vs. EU), specify which jurisdiction your answer applies to.
3. If you are not certain about a specific legal provision, clearly say "This may vary — please verify with a licensed lawyer" instead of stating it as fact.
4. Keep answers concise, structured, and practical — written for founders/startups, not lawyers.
5. Never present this as formal legal advice. End relevant answers with a brief disclaimer that this is general information, not legal advice.
6. If the same question is asked again, give a consistent, stable answer — do not vary core facts between responses.`;

        // Format history & message for Gemini API (alternating user/model messages)
        const contents = [];
        if (history && Array.isArray(history)) {
            history.forEach(msg => {
                if (msg.text && (msg.sender === 'user' || msg.sender === 'bot')) {
                    const cleanText = msg.text
                        .replace(/^\[Offline Mode: Fallback Response\]\s*/i, '')
                        .replace(/^\[System Notice: [\s\S]*?\]\s*/i, '');
                    contents.push({
                        role: msg.sender === 'user' ? 'user' : 'model',
                        parts: [
                            { text: cleanText }
                        ]
                    });
                }
            });
        }
        
        // Strip any leading bot/model messages to ensure the first item has role "user"
        while (contents.length > 0 && contents[0].role === 'model') {
            contents.shift();
        }

        // Append current query if it isn't already the last item in contents
        if (contents.length === 0 || contents[contents.length - 1].parts[0].text !== message) {
            contents.push({
                role: 'user',
                parts: [
                    { text: message }
                ]
            });
        }

        const requestBody = {
            contents,
            systemInstruction: {
                parts: [
                    { text: systemPrompt }
                ]
            }
        };

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
        
        const response = await fetch(geminiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorStatus = response.status;
            let errorBody;
            try {
                errorBody = await response.json();
            } catch (e) {
                try {
                    errorBody = await response.text();
                } catch (textErr) {
                    errorBody = "Unavailable";
                }
            }
            console.error(`\x1b[31m[Google Gemini API Error] Status: ${errorStatus}\x1b[0m`, JSON.stringify(errorBody, null, 2));
            return res.status(errorStatus).json({
                error: "Google Gemini API call failed.",
                details: errorBody
            });
        }

        const data = await response.json();
        const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, I am unable to formulate a response at this moment.";
        
        res.json({ reply: replyText.trim() });

    } catch (error) {
        console.error("Gemini API Proxy Error:", error);
        res.status(500).json({ 
            error: "Failed to fetch response from live AI engine.",
            details: error.message 
        });
    }
});

// Fallback to index.html for single-page routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`========================================`);
    console.log(`Nyaya AI secure proxy server running!`);
    console.log(`Local URL: http://localhost:${PORT}`);
    console.log(`========================================`);
});
