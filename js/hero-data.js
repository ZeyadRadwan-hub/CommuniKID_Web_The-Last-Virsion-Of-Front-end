// ==========================================
// إدارة صفحة بيانات البطل وتحويل الصورة (Base64)
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser === null || currentUser.role !== 'parent') {
        window.location.href = 'login.html';
        return;
    }

    const nameInput = document.getElementById('heroNameInput');
    const ageInput = document.getElementById('heroAgeInput');
    const conditionInput = document.getElementById('heroConditionInput');
    const doctorCodeInput = document.getElementById('heroDoctorCodeInput');
    const form = document.getElementById('heroDataForm');
    
    // عناصر رفع الصورة
    const profileImageInput = document.getElementById('profileImageInput');
    const profileImagePreview = document.getElementById('profileImagePreview');
    let base64Image = currentUser.profilePic || "";

    if (nameInput !== null) nameInput.value = currentUser.name || '';
    if (ageInput !== null) ageInput.value = currentUser.childAge || '';
    if (doctorCodeInput !== null) doctorCodeInput.value = currentUser.doctorCode || '';
    
    // عرض الصورة المحفوظة (إن وجدت)
    if (base64Image !== "") {
        profileImagePreview.innerHTML = "";
        profileImagePreview.style.backgroundImage = `url('${base64Image}')`;
    }
    
    if (conditionInput !== null && currentUser.childCondition !== undefined) {
        for (let i = 0; i < conditionInput.options.length; i++) {
            if (conditionInput.options[i].value === currentUser.childCondition) {
                conditionInput.selectedIndex = i;
                break;
            }
        }
    }

    // تحويل الصورة لـ Base64 عند اختيارها من الكمبيوتر/الموبايل
    if (profileImageInput) {
        profileImageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // التأكد إن حجم الصورة معقول عشان متتقلش الـ LocalStorage
                if (file.size > 2 * 1024 * 1024) { 
                    alert(localStorage.getItem('app_lang') === 'en' ? "Image size must be less than 2MB." : "حجم الصورة يجب أن يكون أقل من 2 ميجابايت.");
                    return;
                }

                const reader = new FileReader();
                reader.onload = function(event) {
                    base64Image = event.target.result;
                    profileImagePreview.innerHTML = "";
                    profileImagePreview.style.backgroundImage = `url('${base64Image}')`;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (form !== null) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); 

            currentUser.name = nameInput.value;
            currentUser.childAge = ageInput.value;
            currentUser.childCondition = conditionInput.value;
            currentUser.profilePic = base64Image; // حفظ الصورة
            
            if (doctorCodeInput.value.trim() !== '') {
                currentUser.doctorCode = doctorCodeInput.value.trim().toUpperCase();
            } else {
                currentUser.doctorCode = "";
            }

            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            localStorage.setItem(currentUser.email, JSON.stringify(currentUser));

            alert(localStorage.getItem('app_lang') === 'en' ? 'Hero data saved successfully! 🎉' : 'تم حفظ بيانات البطل بنجاح! 🎉');
            window.location.href = 'settings.html'; 
        });
    }
});