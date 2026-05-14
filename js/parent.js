// ==========================================
// 1. حماية الصفحة وجلب بيانات البطل
// ==========================================
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser || currentUser.role !== 'parent') {
    window.location.href = 'login.html';
}

// ==========================================
// 2. بناء الصفحة الرئيسية (الكروت واللغة وصورة البطل)
// ==========================================
window.renderCategories = function() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    const heroNameEl = document.getElementById('heroName');
    const heroPointsEl = document.getElementById('heroPoints');
    const avatarCircle = document.querySelector('.avatar-circle'); // مسكنا دايرة الصورة

    const currentLang = localStorage.getItem('app_lang') || 'ar';
    const welcomeText = currentLang === 'ar' ? `أهلاً بك يا ${currentUser.name}! 🌟` : `Welcome, ${currentUser.name}! 🌟`;

    if (heroNameEl) heroNameEl.textContent = welcomeText;
    if (heroPointsEl) heroPointsEl.textContent = currentUser.points || 0;

    // --- تحديث صورة البروفايل ---
    if (avatarCircle && currentUser.profilePic) {
        avatarCircle.innerHTML = ''; // مسح الإيموجي الافتراضي 👦
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

// دالة لملء قائمة التصنيفات في المودال أوتوماتيكياً
window.populateCategorySelect = function() {
    const select = document.getElementById('wordCategory');
    if(!select) return;
    const currentLang = localStorage.getItem('app_lang') || 'ar';
    
    select.innerHTML = '';
    for(let key in appData.categories) {
        let name = currentLang === 'ar' ? appData.categories[key].title_ar : appData.categories[key].title_en;
        select.innerHTML += `<option value="${key}">${name}</option>`;
    }
    
    // إضافة خيار التصنيف الجديد
    const newCatTxt = currentLang === 'ar' ? "➕ إضافة تصنيف جديد..." : "➕ Add New Category...";
    select.innerHTML += `<option value="new_cat" style="font-weight:bold; color:var(--primary-color);">${newCatTxt}</option>`;
};

document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    populateCategorySelect();

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }

    const modal = document.getElementById('addWordModal');
    const openModalBtn = document.getElementById('openAddWordModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const addWordForm = document.getElementById('addWordForm');
    const categorySelect = document.getElementById('wordCategory');
    const newCategoryFields = document.getElementById('newCategoryFields');

    if (openModalBtn) openModalBtn.onclick = () => { modal.style.display = 'flex'; populateCategorySelect(); };
    if (closeModalBtn) closeModalBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };

    // إظهار وإخفاء حقول التصنيف الجديد
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

    if (addWordForm) {
        addWordForm.onsubmit = (e) => {
            e.preventDefault();
            const currentLang = localStorage.getItem('app_lang') || 'ar';
            let catKey = categorySelect.value;
            
            // لو المستخدم اختار تصنيف جديد، ننشئه الأول في الداتا
            if(catKey === 'new_cat') {
                catKey = 'cat_' + Date.now(); // إنشاء ID فريد للتصنيف
                appData.categories[catKey] = {
                    title_ar: document.getElementById('newCatAr').value,
                    title_en: document.getElementById('newCatEn').value,
                    thumbnail: document.getElementById('newCatImg').value,
                    words: []
                };
            }

            const ar = document.getElementById('wordAr').value;
            const en = document.getElementById('wordEn').value;
            const img = document.getElementById('wordImage').value;

            // إضافة الكلمة للتصنيف المختار (أو الجديد)
            appData.categories[catKey].words.push({ ar: ar, en: en, image: img });
            
            if(window.saveAppDataToStorage) window.saveAppDataToStorage();

            alert(currentLang === 'ar' ? 'تمت الإضافة بنجاح! 🎉' : 'Added Successfully! 🎉');
            modal.style.display = 'none';
            addWordForm.reset();
            newCategoryFields.style.display = 'none';
            renderCategories(); // تحديث الصفحة الرئيسية
        };
    }
});