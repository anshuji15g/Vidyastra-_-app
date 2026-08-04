// Initialize Global Academic Knowledge Base if not present
window.VIDYASTRA_DATABASE = window.VIDYASTRA_DATABASE || {};

document.addEventListener("DOMContentLoaded", () => {
    const onboardingScreen = document.getElementById("onboarding-screen");
    const appContainer = document.getElementById("app-container");
    const usernameInput = document.getElementById("username-input");
    const startBtn = document.getElementById("start-btn");
    const userDisplayName = document.getElementById("user-display-name");
    const chatBox = document.getElementById("chat-box");
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-input");
    const typingIndicator = document.getElementById("typing-indicator");

    // Check LocalStorage for saved user name
    const savedName = localStorage.getItem("vidyastra_user_name");

    if (savedName) {
        launchApp(savedName);
    } else {
        startBtn.addEventListener("click", () => {
            const name = usernameInput.value.trim();
            if (name) {
                localStorage.setItem("vidyastra_user_name", name);
                launchApp(name);
            } else {
                alert("рдХреГрдкрдпрд╛ рдЕрдкрдирд╛ рд╢реБрдн рдирд╛рдо рджрд░реНрдЬ рдХрд░реЗрдВ!");
            }
        });
    }

    function launchApp(userName) {
        onboardingScreen.classList.add("hidden");
        appContainer.classList.remove("hidden");
        userDisplayName.textContent = `ЁЯСд ${userName}`;

        // Initial AI Welcome Greeting
        const welcomeText = `Hello **${userName}** ЁЯСЛ! рдореИрдВ **Study War 12th** рдХрд╛ рдЖрдкрдХрд╛ рдкрд░реНрд╕рдирд▓ AI рдЯреНрдпреВрдЯрд░ рд╣реВрдБред рдЖрдк 11th, 12th рд╕рд╛рдЗрдВрд╕, рдЖрд░реНрдЯреНрд╕, UPSC, UPP, рдЕрдЧреНрдирд┐рд╡реАрд░ рдпрд╛ рд╕реНрдЯрдбреА рд░реВрдЯреАрди рдХреЗ рдмрд╛рд░реЗ рдореЗрдВ рдХреЛрдИ рднреА рд╕рд╡рд╛рд▓ рдкреВрдЫ рд╕рдХрддреЗ рд╣реИрдВред`;
        appendMessage("bot", welcomeText);
    }

    // Chat Form Submit Handler
    chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const query = chatInput.value.trim();
        if (!query) return;

        appendMessage("user", query);
        chatInput.value = "";
        showTyping(true);

        setTimeout(() => {
            showTyping(false);
            const response = searchOfflineDatabase(query);
            appendMessage("bot", response);
        }, 800);
    });

    function appendMessage(sender, text) {
        const bubble = document.createElement("div");
        bubble.classList.add("chat-bubble", sender);

        const avatar = document.createElement("div");
        avatar.classList.add("avatar");
        avatar.innerHTML = sender === "user" ? "ЁЯзСтАНЁЯТ╗" : "ЁЯдЦ";

        const content = document.createElement("div");
        content.classList.add("message-content");

        if (sender === "bot") {
            // Mandatory Quote Guardrail Header
            const quoteHeader = `
                <div class="mandatory-quote-card">
                    <span>рдкрд╣рд▓реЗ рдкрдврд╝рд╛рдИ рдХрд░реЗ рдлрд┐рд░ рдорд╕реНрддреА рдХрд░реЗ</span>
                    <span class="motion-emoji">ЁЯСЛ</span>
                </div>
            `;
            content.innerHTML = quoteHeader + formatMarkdown(text);
        } else {
            content.textContent = text;
        }

        bubble.appendChild(avatar);
        bubble.appendChild(content);
        chatBox.appendChild(bubble);

        // Auto Scroll to Bottom
        chatBox.scrollTop = chatBox.scrollHeight;

        // Apply Syntax Highlighting for formulas/code blocks
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    }

    function showTyping(show) {
        if (show) {
            typingIndicator.classList.remove("hidden");
            chatBox.scrollTop = chatBox.scrollHeight;
        } else {
            typingIndicator.classList.add("hidden");
        }
    }

    // Offline Search Algorithm
    function searchOfflineDatabase(query) {
        const cleanQuery = query.toLowerCase().trim();
        const keys = Object.keys(window.VIDYASTRA_DATABASE);

        // Direct Keyword Match
        for (let key of keys) {
            if (cleanQuery.includes(key.toLowerCase())) {
                return window.VIDYASTRA_DATABASE[key];
            }
        }

        // Default Fallback Response
        return `рдХреНрд╖рдорд╛ рдХрд░реЗрдВ, рдореБрдЭреЗ рдЗрд╕ рд╡рд┐рд╖рдп рдХреА рд╕реАрдзреА рдЬрд╛рдирдХрд╛рд░реА рдирд╣реАрдВ рдорд┐рд▓реАред рдЖрдк рднреМрддрд┐рдХ рд╡рд┐рдЬреНрдЮрд╛рди, рд░рд╕рд╛рдпрди рд╡рд┐рдЬреНрдЮрд╛рди, рдЬреАрд╡ рд╡рд┐рдЬреНрдЮрд╛рди, рдЗрддрд┐рд╣рд╛рд╕, рд░рд╛рдЬрдиреАрддрд┐ рд╡рд┐рдЬреНрдЮрд╛рди рдпрд╛ рд╕реНрдЯрдбреА рд░реВрдЯреАрди рд╕реЗ рд╕рдВрдмрдВрдзрд┐рдд рдкреНрд░рд╢реНрди рдкреВрдЫреЗрдВред`;
    }

    function formatMarkdown(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
    }
});
