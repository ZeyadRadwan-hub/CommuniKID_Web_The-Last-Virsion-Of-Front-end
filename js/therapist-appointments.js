document.addEventListener('DOMContentLoaded', () => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'therapist') {
        window.location.href = 'login.html';
        return;
    }

    const modal = document.getElementById('appointmentModal');
    const modalTitle = document.getElementById('modalTitle');
    const openBtn = document.getElementById('openModalBtn');
    const closeBtn = document.querySelector('.close-modal');
    const form = document.getElementById('addAppointmentForm');
    const container = document.getElementById('appointmentsContainer');
    const submitBtn = form.querySelector('button[type="submit"]');
    const patientSelect = document.getElementById('patientName');

    let editIndex = -1; 

    // جلب المرضى الحقيقيين لملء القائمة المنسدلة (باستخدام الإيميل كقيمة)
    let myPatients = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.includes('@')) {
            let user = JSON.parse(localStorage.getItem(key));
            if (user.role === 'parent' && user.doctorCode === currentUser.myDoctorCode) {
                myPatients.push(user);
            }
        }
    }

    patientSelect.innerHTML = '<option value="" disabled selected>اختر البطل...</option>';
    if (myPatients.length === 0) {
        patientSelect.innerHTML = '<option value="" disabled selected>لا يوجد مرضى مضافين</option>';
    } else {
        myPatients.forEach(p => {
            // القيمة هنا بقت الإيميل عشان الربط يكون دقيق
            patientSelect.innerHTML += `<option value="${p.email}">${p.name}</option>`;
        });
    }

    openBtn.onclick = () => {
        editIndex = -1;
        modalTitle.textContent = "حجز جلسة جديدة ✨";
        submitBtn.textContent = "تأكيد الحجز ✅";
        form.reset();
        modal.style.display = 'flex';
    };

    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; }

    function loadAppointments() {
        const allApps = JSON.parse(localStorage.getItem('therapist_appointments')) || [];
        container.innerHTML = '';
        
        let myApps = [];
        allApps.forEach((app, index) => {
            if (app.doctorEmail === currentUser.email) {
                myApps.push({ data: app, originalIndex: index });
            }
        });

        if (myApps.length === 0) {
            container.innerHTML = `<p style="text-align:center; color:#888;">لا توجد مواعيد مجدولة حتى الآن.</p>`;
        } else {
            myApps.forEach(item => {
                container.innerHTML += `
                    <div class="appointment-card">
                        <div class="app-info">
                            <h3>${item.data.patient}</h3>
                            <p>
                                <span>📅 ${item.data.date}</span>
                                <span>🕒 ${item.data.time}</span>
                                <span class="app-type-tag">${item.data.type}</span>
                            </p>
                        </div>
                        <div class="app-actions">
                            <button class="edit-app" onclick="editAppointment(${item.originalIndex})">✏️ تعديل</button>
                            <button class="delete-app" onclick="deleteAppointment(${item.originalIndex})">🗑️</button>
                        </div>
                    </div>
                `;
            });
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const patientEmail = patientSelect.value;
        const patientName = patientSelect.options[patientSelect.selectedIndex].text;

        const updatedApp = {
            patient: patientName,
            patientEmail: patientEmail, // حفظ الإيميل للربط
            date: document.getElementById('appDate').value,
            time: document.getElementById('appTime').value,
            type: document.getElementById('appType').value,
            doctorEmail: currentUser.email 
        };

        let apps = JSON.parse(localStorage.getItem('therapist_appointments')) || [];

        if (editIndex === -1) {
            apps.push(updatedApp);
        } else {
            apps[editIndex] = updatedApp;
        }

        localStorage.setItem('therapist_appointments', JSON.stringify(apps));
        form.reset();
        modal.style.display = 'none';
        loadAppointments();
    });

    window.editAppointment = (index) => {
        const apps = JSON.parse(localStorage.getItem('therapist_appointments'));
        const app = apps[index];

        editIndex = index;
        
        // محاولة إيجاد البطل في القائمة المنسدلة بناءً على الإيميل أو الاسم (لدعم البيانات القديمة)
        let optionFound = false;
        for(let i=0; i<patientSelect.options.length; i++) {
            if(patientSelect.options[i].value === app.patientEmail || patientSelect.options[i].text === app.patient) {
                patientSelect.selectedIndex = i;
                optionFound = true;
                break;
            }
        }
        
        document.getElementById('appDate').value = app.date;
        document.getElementById('appTime').value = app.time;
        document.getElementById('appType').value = app.type;

        modalTitle.textContent = "تعديل الموعد ✏️";
        submitBtn.textContent = "تحديث البيانات 🔄";
        modal.style.display = 'flex';
    };

    window.deleteAppointment = (index) => {
        if(confirm('هل تريد إلغاء هذا الموعد؟')) {
            const apps = JSON.parse(localStorage.getItem('therapist_appointments'));
            apps.splice(index, 1);
            localStorage.setItem('therapist_appointments', JSON.stringify(apps));
            loadAppointments();
        }
    };

    loadAppointments();
});