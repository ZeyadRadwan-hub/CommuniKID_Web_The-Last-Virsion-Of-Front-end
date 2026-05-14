document.addEventListener('DOMContentLoaded', function() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser === null || currentUser.role !== 'therapist') {
        window.location.href = 'login.html';
        return;
    }

    const currentLang = localStorage.getItem('app_lang') || 'ar';
    const contactsList = document.getElementById('contactsList');
    const chatMessages = document.getElementById('chatMessages');
    const activeContactName = document.getElementById('activeContactName');
    const chatInputForm = document.getElementById('chatInputForm');
    const messageInput = document.getElementById('messageInput');

    activeContactName.textContent = currentLang === 'ar' ? 'اختر محادثة للبدء' : 'Select a chat to start';
    chatMessages.innerHTML = `<div class="empty-chat">${currentLang === 'ar' ? 'قم باختيار ولي أمر من القائمة الجانبية لبدء المتابعة' : 'Select a parent from the sidebar to start tracking'}</div>`;

    let parents = [];
    let activeChatId = null;

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.includes('@')) {
            let user = JSON.parse(localStorage.getItem(key));
            if (user.role === 'parent' && user.doctorCode === currentUser.myDoctorCode) {
                parents.push(user);
            }
        }
    }

    contactsList.innerHTML = '';
    
    if (parents.length === 0) {
        contactsList.innerHTML = `<p style="padding:15px; color:#888; text-align:center;">${currentLang === 'ar' ? 'لا يوجد مرضى حالياً' : 'No patients currently'}</p>`;
    } else {
        parents.forEach(function(parent) {
            let avatar = parent.gender === 'female' ? "👩" : "👨";
            const div = document.createElement('div');
            div.className = 'contact-item';
            div.innerHTML = `<span>${avatar}</span> <strong>${parent.name}</strong>`;
            
            div.onclick = function(event) {
                activeChatId = parent.email;
                activeContactName.textContent = (currentLang === 'ar' ? `محادثة مع: ` : `Chat with: `) + parent.name;
                chatInputForm.style.display = 'flex';
                
                let allItems = document.querySelectorAll('.contact-item');
                for (let j = 0; j < allItems.length; j++) allItems[j].classList.remove('active');
                event.currentTarget.classList.add('active');

                loadMessages();
            };
            contactsList.appendChild(div);
        });
    }

    function loadMessages() {
        let historyString = localStorage.getItem('chat_history');
        let allMessages = {};
        if (historyString !== null) allMessages = JSON.parse(historyString);

        let chatKey = currentUser.email + "_" + activeChatId;
        let messages = [];
        if (allMessages[chatKey] !== undefined) messages = allMessages[chatKey];

        chatMessages.innerHTML = '';
        if (messages.length === 0) {
            chatMessages.innerHTML = `<div class="empty-chat">${currentLang === 'ar' ? 'لا توجد رسائل سابقة. ابدأ المحادثة الآن.' : 'No previous messages. Start the conversation now.'}</div>`;
        } else {
            messages.forEach(function(msg) {
                const msgDiv = document.createElement('div');
                msgDiv.className = `message ${msg.sender}`;
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

        let chatKey = currentUser.email + "_" + activeChatId;
        if (allMessages[chatKey] === undefined) allMessages[chatKey] = [];

        allMessages[chatKey].push({ sender: 'sent', text: text, time: new Date().toLocaleTimeString() });
        localStorage.setItem('chat_history', JSON.stringify(allMessages));

        messageInput.value = '';
        loadMessages();
    });
});