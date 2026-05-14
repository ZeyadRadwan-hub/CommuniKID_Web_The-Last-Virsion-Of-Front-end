// ==========================================
// إدارة صفحة المفضلة والتدريب بالمايك
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) { window.location.href = 'login.html'; return; }

    const favWordsList = document.getElementById('favWordsList');
    const favSentencesList = document.getElementById('favSentencesList');
    const currentLang = localStorage.getItem('app_lang') || 'ar';

    const emptySentencesTxt = currentLang === 'ar' ? 'لا توجد جمل مفضلة. قم بتكوين جملة واضغط على "حفظ الجملة" ❤️' : 'No favorite sentences. Build one and click "Save Sentence" ❤️';
    const emptyWordsTxt = currentLang === 'ar' ? 'لم تقم بإضافة كلمات للمفضلة 🤍' : 'No favorite words added yet 🤍';

    // 1. رسم الجمل المفضلة
    if (!user.favoriteSentences || user.favoriteSentences.length === 0) {
        favSentencesList.innerHTML = `<p style="text-align: center; color: var(--text-color); opacity: 0.7;">${emptySentencesTxt}</p>`;
    } else {
        favSentencesList.innerHTML = '';
        user.favoriteSentences.forEach((sentenceArr, index) => {
            const fullText = sentenceArr.map(w => currentLang === 'ar' ? w.ar : w.en).join(' ');
            const imagesHtml = sentenceArr.map(w => `<img src="${w.image}" style="width:30px; height:30px; border-radius:50%; object-fit:cover; margin-left:5px;">`).join('');

            const row = document.createElement('div');
            row.style.cssText = `background: var(--bg-color); border: 1px solid var(--border-color); border-radius: 15px; padding: 15px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;`;
            
            row.innerHTML = `
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="display:flex;">${imagesHtml}</div>
                    <span style="font-weight: bold; color: var(--text-color); font-size: 1.2rem;">${fullText}</span>
                </div>
                <div style="display:flex; gap:10px;">
                    <button class="action-btn" style="background:var(--primary-color); color:white; padding:8px 15px;" onclick="playText('${fullText}')">🔊</button>
                    <button class="action-btn" id="micBtn_s_${index}" style="background:#3498db; color:white; padding:8px 15px;" onclick="startMicTest('${fullText}', 'micBtn_s_${index}')">🎤</button>
                    <button class="action-btn" style="background:#e74c3c; color:white; padding:8px 15px;" onclick="deleteItem('sentence', ${index})">🗑️</button>
                </div>
            `;
            favSentencesList.appendChild(row);
        });
    }

    // 2. رسم الكلمات المفضلة بنفس شكل الجمل
    if (!user.favorites || user.favorites.length === 0) {
        favWordsList.innerHTML = `<p style="text-align: center; color: var(--text-color); opacity: 0.7;">${emptyWordsTxt}</p>`;
    } else {
        favWordsList.innerHTML = ''; 
        user.favorites.forEach((wordObj, index) => {
            const wordText = currentLang === 'ar' ? wordObj.ar : wordObj.en;
            
            const row = document.createElement('div');
            row.style.cssText = `background: var(--bg-color); border: 1px solid var(--border-color); border-radius: 15px; padding: 15px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;`;
            
            row.innerHTML = `
                <div style="display: flex; align-items: center; gap: 15px;">
                    <img src="${wordObj.image}" style="width:40px; height:40px; border-radius:10px; object-fit:cover;">
                    <span style="font-weight: bold; color: var(--text-color); font-size: 1.2rem;">${wordText}</span>
                </div>
                <div style="display:flex; gap:10px;">
                    <button class="action-btn" style="background:var(--primary-color); color:white; padding:8px 15px;" onclick="playText('${wordText}')">🔊</button>
                    <button class="action-btn" id="micBtn_w_${index}" style="background:#3498db; color:white; padding:8px 15px;" onclick="startMicTest('${wordText}', 'micBtn_w_${index}')">🎤</button>
                    <button class="action-btn" style="background:#e74c3c; color:white; padding:8px 15px;" onclick="deleteItem('word', ${index})">🗑️</button>
                </div>
            `;
            favWordsList.appendChild(row);
        });
    }
});

window.playText = function(text) {
    const currentLang = localStorage.getItem('app_lang') || 'ar';
    if(window.playTTS) {
        window.playTTS(text, currentLang);
    } else {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = currentLang === 'ar' ? 'ar-SA' : 'en-US';
        window.speechSynthesis.speak(utterance);
    }
};

window.deleteItem = function(type, index) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (type === 'sentence') user.favoriteSentences.splice(index, 1);
    else if (type === 'word') user.favorites.splice(index, 1);
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem(user.email, JSON.stringify(user));
    window.location.reload();
};

function calculateAccuracy(s1, s2) {
    let longer = s1.length >= s2.length ? s1 : s2;
    let shorter = s1.length < s2.length ? s1 : s2;
    if (longer.length === 0) return 100;
    let costs = new Array();
    for (let i = 0; i <= longer.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= shorter.length; j++) {
            if (i == 0) costs[j] = j;
            else {
                if (j > 0) {
                    let newValue = costs[j - 1];
                    if (longer.charAt(i - 1) != shorter.charAt(j - 1)) newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0) costs[shorter.length] = lastValue;
    }
    return Math.round(((longer.length - costs[shorter.length]) / parseFloat(longer.length)) * 100);
}

window.startMicTest = function(targetText, btnId) {
    const currentLang = localStorage.getItem('app_lang') || 'ar';
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert(currentLang === 'ar' ? "متصفحك مش بيدعم المايك، جرب جوجل كروم!" : "Mic not supported, try Chrome!");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = currentLang === 'ar' ? 'ar-EG' : 'en-US'; 
    recognition.interimResults = true; 

    const btn = document.getElementById(btnId);
    const originalHtml = btn.innerHTML;
    btn.innerHTML = "🎙️";
    btn.style.backgroundColor = "#e74c3c"; 

    const liveBox = document.getElementById('favLiveCaptionBox');
    liveBox.style.display = 'block';
    liveBox.style.borderColor = 'var(--border-color)';
    liveBox.innerHTML = currentLang === 'ar' ? '<span style="color:#888;">أنا أسمعك...</span>' : '<span style="color:#888;">Listening...</span>';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    recognition.start();

    recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
            else interimTranscript += event.results[i][0].transcript;
        }
        liveBox.innerHTML = finalTranscript + '<span style="color:#888;">' + interimTranscript + '</span>';

        if (finalTranscript !== '') {
            const cleanText = (text) => text.toLowerCase().replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/[^\w\s\u0600-\u06FF]/g, '').trim();
            const spokenClean = cleanText(finalTranscript);
            const targetClean = cleanText(targetText);
            const accuracy = calculateAccuracy(spokenClean, targetClean);

            if (accuracy >= 70 || spokenClean.includes(targetClean)) {
                liveBox.style.borderColor = '#4CAF50'; 
                liveBox.innerHTML = currentLang === 'ar' ? 
                    `✅ ${finalTranscript} <br><span style="color:#4CAF50; font-size:1rem; display:block; margin-top:5px;">(دقة النطق: ${accuracy}% - ممتاز! +10 نقط)</span>` :
                    `✅ ${finalTranscript} <br><span style="color:#4CAF50; font-size:1rem; display:block; margin-top:5px;">(Accuracy: ${accuracy}% - Excellent! +10 pts)</span>`;
                
                let currentUser = JSON.parse(localStorage.getItem('currentUser'));
                currentUser.points = (currentUser.points || 0) + 10;
                currentUser.wordsSpoken = (currentUser.wordsSpoken || 0) + targetText.split(' ').length;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                localStorage.setItem(currentUser.email, JSON.stringify(currentUser)); 
            } else {
                liveBox.style.borderColor = '#e74c3c'; 
                liveBox.innerHTML = currentLang === 'ar' ?
                    `❌ ${finalTranscript} <br><span style="color:#e74c3c; font-size:1rem; display:block; margin-top:5px;">(دقة النطق: ${accuracy}% - المطلوب: ${targetText}) حاول تاني!</span>` :
                    `❌ ${finalTranscript} <br><span style="color:#e74c3c; font-size:1rem; display:block; margin-top:5px;">(Accuracy: ${accuracy}% - Target: ${targetText}) Try again!</span>`;
            }
        }
    };

    recognition.onend = () => {
        btn.innerHTML = originalHtml;
        btn.style.backgroundColor = "#3498db"; 
    };
};