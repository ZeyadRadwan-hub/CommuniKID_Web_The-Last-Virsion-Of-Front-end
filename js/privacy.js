document.addEventListener('DOMContentLoaded', () => {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) window.location.href = 'login.html';

    document.getElementById('privacyForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const current = document.getElementById('currentPass').value;
        const newPass = document.getElementById('newPass').value;
        const confirm = document.getElementById('confirmPass').value;

        if (current !== user.password) { alert('كلمة المرور الحالية غير صحيحة! ❌'); return; }
        if (newPass !== confirm) { alert('كلمة المرور الجديدة غير متطابقة! ❌'); return; }

        user.password = newPass;
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem(user.email, JSON.stringify(user));
        alert('تم تغيير كلمة المرور بنجاح! 🛡️');
        window.location.href = 'settings.html';
    });
});