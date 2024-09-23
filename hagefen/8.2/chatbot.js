// Function to toggle the visibility of the chatbot
function toggleChatbot() {
    const chatbot = document.getElementById('chatbot-container');
    const widget = document.getElementById('chatbot-widget');

    if (chatbot.style.display === 'none') {
        chatbot.style.display = 'block';
        widget.style.display = 'none'; // Hide the widget when chatbot is open
    } else {
        chatbot.style.display = 'none';
        widget.style.display = 'flex'; // Show the widget when chatbot is closed
    }
}

// Function to send the message to Google Apps Script and display the response
function sendMessage() {
    const input = document.getElementById('chatbot-input').value;
    if (input === '') return;

    const messagesDiv = document.getElementById('chatbot-messages');

    // Display user message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.textContent = 'אתה: ' + input;
    messagesDiv.appendChild(userMessageDiv);

    // Send the message to Google Apps Script
    fetch("https://script.google.com/macros/s/AKfycbx5cqHFizIltoYy8xnCtzh9X5pbGCZx2OMeb68MhSW9P4DzU-jbuE9XjtPapip0NIOp/exec", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'message=' + encodeURIComponent(input)
    })
    .then(response => response.json())
    .then(data => {
        const botResponseDiv = document.createElement('div');
        botResponseDiv.textContent = 'בוט: ' + data.response;
        messagesDiv.appendChild(botResponseDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });

    document.getElementById('chatbot-input').value = '';
}

// Insert chatbot HTML structure dynamically
function addChatbot() {
    const chatbotHtml = `
        <div id="chatbot-widget" onclick="toggleChatbot()">💬</div>
        <div id="chatbot-container" style="display: none; position: fixed; bottom: 100px; right: 20px; width: 300px; border: 1px solid #ddd; padding: 10px; background-color: #f9f9f9; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border-radius: 10px;">
            <h2>עוזר אישי</h2>
            <div id="chatbot-messages" style="max-height: 200px; overflow-y: auto; margin-bottom: 10px; font-size: 14px;"></div>
            <input type="text" id="chatbot-input" placeholder="שאל אותי שאלה..." style="width: calc(100% - 50px); padding: 5px;">
            <button onclick="sendMessage()" style="padding: 5px; font-size: 14px;">שלח</button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatbotHtml);
}

// Call this function to load the chatbot when the page loads
window.onload = function() {
    addChatbot();
};