document.addEventListener('DOMContentLoaded', () => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'therapist') {
        window.location.href = 'login.html';
        return;
    }

    const currentLang = localStorage.getItem('app_lang') || 'ar';
    const form = document.getElementById('doctorSettingsForm');
    
    document.getElementById('docName').value = currentUser.name || '';
    document.getElementById('docSpecialty').value = currentUser.specialty || '';
    document.getElementById('docEmail').value = currentUser.email || '';
    
    const codeDisplay = document.getElementById('docCodeDisplay');
    if(codeDisplay) {
        codeDisplay.value = currentUser.myDoctorCode || (currentLang === 'ar' ? 'غير متوفر' : 'Not Available');
    }

    const copyBtn = document.getElementById('copyCodeBtn');
    if(copyBtn) {
        copyBtn.textContent = currentLang === 'ar' ? 'نسخ الكود' : 'Copy Code';
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(currentUser.myDoctorCode).then(() => {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = currentLang === 'ar' ? 'تم النسخ ✅' : 'Copied ✅';
                copyBtn.style.backgroundColor = '#2ecc71';
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.style.backgroundColor = '#3498db';
                }, 2000);
            });
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        currentUser.name = document.getElementById('docName').value;
        currentUser.specialty = document.getElementById('docSpecialty').value;
        const newPass = document.getElementById('docPass').value;

        if (newPass.trim() !== "") {
            currentUser.password = newPass;
        }

        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem(currentUser.email, JSON.stringify(currentUser));

        alert(currentLang === 'ar' ? 'تم تحديث بياناتك بنجاح! ✨' : 'Your data updated successfully! ✨');
        window.location.reload();
    });

    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
});