document.addEventListener('DOMContentLoaded', () => {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) { window.location.href = 'login.html'; return; }

    const points = user.points || 0;
    const pointsEl = document.getElementById('achievePoints');
    if(pointsEl) pointsEl.textContent = points;
    
    const currentLang = localStorage.getItem('app_lang') || 'ar';

    const badges = [
        { titleAr: 'أول كلمة', titleEn: 'First Word', icon: '👶', req: 0 },
        { titleAr: 'بطل مبتدئ', titleEn: 'Novice Hero', icon: '🥉', req: 50 },
        { titleAr: 'متحدث رائع', titleEn: 'Great Speaker', icon: '🥈', req: 200 },
        { titleAr: 'الأسطورة', titleEn: 'The Legend', icon: '🥇', req: 500 }
    ];

    const grid = document.getElementById('achievementsGrid');
    if(!grid) return;
    grid.innerHTML = '';

    const txtUnlocked = currentLang === 'ar' ? 'تم الفتح 🎉' : 'Unlocked 🎉';
    const txtLeft = currentLang === 'ar' ? 'باقي' : 'Left:';
    const txtPts = currentLang === 'ar' ? 'نقطة' : 'pts';

    badges.forEach(b => {
        const isUnlocked = points >= b.req;
        const bTitle = currentLang === 'ar' ? b.titleAr : b.titleEn;
        
        // حساب نسبة شريط التقدم
        let progressPercent = b.req === 0 ? 100 : Math.min(100, (points / b.req) * 100);
        let pointsLeft = Math.max(0, b.req - points);
        
        let progressText = isUnlocked ? txtUnlocked : `${txtLeft} ${pointsLeft} ${txtPts} ⭐`;
        let animationClass = isUnlocked ? 'unlocked-badge' : 'locked';

        grid.innerHTML += `
            <div class="grid-card ${animationClass}">
                <span class="badge-icon">${b.icon}</span>
                <h3 style="color:var(--text-color); margin-bottom: 10px;">${bTitle}</h3>
                
                <div class="achieve-progress-bg">
                    <div class="achieve-progress-fill" style="width: ${progressPercent}%;"></div>
                </div>
                
                <p style="color: ${isUnlocked ? '#2ecc71' : '#888'}; font-weight: bold; margin-top: 10px; font-size: 0.9rem;">
                    ${progressText}
                </p>
            </div>`;
    });
});