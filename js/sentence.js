// ==========================================
// نظام تكوين الجمل (Sentence Builder) وتقييم النطق وحفظ الجمل المخصصة
// ==========================================

const sentenceBox = document.getElementById('sentenceBox');
const playSentenceBtn = document.getElementById('playSentenceBtn');
const clearSentenceBtn = document.getElementById('clearSentenceBtn');
const micSentenceBtn = document.getElementById('micSentenceBtn');
const favSentenceBtn = document.getElementById('favSentenceBtn'); 

let currentSentence = JSON.parse(sessionStorage.getItem('communikid_sentence')) || [];

// دالة رسم الجملة وبرمجة مسح الكلمة المفردة
window.renderSentence = function() {
    if (!sentenceBox) return;

    const currentLang = localStorage.getItem('app_lang') || 'ar';
    sentenceBox.innerHTML = ''; 

    // جلب الترجمة من global.js إن وجدت لتحديث الأزرار
    const t = window.translations ? window.translations[currentLang] : null;

    if (playSentenceBtn) playSentenceBtn.innerHTML = t && t.play_btn ? t.play_btn : (currentLang === 'ar' ? '🔊 انطق الجملة' : '🔊 Play Sentence');
    if (micSentenceBtn) micSentenceBtn.innerHTML = t && t.mic_btn ? t.mic_btn : (currentLang === 'ar' ? '🎤 جرب بصوتك' : '🎤 Use Mic');
    if (favSentenceBtn) favSentenceBtn.innerHTML = currentLang === 'ar' ? '❤️ حفظ الجملة' : '❤️ Save Sentence';
    if (clearSentenceBtn) clearSentenceBtn.innerHTML = t && t.clear_btn ? t.clear_btn : (currentLang === 'ar' ? '🗑️ مسح' : '🗑️ Clear');

    if (currentSentence.length === 0) {
        const placeholder = document.createElement('p');
        placeholder.className = 'placeholder-text';
        placeholder.id = 'sentencePlaceholder';
        placeholder.textContent = t && t.sentence_placeholder ? t.sentence_placeholder : (currentLang === 'ar' ? 'اضغط على الكروت لتكوين جملة...' : 'Click cards to build a sentence...');
        sentenceBox.appendChild(placeholder);
        return;
    }

    currentSentence.forEach((wordObj, index) => {
        const wordEl = document.createElement('div');
        wordEl.style.display = 'flex';
        wordEl.style.alignItems = 'center';
        wordEl.style.gap = '8px';
        wordEl.style.background = 'var(--card-bg)';
        wordEl.style.padding = '5px 15px';
        wordEl.style.borderRadius = '12px';
        wordEl.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        wordEl.style.border = '1px solid var(--border-color)';
        wordEl.style.cursor = 'pointer'; 
        wordEl.title = currentLang === 'ar' ? 'اضغط للحذف' : 'Click to remove';

        const text = currentLang === 'ar' ? wordObj.ar : wordObj.en;
        
        wordEl.innerHTML = `
            <div style="width: 35px; height: 35px; border-radius: 8px; background-image: url('${wordObj.image}'); background-size: cover; background-position: center;"></div>
            <span style="font-weight: bold; color: var(--text-color); font-size: 1.1rem;">${text} <span style="color:#e74c3c; margin-left:5px; font-size:0.9rem;">✖</span></span>
        `;
        
        // مسح الكلمة لما تدوس عليها
        wordEl.addEventListener('click', () => {
            currentSentence.splice(index, 1);
            sessionStorage.setItem('communikid_sentence', JSON.stringify(currentSentence));
            renderSentence();
        });

        sentenceBox.appendChild(wordEl);
    });
};

window.addToSentence = function(wordObj) {
    currentSentence.push(wordObj);
    sessionStorage.setItem('communikid_sentence', JSON.stringify(currentSentence));
    renderSentence();
};

// حفظ الجملة بالكامل في المفضلة
if (favSentenceBtn) {
    favSentenceBtn.addEventListener('click', () => {
        if (currentSentence.length === 0) return;
        
        let user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user) return;
        
        if (!user.favoriteSentences) user.favoriteSentences = [];
        
        // منع التكرار
        const sentenceString = JSON.stringify(currentSentence);
        const isExists = user.favoriteSentences.some(s => JSON.stringify(s) === sentenceString);
        
        if (isExists) {
            alert(localStorage.getItem('app_lang') === 'en' ? 'Sentence already saved! ❤️' : 'الجملة دي محفوظة عندك بالفعل! ❤️');
        } else {
            user.favoriteSentences.push([...currentSentence]); 
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem(user.email, JSON.stringify(user));
            alert(localStorage.getItem('app_lang') === 'en' ? 'Sentence saved to favorites! ✅' : 'تم حفظ الجملة في المفضلة بنجاح! ✅');
        }
    });
}

// ==========================================
// النطق السحابي المطور (Cloud TTS)
// ==========================================
if (playSentenceBtn) {
    playSentenceBtn.addEventListener('click', () => {
        if (currentSentence.length === 0) return;
        const currentLang = localStorage.getItem('app_lang') || 'ar';
        const fullText = currentSentence.map(word => currentLang === 'ar' ? word.ar : word.en).join(' ');

        // استخدام دالة النطق العالمية (Google API) الموجودة في global.js
        if (window.playTTS) {
            window.playTTS(fullText, currentLang);
        } else {
            // Fallback محلي احتياطي
            const utterance = new SpeechSynthesisUtterance(fullText);
            utterance.lang = currentLang === 'ar' ? 'ar-SA' : 'en-US';
            utterance.rate = 0.85; 
            window.speechSynthesis.speak(utterance);
        }
    });
}

// مسح الجملة كلها
if (clearSentenceBtn) {
    clearSentenceBtn.addEventListener('click', () => {
        currentSentence = [];
        sessionStorage.removeItem('communikid_sentence');
        renderSentence();
        
        const liveBox = document.getElementById('liveCaptionBox');
        if(liveBox) liveBox.style.display = 'none';
    });
}

// دالة دقة المايك
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
                    if (longer.charAt(i - 1) != shorter.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0) costs[shorter.length] = lastValue;
    }
    return Math.round(((longer.length - costs[shorter.length]) / parseFloat(longer.length)) * 100);
}

// المايك
let liveCaptionBox = document.getElementById('liveCaptionBox');
if (!liveCaptionBox && document.querySelector('.sentence-builder')) {
    liveCaptionBox = document.createElement('div');
    liveCaptionBox.id = 'liveCaptionBox';
    liveCaptionBox.style.cssText = 'margin-top: 20px; padding: 15px; border-radius: 10px; display: none; text-align: center; font-size: 1.3rem; font-weight: bold; background: var(--bg-color); border: 2px dashed var(--border-color); color: var(--text-color); transition: 0.3s;';
    document.querySelector('.sentence-builder').appendChild(liveCaptionBox);
}

if (micSentenceBtn) {
    micSentenceBtn.addEventListener('click', () => {
        const currentLang = localStorage.getItem('app_lang') || 'ar';
        if (currentSentence.length === 0) return;

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return;

        const recognition = new SpeechRecognition();
        recognition.lang = currentLang === 'ar' ? 'ar-EG' : 'en-US'; 
        recognition.interimResults = true; 

        const originalHtml = micSentenceBtn.innerHTML;
        micSentenceBtn.innerHTML = currentLang === 'ar' ? "🎙️ جاري الاستماع..." : "🎙️ Listening...";
        micSentenceBtn.style.backgroundColor = "#e74c3c"; 

        liveCaptionBox.style.display = 'block';
        liveCaptionBox.style.borderColor = 'var(--border-color)';
        liveCaptionBox.innerHTML = currentLang === 'ar' ? '<span style="color:#888;">أنا أسمعك...</span>' : '<span style="color:#888;">Listening...</span>';

        recognition.start();

        recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
                else interimTranscript += event.results[i][0].transcript;
            }
            liveCaptionBox.innerHTML = finalTranscript + '<span style="color:#888;">' + interimTranscript + '</span>';

            if (finalTranscript !== '') {
                const targetText = currentSentence.map(word => currentLang === 'ar' ? word.ar : word.en).join(' ');
                const cleanText = (text) => text.toLowerCase().replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/[^\w\s\u0600-\u06FF]/g, '').trim();
                const spokenClean = cleanText(finalTranscript);
                const targetClean = cleanText(targetText);
                const accuracy = calculateAccuracy(spokenClean, targetClean);

                if (accuracy >= 70 || spokenClean.includes(targetClean)) {
                    liveCaptionBox.style.borderColor = '#4CAF50'; 
                    liveCaptionBox.innerHTML = currentLang === 'ar' ? 
                        `✅ ${finalTranscript} <br><span style="color:#4CAF50; font-size:1rem; display:block; margin-top:5px;">(دقة النطق: ${accuracy}% - ممتاز! +10 نقط)</span>` : 
                        `✅ ${finalTranscript} <br><span style="color:#4CAF50; font-size:1rem; display:block; margin-top:5px;">(Accuracy: ${accuracy}% - Excellent! +10 pts)</span>`;
                    
                    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    if(currentUser) {
                        currentUser.points = (currentUser.points || 0) + 10;
                        currentUser.wordsSpoken = (currentUser.wordsSpoken || 0) + currentSentence.length;
                        localStorage.setItem('currentUser', JSON.stringify(currentUser));
                        localStorage.setItem(currentUser.email, JSON.stringify(currentUser)); 
                        const pointsEl = document.getElementById('heroPoints');
                        if(pointsEl) pointsEl.textContent = currentUser.points;
                    }
                } else {
                    liveCaptionBox.style.borderColor = '#e74c3c'; 
                    liveCaptionBox.innerHTML = currentLang === 'ar' ? 
                        `❌ ${finalTranscript} <br><span style="color:#e74c3c; font-size:1rem; display:block; margin-top:5px;">(دقة النطق: ${accuracy}% - المطلوب: ${targetText}) حاول تاني!</span>` :
                        `❌ ${finalTranscript} <br><span style="color:#e74c3c; font-size:1rem; display:block; margin-top:5px;">(Accuracy: ${accuracy}% - Target: ${targetText}) Try again!</span>`;
                }
            }
        };

        recognition.onend = () => {
            micSentenceBtn.innerHTML = originalHtml;
            micSentenceBtn.style.backgroundColor = ""; 
        };
    });
}

document.addEventListener('DOMContentLoaded', renderSentence);
const langToggleBtnSentence = document.getElementById('langToggle');
if (langToggleBtnSentence) langToggleBtnSentence.addEventListener('click', () => setTimeout(renderSentence, 50));