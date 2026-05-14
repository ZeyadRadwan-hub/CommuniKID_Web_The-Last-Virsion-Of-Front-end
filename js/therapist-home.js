// ==========================================
// منطق لوحة التحكم الرئيسية للأخصائي (Real Data)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const currentLang = localStorage.getItem('app_lang') || 'ar';
    
    if (!currentUser || currentUser.role !== 'therapist') {
        alert(currentLang === 'ar' ? "عذراً، هذه الصفحة مخصصة للأخصائيين فقط! 🛑" : "Sorry, this page is for therapists only! 🛑");
        window.location.href = 'login.html';
        return;
    }

    const docNameEl = document.getElementById('doctorName');
    if (docNameEl) docNameEl.textContent = currentUser.name || '';

    // ==========================================
    // 1. جلب عدد الحالات ونشاطهم
    // ==========================================
    let myPatients = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.includes('@')) {
            let u = JSON.parse(localStorage.getItem(key));
            if (u.role === 'parent' && u.doctorCode === currentUser.myDoctorCode) {
                myPatients.push(u);
            }
        }
    }
    
    document.getElementById('statPatients').textContent = myPatients.length;

    const tableBody = document.getElementById('recentActivityTable');
    if (tableBody) {
        tableBody.innerHTML = '';
        if(myPatients.length === 0) {
            let emptyMsg = currentLang === 'ar' ? "لا يوجد نشاط مسجل حتى الآن." : "No activity recorded yet.";
            tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#888;">${emptyMsg}</td></tr>`;
        } else {
            myPatients.forEach(p => {
                let pts = p.points || 0;
                let statusAr = pts > 200 ? "ممتاز" : (pts > 50 ? "جيد" : "يحتاج متابعة");
                let statusEn = pts > 200 ? "Excellent" : (pts > 50 ? "Good" : "Needs Follow-up");
                let status = currentLang === 'ar' ? statusAr : statusEn;
                
                let trackMsg = currentLang === 'ar' ? "جاري التتبع" : "Tracking";
                let statusClass = pts > 200 ? "status-good" : (pts > 50 ? "status-warning" : "status-danger");
                
                tableBody.innerHTML += `
                    <tr>
                        <td style="font-weight: bold;">${p.name}</td>
                        <td style="color: #f1c40f; font-weight: bold;">⭐ ${pts}</td>
                        <td style="color:#888;">${trackMsg}</td>
                        <td><span class="status-badge ${statusClass}">${status}</span></td>
                    </tr>
                `;
            });
        }
    }

    // ==========================================
    // 2. جلب مواعيد اليوم
    // ==========================================
    const allApps = JSON.parse(localStorage.getItem('therapist_appointments')) || [];
    let myApps = allApps.filter(a => a.doctorEmail === currentUser.email);
    let today = new Date().toISOString().split('T')[0]; 
    let todayApps = myApps.filter(a => a.date === today);

    document.getElementById('statSessions').textContent = todayApps.length;

    const sessionsList = document.getElementById('todaySessionsList');
    if (sessionsList) {
        sessionsList.innerHTML = '';
        if (todayApps.length === 0) {
            let noSessions = currentLang === 'ar' ? "لا توجد جلسات مسجلة لتاريخ اليوم." : "No sessions scheduled for today.";
            sessionsList.innerHTML = `<p style="color: #888; text-align: center;">${noSessions}</p>`;
        } else {
            todayApps.forEach(session => {
                let color = session.type.includes('أونلاين') || session.type.toLowerCase().includes('online') ? '#8e44ad' : '#2ecc71';
                
                let displayType = session.type;
                if (currentLang === 'en') {
                    if(session.type.includes('أونلاين')) displayType = 'Online 💻';
                    if(session.type.includes('في العيادة')) displayType = 'In Clinic 🏥';
                }

                sessionsList.innerHTML += `
                    <div style="background: var(--bg-color); border: 1px solid var(--border-color); padding: 15px; border-radius: 12px; border-right: 4px solid ${color};">
                        <h4 style="margin: 0 0 5px 0; color: var(--text-color);">${session.patient}</h4>
                        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: #888;">
                            <span>🕒 ${session.time}</span>
                            <span style="color: ${color}; font-weight:bold;">${displayType}</span>
                        </div>
                    </div>
                `;
            });
        }
    }

    // ==========================================
    // 3. جلب الرسائل (Dynamic Messages Count)
    // ==========================================
    const statMessagesEl = document.getElementById('statMessages');
    if (statMessagesEl) {
        let receivedMessagesCount = 0;
        let historyString = localStorage.getItem('chat_history');
        if (historyString) {
            let allMessages = JSON.parse(historyString);
            for (let chatKey in allMessages) {
                if (chatKey.startsWith(currentUser.email + "_")) {
                    let messages = allMessages[chatKey];
                    messages.forEach(msg => {
                        if (msg.sender === 'received') receivedMessagesCount++;
                    });
                }
            }
        }
        statMessagesEl.textContent = receivedMessagesCount;
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }
});