document.addEventListener('DOMContentLoaded', function() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser === null || currentUser.role !== 'therapist') {
        window.location.href = 'login.html';
        return;
    }

    const currentLang = localStorage.getItem('app_lang') || 'ar';
    const grid = document.getElementById('patientsGrid');
    const addPatientModal = document.getElementById('addPatientModal');
    const openAddPatientModalBtn = document.getElementById('openAddPatientModalBtn');
    const closePatientModal = document.getElementById('closePatientModal');
    const addPatientForm = document.getElementById('addPatientForm');

    if(openAddPatientModalBtn) openAddPatientModalBtn.onclick = () => addPatientModal.style.display = 'flex';
    if(closePatientModal) closePatientModal.onclick = () => addPatientModal.style.display = 'none';
    window.addEventListener('click', (e) => { if (e.target == addPatientModal) addPatientModal.style.display = 'none'; });

    if(addPatientForm) {
        addPatientForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('newPatEmail').value;
            
            if(localStorage.getItem(email)) {
                alert(currentLang === 'ar' ? "هذا البريد الإلكتروني مسجل مسبقاً في النظام!" : "This email is already registered in the system!");
                return;
            }

            const newPatientData = {
                name: document.getElementById('newPatName').value,
                email: email,
                password: document.getElementById('newPatPass').value,
                childAge: document.getElementById('newPatAge').value,
                childCondition: document.getElementById('newPatCond').value,
                gender: document.getElementById('newPatGender').value,
                role: 'parent',
                points: 0,
                doctorCode: currentUser.myDoctorCode 
            };

            localStorage.setItem(email, JSON.stringify(newPatientData));
            
            alert(currentLang === 'ar' ? 'تم إنشاء حساب المريض وربطه بعيادتك بنجاح! 🎉\nيمكن للمريض الآن تسجيل الدخول ببريده وكلمة المرور.' : 'Patient account created and linked successfully! 🎉\nThe patient can now login.');
            addPatientForm.reset();
            addPatientModal.style.display = 'none';
            loadPatients(); 
        });
    }

    function loadPatients() {
        let patients = [];
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key.includes('@')) {
                let userString = localStorage.getItem(key);
                let userObj = JSON.parse(userString);
                if (userObj.role === 'parent' && userObj.doctorCode === currentUser.myDoctorCode) {
                    patients.push(userObj);
                }
            }
        }

        grid.innerHTML = '';

        if (patients.length === 0) {
            let emptyMsg = currentLang === 'ar' ? 
                `لا يوجد أبطال مرتبطين بكودك حتى الآن. قم بإضافة مريض جديد أو أعطهم كودك: ${currentUser.myDoctorCode}` : 
                `No heroes linked to your code yet. Add a new patient or give them your code: ${currentUser.myDoctorCode}`;
            grid.innerHTML = `<p style="text-align:center; color:#888; grid-column: 1 / -1;">${emptyMsg}</p>`;
        } else {
            const txtPts = currentLang === 'ar' ? 'إجمالي النقاط' : 'Total Points';
            const txtEmail = currentLang === 'ar' ? 'البريد' : 'Email';
            const txtBtn = currentLang === 'ar' ? 'إرسال مهمة ➕' : 'Send Task ➕';
            const txtYears = currentLang === 'ar' ? 'سنوات' : 'years';

            patients.forEach(function(p) {
                let avatar = p.gender === 'female' ? "👧" : "👦";
                let points = p.points || 0;
                
                let conditionText = "غير محدد";
                if(p.childCondition === 'autism') conditionText = currentLang === 'ar' ? 'طيف توحد' : 'Autism';
                else if(p.childCondition === 'speech_delay') conditionText = currentLang === 'ar' ? 'تأخر نطق' : 'Speech Delay';
                else if(p.childCondition === 'down_syndrome') conditionText = currentLang === 'ar' ? 'متلازمة داون' : 'Down Syndrome';
                else conditionText = currentLang === 'ar' ? 'أخرى' : 'Other';
                
                grid.innerHTML += `
                    <div class="patient-card">
                        <div class="p-card-top">
                            <div class="p-avatar">${avatar}</div>
                            <div class="p-info">
                                <h3>${p.name}</h3>
                                <p>${conditionText} - ${p.childAge} ${txtYears}</p>
                            </div>
                        </div>
                        <div class="p-stats">
                            <div class="p-stat-item">
                                <span>${txtPts}</span>
                                <strong>⭐ ${points}</strong>
                            </div>
                            <div class="p-stat-item">
                                <span>${txtEmail}</span>
                                <strong style="font-size:0.7rem;">${p.email}</strong>
                            </div>
                        </div>
                        <div class="p-actions">
                            <button class="p-btn btn-task" onclick="window.location.href='therapist-tasks.html'">${txtBtn}</button>
                        </div>
                    </div>
                `;
            });
        }
    }

    loadPatients(); 

    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
});