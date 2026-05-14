document.addEventListener('DOMContentLoaded', () => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) { window.location.href = 'login.html'; return; }
    const currentLang = localStorage.getItem('app_lang') || 'ar';

    const basicBtn = document.getElementById('upgradeBasicBtn');
    const proBtn = document.getElementById('upgradeProBtn');

    // تغيير شكل الزرار لو هو مشترك بالفعل
    if (currentUser.premiumPlan === 'basic') {
        if(basicBtn) { basicBtn.textContent = currentLang === 'ar' ? 'أنت مشترك بالفعل ✅' : 'Already Subscribed ✅'; basicBtn.disabled = true; basicBtn.style.opacity = '0.7'; }
    } else if (currentUser.premiumPlan === 'pro') {
        if(proBtn) { proBtn.textContent = currentLang === 'ar' ? 'أنت مشترك بالفعل ✅' : 'Already Subscribed ✅'; proBtn.disabled = true; proBtn.style.opacity = '0.7'; }
        if(basicBtn) { basicBtn.textContent = currentLang === 'ar' ? 'مشمول في باقتك 👑' : 'Included in Pro 👑'; basicBtn.disabled = true; basicBtn.style.opacity = '0.7'; }
    }

    function upgradePlan(planName) {
        const confirmMsg = currentLang === 'ar' ? `هل تريد المتابعة للاشتراك في باقة ${planName}؟ 💳🚀` : `Proceed to subscribe to ${planName} plan? 💳🚀`;
        
        if (confirm(confirmMsg)) {
            // محاكاة دفع ناجح
            currentUser.premiumPlan = planName;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            localStorage.setItem(currentUser.email, JSON.stringify(currentUser));
            
            alert(currentLang === 'ar' ? 'تم تفعيل الاشتراك بنجاح! استمتع بالمميزات الجديدة 🎉' : 'Subscription activated successfully! Enjoy the new features 🎉');
            window.location.reload();
        }
    }

    if(basicBtn) basicBtn.addEventListener('click', () => upgradePlan('basic'));
    if(proBtn) proBtn.addEventListener('click', () => upgradePlan('pro'));
});