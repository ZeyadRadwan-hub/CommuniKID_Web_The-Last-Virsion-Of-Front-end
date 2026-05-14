// ==========================================
// نظام متجر الأبطال (Roblox Style - 3D Integration)
// ==========================================

let currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) window.location.href = 'login.html';

// تم تحديث الـ Object عشان يشمل الترجمة الإنجليزية كمان
const shopItems = {
    hats: [
        { id: 'h1', icon: '👑', nameAr: 'تاج الملك', nameEn: 'King Crown', price: 100, type: 'hat' },
        { id: 'h2', icon: '🧢', nameAr: 'كاب أزرق', nameEn: 'Blue Cap', price: 50, type: 'hat' }
    ],
    faces: [
        { id: 'f1', icon: '🕶️', nameAr: 'نضارة شمس', nameEn: 'Sunglasses', price: 40, type: 'face' }
    ],
    shirts: [
        { id: 's1', color: '#e74c3c', nameAr: 'تيشيرت أحمر', nameEn: 'Red Shirt', price: 20, type: 'shirt' },
        { id: 's2', color: '#2ecc71', nameAr: 'تيشيرت أخضر', nameEn: 'Green Shirt', price: 20, type: 'shirt' },
        { id: 's3', color: '#8e44ad', nameAr: 'تيشيرت بنفسجي', nameEn: 'Purple Shirt', price: 50, type: 'shirt' },
        { id: 's4', color: '#f1c40f', nameAr: 'تيشيرت ذهبي', nameEn: 'Gold Shirt', price: 150, type: 'shirt' },
        { id: 's5', color: '#3498db', nameAr: 'تيشيرت أزرق', nameEn: 'Blue Shirt', price: 0, type: 'shirt' }
    ]
};

function updateUI() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) return;

    const pointsEl = document.getElementById('marketPoints');
    if (pointsEl) pointsEl.textContent = user.points || 0;

    let needsSave = false;
    if (!user.inventory) { user.inventory = ['s5']; needsSave = true; }
    if (!user.avatar) { user.avatar = { hat: '', face: '', shirt: '#3498db', gender: 'boy' }; needsSave = true; }
    if (!user.avatar.gender) { user.avatar.gender = 'boy'; needsSave = true; }
    
    if (needsSave) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem(user.email, JSON.stringify(user));
    }

    document.getElementById('btnBoy').classList.toggle('active', user.avatar.gender === 'boy');
    document.getElementById('btnGirl').classList.toggle('active', user.avatar.gender === 'girl');

    if (window.update3DAvatar) window.update3DAvatar(user.avatar.shirt);
    if (window.switchGender3D) window.switchGender3D(user.avatar.gender);
    if (window.updateAccessories3D) window.updateAccessories3D(user.avatar.hat, user.avatar.face);

    renderShop();
}

window.renderShop = function() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) return;
    const currentLang = localStorage.getItem('app_lang') || 'ar';
    const t = window.translations ? window.translations[currentLang] : null;

    const txtBuy = t && t.buy ? t.buy : (currentLang === 'ar' ? 'شراء' : 'Buy');
    const txtOwned = t && t.owned ? t.owned : (currentLang === 'ar' ? 'تم الشراء ✅' : 'Owned ✅');
    const txtEquipped = t && t.equipped ? t.equipped : (currentLang === 'ar' ? 'ملبوس ✔️' : 'Equipped ✔️');
    const txtEquip = currentLang === 'ar' ? 'إلبس 👕' : 'Equip 👕';
    const txtUnequip = currentLang === 'ar' ? 'خلع ❌' : 'Unequip ❌';
    
    const renderCategory = (items, gridId) => {
        const grid = document.getElementById(gridId);
        if (!grid) return;
        grid.innerHTML = '';
        
        items.forEach(item => {
            const isOwned = user.inventory.includes(item.id);
            let isEquipped = false;
            if (item.type === 'shirt') isEquipped = (user.avatar.shirt === item.color);
            if (item.type === 'hat') isEquipped = (user.avatar.hat === item.id);
            if (item.type === 'face') isEquipped = (user.avatar.face === item.id);

            const card = document.createElement('div');
            card.className = 'shop-item';
            
            const display = item.type === 'shirt' 
                ? `<div class="item-color" style="background:${item.color}"></div>` 
                : `<div class="item-icon">${item.icon}</div>`;

            let btnHtml = '';
            if (isEquipped) {
                btnHtml = item.type === 'shirt' 
                    ? `<button class="buy-btn equipped">${txtEquipped}</button>`
                    : `<button class="buy-btn equipped" onclick="equipItem('', '${item.type}', '')">${txtUnequip}</button>`;
            } else if (isOwned) {
                const equipValue = item.type === 'shirt' ? item.color : item.id;
                btnHtml = `<button class="buy-btn" onclick="equipItem('${item.id}', '${item.type}', '${equipValue}')">${txtEquip}</button>`;
            } else {
                const currentPoints = user.points || 0;
                const canAfford = currentPoints >= item.price;
                btnHtml = `<button class="buy-btn ${canAfford ? '' : 'locked'}" onclick="buyItem('${item.id}', ${item.price})">${txtBuy} (${item.price} ⭐)</button>`;
            }

            const itemName = currentLang === 'ar' ? item.nameAr : item.nameEn;

            card.innerHTML = `
                ${display}
                <div class="item-name">${itemName}</div>
                ${!isOwned ? `<div class="item-price">⭐ ${item.price}</div>` : `<div class="item-price" style="color:#2ecc71;">${txtOwned}</div>`}
                ${btnHtml}
            `;
            grid.appendChild(card);
        });
    };

    renderCategory(shopItems.shirts, 'shirtsGrid');
    renderCategory(shopItems.hats, 'hatsGrid');
    renderCategory(shopItems.faces, 'facesGrid');
};

window.buyItem = function(itemId, price) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let currentPoints = user.points || 0;
    const currentLang = localStorage.getItem('app_lang') || 'ar';

    if (currentPoints < price) {
        alert(currentLang === 'ar' ? "معكش نقط كفاية يا بطل! 🎤" : "Not enough points, Hero! 🎤");
        return;
    }

    const msg = currentLang === 'ar' ? `هتشتري العنصر ده بـ ${price} نقطة؟` : `Buy this item for ${price} points?`;
    if (confirm(msg)) {
        user.points = currentPoints - price;
        user.inventory.push(itemId);
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem(user.email, JSON.stringify(user));
        updateUI(); 
    }
};

window.equipItem = function(itemId, type, value) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (type === 'hat') user.avatar.hat = value;
    if (type === 'face') user.avatar.face = value;
    if (type === 'shirt') user.avatar.shirt = value;
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem(user.email, JSON.stringify(user));
    updateUI(); 
};

window.setGender = function(gender) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    user.avatar.gender = gender;
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem(user.email, JSON.stringify(user));
    updateUI();
};

setTimeout(updateUI, 100);