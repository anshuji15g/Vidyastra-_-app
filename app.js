// Vidyastra / Study War 12th - Core App Logic Engine (Pure UTF-8 Clean Edition)
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. DOM Elements Selection
    const onboardingScreen = document.getElementById('onboarding-screen');
    const appContainer = document.getElementById('app-container');
    const usernameInput = document.getElementById('username-input');
    const startBtn = document.getElementById('start-btn');
    const displayUsername = document.getElementById('display-username');
    const chatBox = document.getElementById('chat-box');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    // 2. LocalStorage Check (Onboarding Check)
    let currentUser = localStorage.getItem('vidyastra_username');

    if (currentUser) {
        showMainApp(currentUser);
    }

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            const name = usernameInput ? usernameInput.value.trim() : '';
            if (name) {
                localStorage.setItem('vidyastra_username', name);
                currentUser = name;
                showMainApp(name);
            } else {
                alert('कृपया अपना नाम दर्ज करें!');
            }
        });
    }

    function showMainApp(userName) {
        if (onboardingScreen) onboardingScreen.classList.add('hidden');
        if (appContainer) appContainer.classList.remove('hidden');
        if (displayUsername) displayUsername.textContent = userName;
        
        // Load Welcome Message safely
        initWelcomeMessage(userName);
    }

    // 3. Clean Hindi Welcome Message Engine
    function initWelcomeMessage(userName) {
        if (chatBox && chatBox.children.length === 0) {
            const welcomeText = `नमस्ते **${userName}**! मैं **Study War 12th** का AI ट्यूटर हूँ।\n\nआप कक्षा 11th, 12th, NCERT, बोर्ड परीक्षा, UPSC या प्रतियोगी परीक्षाओं के किसी भी विषय (भौतिकी, रसायन, जीव विज्ञान, हिंदी, अंग्रेजी, इतिहास, भूगोल, नागरिक शास्त्र, समाजशास्त्र, अर्थशास्त्र) से संबंधित प्रश्न पूछ सकते हैं।`;
            appendBotMessage(welcomeText);
        }
    }

    // 4. Search Form Handler
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (!query) return;

            appendUserMessage(query);
            searchInput.value = '';

            setTimeout(() => {
                const response = searchKnowledgeBase(query);
                appendBotMessage(response);
            }, 250);
        });
    }

    // 5. Smart Offline Search Algorithm
    function searchKnowledgeBase(query) {
        const db = window.VIDYASTRA_DATABASE || {};
        const lowerQuery = query.toLowerCase();

        // Direct Topic Exact Match
        for (let topic in db) {
            if (topic.toLowerCase().includes(lowerQuery) || lowerQuery.includes(topic.toLowerCase())) {
                return db[topic];
            }
        }

        // Keyword Match inside Content
        for (let topic in db) {
            const content = db[topic];
            if (typeof content === 'string' && content.toLowerCase().includes(lowerQuery)) {
                return `### 📌 संबंधित विषय: ${topic}\n\n${content}`;
            }
        }

        // Fallback Response
        return `क्षमा करें, मुझे **"${query}"** से संबंधित सटीक उत्तर नहीं मिला।\n\n💡 **सुझाव:**\n- विषय का नाम या मुख्य कीवर्ड सही से लिखें (जैसे: *गॉस प्रमेय, राउल्ट नियम, जैव विविधता, जनसांख्यिकी, माँग का नियम*)।`;
    }

    // 6. Message Rendering Functions
    function appendUserMessage(msg) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message user-message glass-panel';
        msgDiv.textContent = msg;
        if (chatBox) {
            chatBox.appendChild(msgDiv);
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }

    function appendBotMessage(msg) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message bot-message glass-panel';
        msgDiv.innerHTML = formatMarkdown(msg);
        if (chatBox) {
            chatBox.appendChild(msgDiv);
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }

    // 7. Markdown & Text Formatting
    function formatMarkdown(text) {
        if (!text) return '';
        return text
            .replace(/### (.*)/g, '<h3 style="color:#00f3ff; margin-top:10px;">$1</h3>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }
});
