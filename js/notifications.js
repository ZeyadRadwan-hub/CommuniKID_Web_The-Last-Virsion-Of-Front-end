document.addEventListener('DOMContentLoaded', () => {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) window.location.href = 'login.html';

    const daily = document.getElementById('notifDaily');
    const reports = document.getElementById('notifReports');
    const updates = document.getElementById('notifUpdates');

    // تحميل الإعدادات المحفوظة
    if (user.notifications) {
        daily.checked = user.notifications.daily;
        reports.checked = user.notifications.reports;
        updates.checked = user.notifications.updates;
    }

    document.getElementById('saveNotifBtn').addEventListener('click', () => {
        user.notifications = { daily: daily.checked, reports: reports.checked, updates: updates.checked };
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem(user.email, JSON.stringify(user));
        alert('تم حفظ إعدادات التنبيهات! 🔔');
    });
});