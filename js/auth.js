// ==========================================
// 1. كود التبديل بين (ولي الأمر) و (الأخصائي)
// ==========================================
const btnParent = document.getElementById('btnParent');
const btnTherapist = document.getElementById('btnTherapist');
const parentFields = document.getElementById('parentFields');
const therapistFields = document.getElementById('therapistFields');

if (btnParent && btnTherapist) {
    btnParent.addEventListener('click', function() {
        btnParent.classList.add('active');
        btnTherapist.classList.remove('active');
        parentFields.style.display = 'block';
        therapistFields.style.display = 'none';
    });

    btnTherapist.addEventListener('click', function() {
        btnTherapist.classList.add('active');
        btnParent.classList.remove('active');
        therapistFields.style.display = 'block';
        parentFields.style.display = 'none';
    });
}

function generateDoctorCode() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "@#$%&*";
    let code = "";
    for (let i = 0; i < 4; i++) code += letters.charAt(Math.floor(Math.random() * letters.length));
    for (let i = 0; i < 4; i++) code += numbers.charAt(Math.floor(Math.random() * numbers.length));
    code += symbols.charAt(Math.floor(Math.random() * symbols.length));
    return code;
}

// ==========================================
// 2. برمجة زر "إنشاء الحساب الآن" (Sign Up)
// ==========================================
const signupForm = document.getElementById('signupForm');

if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        const isParent = btnParent.classList.contains('active');
        const role = isParent ? 'parent' : 'therapist';
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value.toLowerCase().trim();
        const password = document.getElementById('password').value;

        if(localStorage.getItem(email) !== null) {
            alert(localStorage.getItem('app_lang') === 'en' ? "Email already exists!" : "هذا البريد الإلكتروني مسجل مسبقاً!");
            return;
        }

        let extraData = {};
        if (role === 'parent') {
            extraData.childAge = document.getElementById('childAge').value;
            extraData.childCondition = document.getElementById('childCondition').value;
            extraData.doctorCode = document.getElementById('doctorCode').value.trim(); 
        } else {
            extraData.specialty = document.getElementById('specialty').value;
            extraData.myDoctorCode = generateDoctorCode(); 
            alert((localStorage.getItem('app_lang') === 'en' ? "Account created! Your code: " : "تم إنشاء حسابك بنجاح! كودك الخاص هو: ") + extraData.myDoctorCode);
        }

        // إعداد بيانات المستخدم الجديد مع نظام الـ Streak
        const userData = {
            name: name,
            email: email,
            password: password,
            role: role,
            points: 0,
            streakDays: 1, // بيبدأ بـ 1 عشان ده أول يوم ليه
            lastLoginDate: new Date().toISOString().split('T')[0], // بيسجل تاريخ النهاردة
            premiumPlan: 'free', // الخطة المجانية افتراضياً
            ...extraData
        };

        localStorage.removeItem('currentUser');
        localStorage.setItem(email, JSON.stringify(userData));
        localStorage.setItem('currentUser', JSON.stringify(userData));

        if (role === 'parent') window.location.replace('parent-home.html');
        else window.location.replace('therapist-home.html');
    });
}

// ==========================================
// 3. برمجة زر "تسجيل الدخول السريع" (Login) مع حساب الـ Streak
// ==========================================
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value.toLowerCase().trim();
        const password = document.getElementById('password').value;
        const savedUserString = localStorage.getItem(email);

        if (savedUserString) {
            let savedUser = JSON.parse(savedUserString);
            
            if (savedUser.password === password) {
                // ------ تحديث عداد الأيام (Streak Logic) ------
                const today = new Date();
                const todayString = today.toISOString().split('T')[0];
                
                if (savedUser.lastLoginDate) {
                    const lastLogin = new Date(savedUser.lastLoginDate);
                    const diffTime = Math.abs(today - lastLogin);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

                    if (diffDays === 1) {
                        // دخل تاني يوم على طول -> زود العداد
                        savedUser.streakDays = (savedUser.streakDays || 0) + 1;
                    } else if (diffDays > 1) {
                        // فوت يوم أو أكتر -> رجع العداد لـ 1
                        savedUser.streakDays = 1;
                    } 
                    // لو diffDays === 0 يعني دخل في نفس اليوم، مش هنعمل حاجة
                } else {
                    // لو حساب قديم مكنش فيه الميزة دي
                    savedUser.streakDays = 1;
                }
                
                // تحديث تاريخ آخر دخول لتاريخ النهاردة
                savedUser.lastLoginDate = todayString;
                
                // حفظ التعديلات في الداتا بيز
                localStorage.setItem(email, JSON.stringify(savedUser));
                // ---------------------------------------------

                localStorage.removeItem('currentUser');
                localStorage.setItem('currentUser', JSON.stringify(savedUser));
                
                if (savedUser.role === 'parent') window.location.replace('parent-home.html');
                else if (savedUser.role === 'therapist') window.location.replace('therapist-home.html');
                
            } else {
                alert(localStorage.getItem('app_lang') === 'en' ? "Incorrect Password!" : "كلمة المرور غير صحيحة يا بطل!");
            }
        } else {
            alert(localStorage.getItem('app_lang') === 'en' ? "Account not found!" : "هذا الحساب غير موجود، جرب تنشئ حساب جديد.");
        }
    });
}