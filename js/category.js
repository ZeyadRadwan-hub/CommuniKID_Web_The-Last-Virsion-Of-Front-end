// ==========================================
// منطق صفحة التصنيف والمفضلة
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    if (!currentUser.favorites) currentUser.favorites = [];

    const urlParams = new URLSearchParams(window.location.search);
    const catId = urlParams.get('id');

    const wordsGrid = document.getElementById('wordsGrid');
    const categoryTitle = document.getElementById('categoryTitle');
    const pointsEl = document.getElementById('heroPoints');
    const backBtn = document.getElementById('backBtn');
    
    if (pointsEl) pointsEl.textContent = currentUser.points || 0;

    const currentLang = localStorage.getItem('app_lang') || 'ar';
    if (backBtn) backBtn.textContent = currentLang === 'ar' ? '⬅️ رجوع' : '➡️ Back';

    if (!catId || !appData.categories[catId]) {
        if (categoryTitle) categoryTitle.textContent = currentLang === 'ar' ? "التصنيف غير موجود ❌" : "Category not found ❌";
        return;
    }

    const category = appData.categories[catId];
    if (categoryTitle) categoryTitle.textContent = currentLang === 'ar' ? category.title_ar : category.title_en;
    
    if (wordsGrid) wordsGrid.innerHTML = '';

    category.words.forEach(wordObj => {
        const wordText = currentLang === 'ar' ? wordObj.ar : wordObj.en;
        const isFav = currentUser.favorites.some(f => f.ar === wordObj.ar); 
        
        const card = document.createElement('div');
        card.className = 'category-card';
        card.style.position = 'relative'; 
        
        card.innerHTML = `
            <div class="fav-btn">
                ${isFav ? '❤️' : '🤍'}
            </div>
            <div class="cat-image" style="background-image: url('${wordObj.image}'); pointer-events: none;"></div>
            <h3 style="pointer-events: none;">${wordText}</h3>
        `;
        
        // زرار المفضلة (القلب)
        const favBtn = card.querySelector('.fav-btn');
        favBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // منع الكلمة من النزول في الجملة بالغلط
            
            const index = currentUser.favorites.findIndex(f => f.ar === wordObj.ar);
            if (index > -1) {
                currentUser.favorites.splice(index, 1);
                favBtn.textContent = '🤍';
            } else {
                currentUser.favorites.push(wordObj);
                favBtn.textContent = '❤️';
            }
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            localStorage.setItem(currentUser.email, JSON.stringify(currentUser));
        });

        // الضغط على الكارت نفسه
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => card.style.transform = '', 150);
            
            const utterance = new SpeechSynthesisUtterance(wordText);
            utterance.lang = currentLang === 'ar' ? 'ar-SA' : 'en-US'; 
            utterance.rate = 0.9; 
            window.speechSynthesis.speak(utterance);

            // نبعت الكلمة كـ Object لملف الجملة
            if (window.addToSentence) {
                window.addToSentence(wordObj);
            }
        });

        if (wordsGrid) wordsGrid.appendChild(card);
    });
});