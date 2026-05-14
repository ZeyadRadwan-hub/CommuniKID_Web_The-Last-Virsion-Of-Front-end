document.addEventListener('DOMContentLoaded', function() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser === null || currentUser.role !== 'parent') {
        window.location.href = 'login.html';
        return;
    }

    const currentLang = localStorage.getItem('app_lang') || 'ar';
    const chatMessages = document.getElementById('chatMessages');
    const activeContactName = document.getElementById('activeContactName');
    const chatInputForm = document.getElementById('chatInputForm');
    const messageInput = document.getElementById('messageInput');

    let doctorEmail = null;

    if (currentUser.doctorCode !== undefined && currentUser.doctorCode !== "") {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key.includes('@')) {
                let user = JSON.parse(localStorage.getItem(key));
                if (user.role === 'therapist' && user.myDoctorCode === currentUser.doctorCode) {
                    doctorEmail = user.email;
                    activeContactName.textContent = currentLang === 'ar' ? `محادثة مع د. ${user.name}` : `Chat with Dr. ${user.name}`;
                }
            }
        }
    }

    if (doctorEmail === null) {
        activeContactName.textContent = currentLang === 'ar' ? "لا يوجد أخصائي مرتبط" : "No linked therapist";
        chatMessages.innerHTML = currentLang === 'ar' ? 
            '<div class="empty-chat">يرجى التأكد من إدخال كود الأخصائي الصحيح في إعدادات الحساب للبدء بالمحادثة.</div>' : 
            '<div class="empty-chat">Please ensure the correct therapist code is entered in account settings to start chatting.</div>';
        chatInputForm.style.display = 'none';
        return;
    }

    function loadMessages() {
        let historyString = localStorage.getItem('chat_history');
        let allMessages = {};
        if (historyString !== null) allMessages = JSON.parse(historyString);

        let chatKey = doctorEmail + "_" + currentUser.email;
        let messages = [];
        if (allMessages[chatKey] !== undefined) messages = allMessages[chatKey];

        chatMessages.innerHTML = '';
        if (messages.length === 0) {
            chatMessages.innerHTML = `<div class="empty-chat">${currentLang === 'ar' ? 'ابدأ المحادثة مع الأخصائي الآن.' : 'Start the conversation with the therapist now.'}</div>`;
        } else {
            messages.forEach(function(msg) {
                const msgDiv = document.createElement('div');
                let senderClass = msg.sender === 'sent' ? 'received' : 'sent'; 
                msgDiv.className = `message ${senderClass}`;
                msgDiv.textContent = msg.text;
                chatMessages.appendChild(msgDiv);
            });
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    chatInputForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const text = messageInput.value.trim();
        if (text === '') return;

        let historyString = localStorage.getItem('chat_history');
        let allMessages = {};
        if (historyString !== null) allMessages = JSON.parse(historyString);

        let chatKey = doctorEmail + "_" + currentUser.email;
        if (allMessages[chatKey] === undefined) allMessages[chatKey] = [];

        allMessages[chatKey].push({ sender: 'received', text: text, time: new Date().toLocaleTimeString() });
        localStorage.setItem('chat_history', JSON.stringify(allMessages));

        messageInput.value = '';
        loadMessages();
    });

    loadMessages();
});