document.addEventListener('DOMContentLoaded', () => {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) { window.location.href = 'login.html'; return; }

    const points = user.points || 0;
    const words = user.wordsSpoken || 0; 

    const totalPointsEl = document.getElementById('totalPoints');
    const totalWordsEl = document.getElementById('totalWords');
    if(totalPointsEl) totalPointsEl.textContent = points;
    if(totalWordsEl) totalWordsEl.textContent = words;

    // ==========================================
    // 1. رسم الرسم البياني (Chart.js)
    // ==========================================
    const ctxEl = document.getElementById('progressChart');
    if (ctxEl) {
        const ctx = ctxEl.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4 (الحالي)'],
                datasets: [{
                    label: 'معدل التفاعل (النقاط)',
                    data: points === 0 ? [0,0,0,0] : [points * 0.2, points * 0.5, points * 0.8, points],
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.2)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { font: { family: 'Cairo' } } } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    // ==========================================
    // 2. محاكاة الذكاء الاصطناعي وإخفاء التقارير حسب الـ Role
    // ==========================================
    const parentReport = document.getElementById('parentReport');
    const doctorReport = document.getElementById('doctorReport');
    
    // إخفاء التقرير الغير مناسب لصلاحية المستخدم الحالي
    if (parentReport && doctorReport) {
        const parentSection = parentReport.closest('.report-section');
        const doctorSection = doctorReport.closest('.report-section');
        
        if (user.role === 'parent') {
            if (doctorSection) doctorSection.style.display = 'none';
        } else if (user.role === 'therapist') {
            if (parentSection) parentSection.style.display = 'none';
        }
    }

    const currentLang = localStorage.getItem('app_lang') || 'ar';

    if (currentLang === 'en') {
        if(document.getElementById('progTitle')) document.getElementById('progTitle').textContent = "Progress & Reports";
        if(document.getElementById('progSub')) document.getElementById('progSub').textContent = "AI-powered weekly insights";
        if(document.getElementById('progBack')) document.getElementById('progBack').textContent = "⬅️ Back Home";
        if(document.getElementById('progOverview')) document.getElementById('progOverview').textContent = "Hero's Performance Overview 🦸‍♂️";
        if(document.getElementById('lblPoints')) document.getElementById('lblPoints').textContent = "Total Points";
        if(document.getElementById('lblWords')) document.getElementById('lblWords').textContent = "Words Spoken";
        if(document.getElementById('lblStreak')) document.getElementById('lblStreak').textContent = "Days Streak";
        if(document.getElementById('progParentTitle')) document.getElementById('progParentTitle').textContent = "Parent Report 👨‍👩‍👦";
        if(document.getElementById('progDoctorTitle')) document.getElementById('progDoctorTitle').textContent = "Therapist Report 👨‍⚕️";
    }

    if (words === 0 && points === 0) {
        const emptyMsg = currentLang === 'ar' ? 
            "<div class='empty-state'>⚠️ لا توجد بيانات كافية لإصدار التقرير حتى الآن. يُرجى تشجيع البطل على تكوين الجمل ونطقها لجمع النقاط.</div>" : 
            "<div class='empty-state'>⚠️ Not enough data to generate a report yet. Encourage the hero to build and pronounce sentences.</div>";
        if(parentReport) parentReport.innerHTML = emptyMsg;
        if(doctorReport) doctorReport.innerHTML = emptyMsg;
        return; 
    }

    const improvement = Math.min(100, Math.floor(20 + (words * 0.5))); 
    const normalcy = Math.min(100, Math.floor(10 + (words * 0.3)));

    if (currentLang === 'ar') {
        let pText = `مرحباً يا بطلنا! خلال هذا الأسبوع، نطق طفلك <strong>${words} كلمة</strong> وحقق تفاعلاً رائعاً وجمع <strong>${points} نقطة</strong>. 🌟<br><br>`;
        pText += `📊 <strong>نسبة التحسن في النطق:</strong> زادت بمقدار <span style="color:#27ae60; font-weight:bold;">${improvement}%</span> مقارنة بالشهر الماضي.<br>`;
        pText += `🗣️ <strong>التواصل الطبيعي:</strong> أصبح يتفاعل بجمل مقاربة للأطفال في مثل عمره بنسبة <span style="color:#2980b9; font-weight:bold;">${normalcy}%</span>.<br>`;
        pText += `<br><strong>💡 نصيحة للأسرة:</strong> استمروا في تشجيعه، وحاولوا التركيز على تصنيف (المشاعر) هذا الأسبوع.`;
        if(parentReport) parentReport.innerHTML = pText;

        let dText = `<strong>📝 تقرير الحالة رقم: #8843</strong><br>`;
        dText += `الطفل: ${user.name} | الحالة المسجلة: ${user.childCondition || 'غير محددة'}<br><br>`;
        if (words < 20) {
            dText += `⚠️ <strong>تحليل النظام العلاجي:</strong> معدل تفاعل الطفل منخفض (${words} كلمة فقط). <br><strong>توصية الذكاء الاصطناعي:</strong> يُنصح بزيادة الجلسات الأسبوعية وتفعيل نظام المكافآت المرئية لكسر حاجز الخجل.`;
        } else if (words < 100) {
            dText += `✅ <strong>تقدم مستقر:</strong> أداء الطفل ضمن المعدل الطبيعي للعلاج. <br><strong>توصية الذكاء الاصطناعي:</strong> إدراج مهام (أفعال مركبة) في الجلسة القادمة لزيادة طول الجملة.`;
        } else {
            dText += `🚀 <strong>تطور ممتاز:</strong> الطفل يتجاوز الأهداف العلاجية المحددة. <br><strong>توصية الذكاء الاصطناعي:</strong> التركيز في الجلسة القادمة على مهارات (السرد القصصي) بدلاً من الكلمات المفردة.`;
        }
        if(doctorReport) doctorReport.innerHTML = dText;
    } else {
        let pText = `Hello! This week, your child spoke <strong>${words} words</strong> and earned <strong>${points} points</strong>. 🌟<br><br>`;
        pText += `📊 <strong>Speech Improvement:</strong> Increased by <span style="color:#27ae60; font-weight:bold;">${improvement}%</span> compared to last month.<br>`;
        pText += `🗣️ Natural Communication: Reached ${normalcy}%</span> matching their age group.<br>`;
        pText += `<br><strong>💡 Family Tip:</strong> Keep encouraging them, and focus on the 'Feelings' category this week.`;
        if(parentReport) parentReport.innerHTML = pText;

        let dText = `<strong>📝 Clinical Report: #8843</strong><br>`;
        dText += `Patient: ${user.name} | Condition: ${user.childCondition || 'Unspecified'}<br><br>`;
        if (words < 20) {
            dText += `⚠️ <strong>Analysis:</strong> Low interaction rate (${words} words). <br><strong>AI Recommendation:</strong> Increase home sessions and activate visual rewards.`;
        } else if (words < 100) {
            dText += `✅ <strong>Analysis:</strong> Stable performance and good response rate. <br><strong>AI Recommendation:</strong> Start incorporating complex verbs to increase sentence length.`;
        } else {
            dText += `🚀 Analysis: Excellent progress exceeding therapy goals. AI Recommendation: Move to storytelling skills instead of single words.`;
        }
        if(doctorReport) doctorReport.innerHTML = dText;
    }
});