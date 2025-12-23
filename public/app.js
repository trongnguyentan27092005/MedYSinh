// Get DOM elements
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const quickButtons = document.querySelectorAll('.quick-btn');

// API base URL (adjust if deploying to different host)
const API_BASE_URL = window.location.origin;

// Add user message to chat
function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${escapeHtml(message)}</p>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Add bot message to chat
function addBotMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    
    // Convert line breaks to HTML and preserve formatting
    const formattedMessage = formatBotMessage(message);
    
    messageDiv.innerHTML = `
        <div class="message-content">
            ${formattedMessage}
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-message';
    typingDiv.innerHTML = `
        <div class="message-content">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingMessage = document.querySelector('.typing-message');
    if (typingMessage) {
        typingMessage.remove();
    }
}

// Format bot message with HTML
function formatBotMessage(message) {
    // Escape HTML first
    let formatted = escapeHtml(message);
    
    // Convert line breaks to <br>
    formatted = formatted.replace(/\n/g, '<br>');
    
    // Convert bullet points (- ) to list items
    if (formatted.includes('- ')) {
        const lines = formatted.split('<br>');
        let inList = false;
        let result = [];
        
        for (let line of lines) {
            if (line.trim().startsWith('- ')) {
                if (!inList) {
                    result.push('<ul>');
                    inList = true;
                }
                result.push('<li>' + line.trim().substring(2) + '</li>');
            } else {
                if (inList) {
                    result.push('</ul>');
                    inList = false;
                }
                if (line.trim()) {
                    result.push('<p>' + line + '</p>');
                }
            }
        }
        
        if (inList) {
            result.push('</ul>');
        }
        
        formatted = result.join('');
    } else {
        // Wrap in paragraphs
        const paragraphs = formatted.split('<br><br>');
        formatted = paragraphs.map(p => p.trim() ? '<p>' + p.replace(/<br>/g, '<br>') + '</p>' : '').join('');
    }
    
    return formatted;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Scroll to bottom of chat
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send message to chatbot API
async function sendMessage(message) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.botResponse;
    } catch (error) {
        console.error('Error sending message:', error);
        return "I apologize, but I'm having trouble connecting to the server. Please check your connection and try again.";
    }
}

// Handle form submission
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const message = messageInput.value.trim();
    if (!message) return;
    
    // Disable input while processing
    messageInput.disabled = true;
    sendButton.disabled = true;
    
    // Add user message
    addUserMessage(message);
    messageInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Get bot response
    const botResponse = await sendMessage(message);
    
    // Remove typing indicator and show bot response
    removeTypingIndicator();
    addBotMessage(botResponse);
    
    // Re-enable input
    messageInput.disabled = false;
    sendButton.disabled = false;
    messageInput.focus();
});

// Handle quick question buttons
quickButtons.forEach(button => {
    button.addEventListener('click', () => {
        const message = button.getAttribute('data-message');
        messageInput.value = message;
        chatForm.dispatchEvent(new Event('submit'));
    });
});

// Focus input on load
messageInput.focus();

// Check server health on load
async function checkServerHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        const data = await response.json();
        console.log('Server status:', data.message);
    } catch (error) {
        console.warn('Could not connect to server:', error);
    }
}

checkServerHealth();
