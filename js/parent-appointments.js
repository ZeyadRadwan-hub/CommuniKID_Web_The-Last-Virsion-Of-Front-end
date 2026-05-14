// ==========================================
// منطق صفحة المواعيد الخاصة بولي الأمر
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'parent') {
        window.location.href = 'login.html';
        return;
    }

    const appointmentsContainer = document.getElementById('parentAppointmentsContainer');
    const currentLang = localStorage.getItem('app_lang') || 'ar';

    function loadParentAppointments() {
        const allAppointments = JSON.parse(localStorage.getItem('therapist_appointments')) || [];
        
        appointmentsContainer.innerHTML = '';
        let hasAppointments = false;

        const txtDate = currentLang === 'ar' ? 'التاريخ:' : 'Date:';
        const txtTime = currentLang === 'ar' ? 'الوقت:' : 'Time:';
        const txtEmptyMsg = currentLang === 'ar' ? 
            `<div style="text-align: center; padding: 30px;">
                <p style="font-size: 1.2rem; color: #888;">لا توجد جلسات مجدولة لك حالياً.</p>
                <p style="font-size: 0.9rem; color: #aaa;">تأكد من أن الأخصائي قام بتحديد موعدك في الأجندة.</p>
            </div>` : 
            `<div style="text-align: center; padding: 30px;">
                <p style="font-size: 1.2rem; color: #888;">No sessions scheduled currently.</p>
                <p style="font-size: 0.9rem; color: #aaa;">Make sure the therapist has booked your appointment.</p>
            </div>`;

        allAppointments.forEach(app => {
            if (app.patientEmail === currentUser.email || app.patient.trim() === currentUser.name.trim()) {
                hasAppointments = true;
                
                let typeColor = app.type.includes('أونلاين') || app.type.toLowerCase().includes('online') ? '#8e44ad' : '#3498db';
                // محاولة ترجمة نوع الجلسة لو كانت مخزنة بالعربي فقط
                let displayType = app.type;
                if (currentLang === 'en') {
                    if(app.type.includes('أونلاين')) displayType = 'Online 💻';
                    if(app.type.includes('في العيادة')) displayType = 'In Clinic 🏥';
                }

                appointmentsContainer.innerHTML += `
                    <div class="parent-task-card" style="border-right-color: ${typeColor};">
                        <div class="task-info">
                            <h3 style="color: ${typeColor};">${displayType}</h3>
                            <p style="font-size: 1.1rem; margin-top: 5px; color: var(--text-color);">
                                <strong>${txtDate}</strong> ${app.date} <br>
                                <strong>${txtTime}</strong> ${app.time}
                            </p>
                        </div>
                        <div style="font-size: 3rem; opacity: 0.2;">
                            ${app.type.includes('أونلاين') || app.type.toLowerCase().includes('online') ? '💻' : '🏥'}
                        </div>
                    </div>
                `;
            }
        });

        if (!hasAppointments) {
            appointmentsContainer.innerHTML = txtEmptyMsg;
        }
    }

    loadParentAppointments();
});