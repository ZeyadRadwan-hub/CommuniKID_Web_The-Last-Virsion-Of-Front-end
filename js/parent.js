const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser || currentUser.role !== 'parent') {
    window.location.href = 'login.html';
}

// بناء الصفحة الرئيسية والكروت وصورة البطل
window.renderCategories = function() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    const heroNameEl = document.getElementById('heroName');
    const heroPointsEl = document.getElementById('heroPoints');
    const avatarCircle = document.querySelector('.avatar-circle');

    const currentLang = localStorage.getItem('app_lang') || 'ar';
    const welcomeText = currentLang === 'ar' ? `أهلاً بك يا ${currentUser.name}! 🌟` : `Welcome, ${currentUser.name}! 🌟`;

    if (heroNameEl) heroNameEl.textContent = welcomeText;
    if (heroPointsEl) heroPointsEl.textContent = currentUser.points || 0;

    if (avatarCircle && currentUser.profilePic) {
        avatarCircle.innerHTML = ''; 
        avatarCircle.style.backgroundImage = `url('${currentUser.profilePic}')`;
    }

    if (!categoriesGrid) return;
    categoriesGrid.innerHTML = '';

    if (typeof appData !== 'undefined' && appData.categories) {
        for (const catId in appData.categories) {
            const cat = appData.categories[catId];
            const title = currentLang === 'ar' ? cat.title_ar : cat.title_en;
            const coverImage = cat.thumbnail; 

            const cardLink = document.createElement('a');
            cardLink.href = `category.html?id=${catId}`;
            cardLink.style.textDecoration = 'none';
            
            cardLink.innerHTML = `
                <div class="category-card">
                    <div class="cat-image" style="background-image: url('${coverImage}');"></div>
                    <h3>${title}</h3>
                </div>
            `;
            categoriesGrid.appendChild(cardLink);
        }
    }
};

window.populateCategorySelect = function() {
    const select = document.getElementById('wordCategory');
    if(!select) return;
    const currentLang = localStorage.getItem('app_lang') || 'ar';
    select.innerHTML = '';
    for(let key in appData.categories) {
        let name = currentLang === 'ar' ? appData.categories[key].title_ar : appData.categories[key].title_en;
        select.innerHTML += `<option value="${key}">${name}</option>`;
    }
    const newCatTxt = currentLang === 'ar' ? "➕ إضافة تصنيف جديد..." : "➕ Add New Category...";
    select.innerHTML += `<option value="new_cat" style="font-weight:bold; color:var(--primary-color);">${newCatTxt}</option>`;
};

// ==========================================
// 🔴 برمجة نظام دليل الاستخدام (Onboarding Guide)
// ==========================================
const guideSteps = [
    { img: 'https://i.ibb.co/pBmkzmZn/Parent-home.png', titleKey: 'info_title_1', descKey: 'info_desc_1' },
    { img: 'https://i.ibb.co/5NGTZWM/Category.png', titleKey: 'info_title_2', descKey: 'info_desc_2' },
    { img: 'https://i.ibb.co/Wp213CmN/Add-Words-Or-Sentence.png', titleKey: 'info_title_3', descKey: 'info_desc_3' },
    { img: 'https://i.ibb.co/BH0y33cQ/Avatar.png', titleKey: 'info_title_4', descKey: 'info_desc_4' },
    { img: 'https://i.ibb.co/qHfs7Fv/Favorites.png', titleKey: 'info_title_5', descKey: 'info_desc_5' },
    { img: 'https://i.ibb.co/BKLHh7Wx/Tasks.png', titleKey: 'info_title_6', descKey: 'info_desc_6' },
    { img: 'https://i.ibb.co/SDryxQQH/Progress.png', titleKey: 'info_title_7', descKey: 'info_desc_7' },
    { img: 'https://i.ibb.co/9kqxFyFk/Chat.png', titleKey: 'info_title_8', descKey: 'info_desc_8' },
    { img: 'https://i.ibb.co/Qvx0q3hN/Appiontments.png', titleKey: 'info_title_9', descKey: 'info_desc_9' },
    { img: 'https://i.ibb.co/WWCQ3T43/Settings.png', titleKey: 'info_title_10', descKey: 'info_desc_10' }
];

let currentGuideStep = 0;

window.updateInfoModal = function() {
    const guideOverlay = document.getElementById('guideOverlay');
    if (!guideOverlay || guideOverlay.style.display === 'none') return;

    const currentLang = localStorage.getItem('app_lang') || 'ar';
    const step = guideSteps[currentGuideStep];
    
    document.getElementById('guideImage').src = step.img;
    document.getElementById('guideTitle').textContent = translations[currentLang][step.titleKey];
    document.getElementById('guideDesc').textContent = translations[currentLang][step.descKey];

    // إخفاء زر السابق في أول صورة
    document.getElementById('guidePrevBtn').style.visibility = currentGuideStep === 0 ? 'hidden' : 'visible';
    
    // تغيير زر التالي لـ "إنهاء" في آخر صورة
    const nextBtn = document.getElementById('guideNextBtn');
    if (currentGuideStep === guideSteps.length - 1) {
        nextBtn.innerHTML = currentLang === 'ar' ? translations.ar.btn_finish : translations.en.btn_finish;
        nextBtn.style.backgroundColor = '#2ecc71'; 
        nextBtn.style.color = 'white';
    } else {
        nextBtn.innerHTML = currentLang === 'ar' ? `${translations.ar.btn_next} ➡️` : `${translations.en.btn_next} ➡️`;
        nextBtn.style.backgroundColor = '#ecf0f1';
        nextBtn.style.color = '#333';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    populateCategorySelect();

    // خروج
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }

    // Modal الكلمات
    const modal = document.getElementById('addWordModal');
    const openModalBtn = document.getElementById('openAddWordModal');
    const closeModalBtn = document.querySelector('.close-modal');
    if (openModalBtn) openModalBtn.onclick = () => { modal.style.display = 'flex'; populateCategorySelect(); };
    if (closeModalBtn) closeModalBtn.onclick = () => modal.style.display = 'none';
    
    // إخفاء حقول التصنيف الجديد
    const categorySelect = document.getElementById('wordCategory');
    const newCategoryFields = document.getElementById('newCategoryFields');
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            if(this.value === 'new_cat') {
                newCategoryFields.style.display = 'block';
                document.getElementById('newCatAr').required = true;
                document.getElementById('newCatEn').required = true;
                document.getElementById('newCatImg').required = true;
            } else {
                newCategoryFields.style.display = 'none';
                document.getElementById('newCatAr').required = false;
                document.getElementById('newCatEn').required = false;
                document.getElementById('newCatImg').required = false;
            }
        });
    }

    // إضافة الكلمة
    const addWordForm = document.getElementById('addWordForm');
    if (addWordForm) {
        addWordForm.onsubmit = (e) => {
            e.preventDefault();
            const currentLang = localStorage.getItem('app_lang') || 'ar';
            let catKey = categorySelect.value;
            if(catKey === 'new_cat') {
                catKey = 'cat_' + Date.now(); 
                appData.categories[catKey] = {
                    title_ar: document.getElementById('newCatAr').value,
                    title_en: document.getElementById('newCatEn').value,
                    thumbnail: document.getElementById('newCatImg').value,
                    words: []
                };
            }
            appData.categories[catKey].words.push({ 
                ar: document.getElementById('wordAr').value, 
                en: document.getElementById('wordEn').value, 
                image: document.getElementById('wordImage').value 
            });
            if(window.saveAppDataToStorage) window.saveAppDataToStorage();
            alert(currentLang === 'ar' ? 'تمت الإضافة بنجاح! 🎉' : 'Added Successfully! 🎉');
            modal.style.display = 'none';
            addWordForm.reset();
            newCategoryFields.style.display = 'none';
            renderCategories(); 
        };
    }

    // 🔴 أحداث دليل الاستخدام (Guide Events) 🔴
    const startGuideBtn = document.getElementById('startGuideBtn');
    const guideOverlay = document.getElementById('guideOverlay');
    const guideExitBtn = document.getElementById('guideExitBtn');
    const guideNextBtn = document.getElementById('guideNextBtn');
    const guidePrevBtn = document.getElementById('guidePrevBtn');

    if (startGuideBtn) {
        startGuideBtn.addEventListener('click', () => {
            currentGuideStep = 0;
            guideOverlay.style.display = 'flex';
            updateInfoModal();
        });
    }

    if (guideExitBtn) {
        guideExitBtn.addEventListener('click', () => {
            guideOverlay.style.display = 'none';
        });
    }

    if (guideNextBtn) {
        guideNextBtn.addEventListener('click', () => {
            if (currentGuideStep < guideSteps.length - 1) {
                currentGuideStep++;
                updateInfoModal();
            } else {
                guideOverlay.style.display = 'none'; // زرار إنهاء
            }
        });
    }

    if (guidePrevBtn) {
        guidePrevBtn.addEventListener('click', () => {
            if (currentGuideStep > 0) {
                currentGuideStep--;
                updateInfoModal();
            }
        });
    }
});