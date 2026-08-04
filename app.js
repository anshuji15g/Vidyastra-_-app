// Vidyastra / Study War 12th - Pure UTF-8 Core Logic Engine
document.addEventListener('DOMContentLoaded', () => {

    // 1. Elements Selection
    const onboardingScreen = document.getElementById('onboarding-screen');
    const appContainer = document.getElementById('app-container');
    const usernameInput = document.getElementById('username-input');
    const startBtn = document.getElementById('start-btn');
    const displayUsername = document.getElementById('display-username');
    const chatBox = document.getElementById('chat-box');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    // 2. User Onboarding State
    let currentUser = localStorage.getItem('vidyastra_username');

    if (currentUser) {
        showMainApp(currentUser);
    }

    if (startBtn) {
        startBtn.addEventListener('click', handleUserStart);
    }

    if (usernameInput) {
        usernameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleUserStart();
        });
    }

    function handleUserStart() {
        const name = usernameInput ? usernameInput.value.trim() : '';
        if (name) {
            localStorage.setItem('vidyastra_username', name);
            currentUser = name;
            showMainApp(name);
        } else {
            alert('कृपया अपना नाम दर्ज करें!');
        }
    }

    function showMainApp(userName) {
        if (onboardingScreen) onboardingScreen.classList.add('hidden');
        if (appContainer) appContainer.classList.remove('hidden');
        if (displayUsername) displayUsername.textContent = userName;
        
        initWelcomeMessage(userName);
    }

    // 3. Welcome Message Dispatcher
    function initWelcomeMessage(userName) {
        if (chatBox && chatBox.children.length === 0) {
            const welcomeMsg = `नमस्ते **${userName}**! मैं **Study War 12th** का AI ट्यूटर हूँ।\n\nआप कक्षा 11th, 12th, NCERT, बोर्ड परीक्षा या प्रतियोगी परीक्षाओं के किसी भी विषय (भौतिकी, रसायन, जीव विज्ञान, हिंदी, अंग्रेजी, इतिहास, भूगोल, नागरिक शास्त्र, समाजशास्त्र, अर्थशास्त्र) से संबंधित प्रश्न पूछ सकते हैं।`;
            appendBotMessage(welcomeMsg);
        }
    }

    // 4. Form Submit & Search Handling
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
            }, 200);
        });
    }

    // 5. Offline Knowledge Base Search Engine
        function searchKnowledgeBase(query) {
        const db = window.VIDYASTRA_DATABASE || {};
        const cleanQuery = query.toLowerCase().trim();
        
        // वाक्य में से 'का', 'के', 'नियम' जैसे शब्द हटाकर मुख्य शब्द निकालना
        const keywords = cleanQuery
            .replace(/(का|की|के|को|में|पर|से|नियम|प्रमेय|क्या है|बताओ|लिखिए)/g, '')
            .trim()
            .split(/\s+/);

        // 1. Direct Topic Match
        for (let topic in db) {
            const lowerTopic = topic.toLowerCase();
            if (lowerTopic.includes(cleanQuery) || cleanQuery.includes(lowerTopic)) {
                return db[topic];
            }
        }

        // 2. Keyword Match
        for (let topic in db) {
            const lowerTopic = topic.toLowerCase();
            const content = typeof db[topic] === 'string' ? db[topic].toLowerCase() : '';

            for (let kw of keywords) {
                if (kw.length > 1 && (lowerTopic.includes(kw) || content.includes(kw))) {
                    return `### 📌 संबंधित विषय: ${topic}\n\n${db[topic]}`;
                }
            }
        }

        // 3. Fallback Response
        return `क्षमा करें, मुझे **"${query}"** से संबंधित सटीक उत्तर नहीं मिला।\n\n💡 **सुझाव:**\n- केवल मुख्य शब्द लिखें (जैसे: *गॉस, राउल्ट, जैव विविधता, जनसांख्यिकी, माँग* आदि)।`;
        }
    

    // 6. Message Rendering Functions with Animated Avatars
    function appendUserMessage(msg) {
        if (!chatBox) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'message-wrapper user-wrapper';

        wrapper.innerHTML = `
            <div class="msg-avatar user-avatar-bg animated-user">👤</div>
            <div class="message-bubble user-message glass-panel">${escapeHTML(msg)}</div>
        `;

        chatBox.appendChild(wrapper);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function appendBotMessage(msg) {
        if (!chatBox) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'message-wrapper bot-wrapper';

        wrapper.innerHTML = `
            <div class="msg-avatar bot-avatar-bg animated-tutor">🤖</div>
            <div class="message-bubble bot-message glass-panel">${formatMarkdown(msg)}</div>
        `;

        chatBox.appendChild(wrapper);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Helper: HTML Escape for User Input Safety
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    // Helper: Simple Markdown Parser
    function formatMarkdown(text) {
        if (!text) return '';
        return text
            .replace(/### (.*)/g, '<h3>$1</h3>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }
});

