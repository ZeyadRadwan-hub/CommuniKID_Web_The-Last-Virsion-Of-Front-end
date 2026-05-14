// ==========================================
// منطق صفحة (كل الكروت - All Cards) وإدارة المفضلة
// ==========================================

window.renderAllCards = function() {
    const grid = document.getElementById('allWordsGrid');
    if (!grid) return;

    const currentLang = localStorage.getItem('app_lang') || 'ar';
    grid.innerHTML = '';

    // جلب مفضلة المستخدم الحالي عشان نعرف الكارت ده متفضل ولا لأ
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    let favorites = currentUser.favorites || [];

    // تجميع كل الكلمات من كل التصنيفات في Data.js
    let allWordsArray = [];
    if (typeof appData !== 'undefined' && appData.categories) {
        for (const catId in appData.categories) {
            const words = appData.categories[catId].words;
            words.forEach(w => allWordsArray.push(w));
        }
    }

    if (allWordsArray.length === 0) {
        grid.innerHTML = `<p style="text-align:center; color:#888; grid-column: 1/-1;">لا توجد كروت مسجلة في النظام.</p>`;
        return;
    }

    // رسم كل الكروت
    allWordsArray.forEach(wordObj => {
        const text = currentLang === 'ar' ? wordObj.ar : wordObj.en;
        
        // فحص هل الكلمة دي في المفضلة ولا لأ عشان نحدد لون القلب
        const isFav = favorites.some(fav => fav.ar === wordObj.ar && fav.en === wordObj.en);
        const heartIcon = isFav ? '❤️' : '🤍';

        const card = document.createElement('div');
        card.className = 'category-card'; 
        
        card.innerHTML = `
            <div class="fav-btn" onclick="toggleFav(event, '${wordObj.ar}', '${wordObj.en}', '${wordObj.image}')">${heartIcon}</div>
            
            <div class="cat-image" style="background-image: url('${wordObj.image}');"></div>
            <h3>${text}</h3>
        `;
        
        // عند الضغط على الكلمة، تضاف للشريط (بشرط إنك متكونش داست على القلب)
        card.onclick = (e) => {
            if (e.target.classList.contains('fav-btn')) return; // لو داس على القلب متضيفش الكلمة للجملة
            if (window.addToSentence) window.addToSentence(wordObj);
        };
        
        grid.appendChild(card);
    });
};

// ==========================================
// دالة إضافة/إزالة الكلمة من المفضلة
// ==========================================
window.toggleFav = function(event, ar, en, image) {
    event.stopPropagation(); // منع الكارت من الانضغاط وإضافة الكلمة للجملة
    
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    if (!currentUser.favorites) currentUser.favorites = [];
    
    // البحث عن الكلمة في المفضلة
    const index = currentUser.favorites.findIndex(fav => fav.ar === ar && fav.en === en);
    
    if (index > -1) {
        // لو موجودة، امسحها
        currentUser.favorites.splice(index, 1);
    } else {
        // لو مش موجودة، ضيفها
        currentUser.favorites.push({ ar, en, image });
    }
    
    // حفظ التعديلات
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem(currentUser.email, JSON.stringify(currentUser));
    
    // إعادة رسم الكروت عشان القلب يتحدث
    renderAllCards();
};

document.addEventListener('DOMContentLoaded', () => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'parent') {
        window.location.href = 'login.html';
        return;
    }
    renderAllCards();
});