// Vidyastra / Study War 12th - Core Logic Engine
document.addEventListener('DOMContentLoaded', () => {
    // User Onboarding State
    let currentUser = localStorage.getItem('vidyastra_username');
    const onboardingScreen = document.getElementById('onboarding-screen');
    const appContainer = document.getElementById('app-container');
    const usernameInput = document.getElementById('username-input');
    const startBtn = document.getElementById('start-btn');
    const displayUsername = document.getElementById('display-username');

    if (currentUser) {
        onboardingScreen.classList.add('hidden');
        appContainer.classList.remove('hidden');
        displayUsername.textContent = currentUser;
        initWelcomeMessage(currentUser);
    }

    startBtn.addEventListener('click', () => {
        const name = usernameInput.value.trim();
        if (name) {
            localStorage.setItem('vidyastra_username', name);
            currentUser = name;
            onboardingScreen.classList.add('hidden');
            appContainer.classList.remove('hidden');
            displayUsername.textContent = name;
            initWelcomeMessage(name);
        } else {
            alert('कृपया अपना नाम दर्ज करें!');
        }
    });

    // Chat System Logic
    const chatBox = document.getElementById('chat-box');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    function initWelcomeMessage(userName) {
        if (chatBox.children.length === 0) {
            appendBotMessage(`नमस्ते **${userName}**! मैं **Study War 12th** का AI ट्यूटर हूँ। 

आप कक्षा 11th, 12th, NCERT, बोर्ड परीक्षा, UPSC या प्रतियोगी परीक्षाओं के किसी भी विषय (भौतिकी, रसायन, जीव विज्ञान, हिंदी, अंग्रेजी, इतिहास, भूगोल, नागरिक शास्त्र, समाजशास्त्र, अर्थशास्त्र) से संबंधित प्रश्न पूछ सकते हैं।`);
        }
    }

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (!query) return;

        appendUserMessage(query);
        searchInput.value = '';

        setTimeout(() => {
            const response = searchKnowledgeBase(query);
            appendBotMessage(response);
        }, 300);
    });

    function searchKnowledgeBase(query) {
        const db = window.VIDYASTRA_DATABASE || {};
        const lowerQuery = query.toLowerCase();

        // 1. Direct Topic Match
        for (let topic in db) {
            if (topic.toLowerCase().includes(lowerQuery) || lowerQuery.includes(topic.toLowerCase())) {
                return db[topic];
            }
        }

        // 2. Keyword Content Search
        for (let topic in db) {
            const content = db[topic];
            if (content.toLowerCase().includes(lowerQuery)) {
                return `### 📌 संबंधित विषय: ${topic}\n\n${content}`;
            }
        }

        return `क्षमा करें, मुझे **"${query}"** से संबंधित सटीक उत्तर नहीं मिला। 

💡 **सुझाव:** 
- विषय का नाम या मुख्य कीवर्ड सही से लिखें (जैसे: *गॉस प्रमेय, राउल्ट नियम, जैव विविधता, जनसांख्यिकी, माँग का नियम*)।`;
    }

    function appendUserMessage(msg) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message user-message glass-panel';
        msgDiv.textContent = msg;
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function appendBotMessage(msg) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message bot-message glass-panel';
        msgDiv.innerHTML = formatMarkdown(msg);
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function formatMarkdown(text) {
        return text
            .replace(/### (.*)/g, '<h3>$1</h3>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }
});
