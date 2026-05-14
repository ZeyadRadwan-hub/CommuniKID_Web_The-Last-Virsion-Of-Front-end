// ==========================================
// قاموس الترجمة الشامل 
// ==========================================
const translations = {
    ar: {
        welcome_title_login: "كوميوني-كيد 🚀", welcome_subtitle_login: "مرحباً بعودتك يا بطل!", login_btn: "تسجيل الدخول السريع", new_user: "أول مرة هنا؟", create_account_link: "أنشئ حساباً جديداً",
        welcome_title_signup: "انضم لعالمنا 🌟", welcome_subtitle_signup: "اختر نوع حسابك لنبدأ الرحلة", role_parent: "👨‍👩‍👦 ولي أمر", role_therapist: "👨‍⚕️ أخصائي", fullname_label: "الاسم بالكامل", fullname_placeholder: "أدخل اسمك", child_age_label: "سن الطفل", child_age_placeholder: "عمر الطفل بالسنوات", child_condition_label: "حالة البطل", cond_speech: "تأخر في النطق", cond_autism: "طيف توحد", specialty_label: "التخصص الدقيق", specialty_placeholder: "مثال: أخصائي تخاطب، تعديل سلوك", gender_label: "النوع", gender_male: "ذكر", gender_female: "أنثى", signup_btn: "إنشاء الحساب الآن", have_account: "لديك حساب بالفعل؟", login_link: "تسجيل الدخول", email_label: "البريد الإلكتروني", email_placeholder: "أدخل بريدك الإلكتروني", password_label: "كلمة المرور", password_placeholder: "أدخل كلمة المرور", doctor_code_label: "كود الأخصائي المعالج (اختياري)", doctor_code_placeholder: "أدخل كود الأخصائي لربط الحساب",
        back: "⬅️ رجوع", home_back: "⬅️ العودة للرئيسية", logout: "تسجيل الخروج 🚪", points: "نقطة", market: "🛒 الماركت", settings: "⚙️ الإعدادات", add_word: "➕ إضافة كارت", reports: "📈 التقارير",
        welcome: "أهلاً بك يا", hero_title: "اختار التصنيف 📚", sentence_placeholder: "اضغط على الكروت لتكوين جملة...", play_btn: "🔊 انطق الجملة", mic_btn: "🎤 جرب بصوتك", clear_btn: "🗑️ مسح",
        settings_title: "إعدادات العظمة ✨⚙️", settings_sub: "إدارة حسابك الشخصي وبيانات الأبطال", edit_profile: "تعديل الملف الشخصي ✏️", power_points: "نقطة قوة", days_streak: "يوم متواصل", logout_safe: "تسجيل الخروج الآمن",
        card_hero: "بيانات البطل", desc_hero: "تحرير اسم، عمر، وحالة طفلك الصحية", card_notify: "نظام التنبيهات", desc_notify: "إدارة إشعارات الجلسات والتقدم اليومي", card_privacy: "الخصوصية والأمان", desc_privacy: "حماية حسابك وتغيير كلمة المرور السرية", card_fav: "المفضلة", desc_fav: "الوصول السريع للكلمات التي يحبها بطلنا", card_achieve: "الإنجازات", desc_achieve: "استعراض كل الأوسمة التي حصل عليها البطل", card_premium: "الاشتراك المميز", desc_premium: "إدارة خطة الدفع والوصول للمحتوى الحصري",
        market_title: "خزانة ملابس البطل 🦸‍♂️", shirts: "التيشيرتات 👕", hats: "القبعات 👑", glasses: "النظارات 😎", buy: "شراء", owned: "تم الشراء ✅", equipped: "ملبوس ✔️", balance: "⭐ رصيدك:", rotate_hint: "(اسحب الشخصية بالماوس عشان تلفها! 🔄)",
        parent_tasks_btn: "المهام والواجبات 🎯", parent_appointments_btn: "مواعيد الجلسات 📅", parent_chat_btn: "رسائل الأخصائي 💬",
        nav_home: "الرئيسية", nav_patients: "مرضاي", nav_tasks: "المهام", nav_messages: "الرسائل", nav_appointments: "المواعيد",
        therapist_welcome: "أهلاً د.", therapist_sub: "إليك ملخص سريع لنشاط عيادتك اليوم.", total_cases: "إجمالي الحالات", today_sessions: "جلسات اليوم", unread_msgs: "رسائل غير مقروءة",
        latest_activity: "أحدث نشاط للأبطال 📈", hero_name_th: "اسم البطل", earned_points: "النقاط المكتسبة", completed_tasks: "المهام المنجزة", improvement_index: "مؤشر التحسن", view_all_cases: "عرض كل الحالات",
        privacy_title: "الخصوصية والأمان 🛡️", change_password_sub: "تغيير كلمة المرور", current_password: "كلمة المرور الحالية", new_password: "كلمة المرور الجديدة", confirm_password: "تأكيد كلمة المرور الجديدة", update_password_btn: "تحديث كلمة المرور 🔒",
        premium_title: "الاشتراك المميز 💳", premium_sub: "ارتقِ بمستوى بطلنا", premium_pro_title: "CommuniKID Pro ✨", premium_unlock: "افتح كل المميزات والكلمات الجديدة", premium_feat1: "✔️ تقييم النطق بالذكاء الاصطناعي", premium_feat2: "✔️ ملابس حصرية 3D في الماركت", premium_feat3: "✔️ تقارير تفصيلية تطبع للأخصائي", premium_feat4: "✔️ لا إعلانات وتجربة أسرع", subscribe_btn: "اشترك الآن بـ 9.99$ / شهر",
        achievements_title: "إنجازات البطل 🏅", achievements_sub: "الأوسمة التي حصدها بطلنا", total_points_achieve: "إجمالي النقاط:",
        notifications_title: "نظام التنبيهات 🔔", notifications_sub: "إدارة إشعارات الجلسات", notif_daily_title: "تذكير الجلسات اليومي", notif_daily_desc: "تنبيه بموعد تدريب البطل", notif_reports_title: "تقارير التقدم", notif_reports_desc: "إرسال تقرير أسبوعي بالمستوى", notif_market_title: "تحديثات الماركت", notif_market_desc: "إشعار عند إضافة ملابس جديدة", save_preferences_btn: "حفظ التفضيلات ✅",
        contact_therapist_title: "التواصل مع الأخصائي 💬", loading_chat: "جاري تحميل المحادثة...", type_message_therapist: "اكتب رسالتك للأخصائي هنا...", send_btn: "إرسال 🚀",
        favorites_title: "المفضلة ❤️", favorites_sub: "أكثر كلمات وجمل يحبها البطل", fav_sentences: "الجمل المفضلة 📝", fav_words: "الكلمات المفضلة 🔤",
        parent_appointments_title: "مواعيد الجلسات 📅", parent_appointments_sub: "تابع مواعيد جلساتك القادمة مع الأخصائي المعالج.", scheduled_sessions: "الجلسات المجدولة 🕒",
        hero_tasks_title: "مهام البطل 🎯", assign_tasks_sub: "هنا تجد التدريبات التي أرسلها الأخصائي المعالج للتدريب عليها في المنزل.",
        required_tasks: "المهام المطلوبة ⏳", completed_tasks_sec: "المهام المنجزة ✅",
        appointments_agenda: "أجندة المواعيد 📅", book_appointment: "➕ حجز موعد جديد", upcoming_sessions: "الجلسات القادمة",
        date_label: "التاريخ", time_label: "الوقت", session_type: "نوع الجلسة", in_clinic: "في العيادة 🏥", online_session: "أونلاين 💻", confirm_booking: "تأكيد الحجز ✅",
        chats_title: "المحادثات 💬", type_message: "اكتب رسالتك هنا...", 
        total_points: "إجمالي النقاط", days_streak: "أيام متواصلة",
        all_cards_btn: "📚 عرض كل الكروت", all_cards_title: "جميع الكلمات والجمل 🗂️",
        add_word_title: "إضافة كارت جديد ✨", select_category: "التصنيف", new_category_opt: "➕ إضافة تصنيف جديد...",
        new_cat_name_ar: "اسم التصنيف الجديد (عربي)", new_cat_name_en: "اسم التصنيف الجديد (إنجليزي)", new_cat_img: "صورة التصنيف (رابط)",
        word_ar_label: "الكلمة أو الجملة (عربي)", word_en_label: "الكلمة أو الجملة (إنجليزي)", img_label: "رابط الصورة",
        save_word_btn: "حفظ الكارت في النظام",
        plan_basic_title: "CommuniKID الأساسي 🥉", plan_basic_desc: "تجربة خالية من الإعلانات", feat_basic_1: "✔️ إزالة الإعلانات المزعجة", feat_basic_2: "✔️ سرعة أعلى في التحميل", feat_basic_3: "✔️ دعم فني سريع", btn_basic_price: "اشترك بـ 4.99$ / شهر",

        // --- إضافات الأخصائي الجديدة ---
        therapist_tasks_title: "إسناد مهام جديدة 📝",
        therapist_tasks_sub: "حدد التدريبات المطلوبة من الأبطال لتنفيذها في المنزل.",
        choose_hero: "اختار البطل",
        task_type_label: "نوع المهمة",
        task_full_cat: "تدريب على تصنيف كامل",
        task_sentence: "تكوين جملة معينة",
        task_content_label: "محتوى المهمة (التصنيف أو الجملة)",
        task_content_placeholder: "مثال: تصنيف الحيوانات أو 'أنا أريد تفاحة'",
        send_task_btn: "إرسال المهمة الآن 🚀",
        current_tasks_title: "المهام الحالية 📋",
        doc_settings_title: "إعدادات الحساب الشخصي ⚙️",
        doc_settings_sub: "تحديث بياناتك المهنية وكلمة المرور",
        your_doc_code: "🔑 كود الأخصائي الخاص بك",
        doc_code_help: "أرسل هذا الكود لأولياء الأمور لربط حساباتهم بك.",
        copy_code_btn: "نسخ الكود",
        prof_name_label: "الاسم المهني",
        specialty_label_settings: "التخصص",
        email_no_change: "البريد الإلكتروني (لا يمكن تغييره)",
        new_pass_label: "كلمة المرور الجديدة (اتركها فارغة إذا لم ترد التغيير)",
        save_settings_btn: "حفظ التغييرات ✅"
    },
    en: {
        welcome_title_login: "CommuniKID 🚀", welcome_subtitle_login: "Welcome back, Hero!", login_btn: "Quick Login", new_user: "First time here?", create_account_link: "Create a new account",
        welcome_title_signup: "Join Our World 🌟", welcome_subtitle_signup: "Choose your account type to start", role_parent: "👨‍👩‍👦 Parent", role_therapist: "👨‍⚕️ Therapist", fullname_label: "Full Name", fullname_placeholder: "Enter your name", child_age_label: "Child's Age", child_age_placeholder: "Age in years", child_condition_label: "Hero's Condition", cond_speech: "Speech Delay", cond_autism: "Autism Spectrum", specialty_label: "Specialty", specialty_placeholder: "e.g., Speech Therapist", gender_label: "Gender", gender_male: "Male", gender_female: "Female", signup_btn: "Create Account Now", have_account: "Already have an account?", login_link: "Login", email_label: "Email Address", email_placeholder: "Enter your email", password_label: "Password", password_placeholder: "Enter your password", doctor_code_label: "Therapist Code (Optional)", doctor_code_placeholder: "Enter therapist code to link account",
        back: "⬅️ Back", home_back: "⬅️ Back Home", logout: "Logout 🚪", points: "Points", market: "🛒 Market", settings: "⚙️ Settings", add_word: "➕ Add Card", reports: "📈 Reports",
        welcome: "Welcome, ", hero_title: "Choose Category 📚", sentence_placeholder: "Click cards to build a sentence...", play_btn: "🔊 Play Sentence", mic_btn: "🎤 Use Mic", clear_btn: "🗑️ Clear",
        settings_title: "Greatness Settings ✨⚙️", settings_sub: "Manage your personal account and heroes' data", edit_profile: "Edit Profile ✏️", power_points: "Power Points", days_streak: "Days Streak", logout_safe: "Safe Logout",
        card_hero: "Hero Data", desc_hero: "Edit child's name, age, and health status", card_notify: "Notification System", desc_notify: "Manage session alerts and daily progress", card_privacy: "Privacy & Security", desc_privacy: "Protect your account and change password", card_fav: "Favorites", desc_fav: "Quick access to the words our hero loves", card_achieve: "Achievements", desc_achieve: "Review all the medals the hero earned", card_premium: "Premium Subscription", desc_premium: "Manage payment plan and exclusive content",
        market_title: "Hero Wardrobe 🦸‍♂️", shirts: "Shirts 👕", hats: "Hats 👑", glasses: "Glasses 😎", buy: "Buy", owned: "Owned ✅", equipped: "Equipped ✔️", balance: "⭐ Balance:", rotate_hint: "(Drag the character to rotate! 🔄)",
        parent_tasks_btn: "Tasks & Duties 🎯", parent_appointments_btn: "Appointments 📅", parent_chat_btn: "Therapist Messages 💬",
        nav_home: "Home", nav_patients: "My Patients", nav_tasks: "Tasks", nav_messages: "Messages", nav_appointments: "Appointments",
        therapist_welcome: "Welcome Dr.", therapist_sub: "Here is a quick summary of your clinic's activity today.", total_cases: "Total Cases", today_sessions: "Today's Sessions", unread_msgs: "Unread Messages",
        latest_activity: "Heroes' Latest Activity 📈", hero_name_th: "Hero Name", earned_points: "Earned Points", completed_tasks: "Completed Tasks", improvement_index: "Improvement", view_all_cases: "View All Cases",
        privacy_title: "Privacy & Security 🛡️", change_password_sub: "Change Password", current_password: "Current Password", new_password: "New Password", confirm_password: "Confirm New Password", update_password_btn: "Update Password 🔒",
        premium_title: "Premium Subscription 💳", premium_sub: "Level up our hero", premium_pro_title: "CommuniKID Pro ✨", premium_unlock: "Unlock all features and new words", premium_feat1: "✔️ AI Speech Assessment", premium_feat2: "✔️ Exclusive 3D clothes in Market", premium_feat3: "✔️ Detailed printable therapist reports", premium_feat4: "✔️ Ad-free & faster experience", subscribe_btn: "Subscribe Now for $9.99 / mo",
        achievements_title: "Hero Achievements 🏅", achievements_sub: "Medals earned by our hero", total_points_achieve: "Total Points:",
        notifications_title: "Notification System 🔔", notifications_sub: "Manage session alerts", notif_daily_title: "Daily Session Reminder", notif_daily_desc: "Alert for hero's training time", notif_reports_title: "Progress Reports", notif_reports_desc: "Send weekly level report", notif_market_title: "Market Updates", notif_market_desc: "Alert when new clothes are added", save_preferences_btn: "Save Preferences ✅",
        contact_therapist_title: "Contact Therapist 💬", loading_chat: "Loading conversation...", type_message_therapist: "Type your message to the therapist here...", send_btn: "Send 🚀",
        favorites_title: "Favorites ❤️", favorites_sub: "Words and sentences our hero loves most", fav_sentences: "Favorite Sentences 📝", fav_words: "Favorite Words 🔤",
        parent_appointments_title: "Session Appointments 📅", parent_appointments_sub: "Track your upcoming sessions with the therapist.", scheduled_sessions: "Scheduled Sessions 🕒",
        hero_tasks_title: "Hero's Tasks 🎯", assign_tasks_sub: "Here you find the exercises sent by the therapist to practice at home.",
        required_tasks: "Required Tasks ⏳", completed_tasks_sec: "Completed Tasks ✅",
        appointments_agenda: "Appointments Agenda 📅", book_appointment: "➕ Book Appointment", upcoming_sessions: "Upcoming Sessions",
        date_label: "Date", time_label: "Time", session_type: "Session Type", in_clinic: "In Clinic 🏥", online_session: "Online 💻", confirm_booking: "Confirm Booking ✅",
        chats_title: "Chats 💬", type_message: "Type your message here...", 
        total_points: "Total Points", days_streak: "Days Streak",
        all_cards_btn: "📚 Show All Cards", all_cards_title: "All Words & Sentences 🗂️",
        add_word_title: "Add New Card ✨", select_category: "Category", new_category_opt: "➕ Add New Category...",
        new_cat_name_ar: "New Category Name (Ar)", new_cat_name_en: "New Category Name (En)", new_cat_img: "Category Image URL",
        word_ar_label: "Word / Sentence (Arabic)", word_en_label: "Word / Sentence (English)", img_label: "Image URL",
        save_word_btn: "Save Card",
        plan_basic_title: "CommuniKID Basic 🥉", plan_basic_desc: "Ad-free experience", feat_basic_1: "✔️ Remove all ads", feat_basic_2: "✔️ Faster loading", feat_basic_3: "✔️ Priority support", btn_basic_price: "Subscribe for $4.99 / mo",

        // --- New Therapist Additions ---
        therapist_tasks_title: "Assign New Tasks 📝",
        therapist_tasks_sub: "Define home training exercises for our heroes.",
        choose_hero: "Choose Hero",
        task_type_label: "Task Type",
        task_full_cat: "Train on full category",
        task_sentence: "Build specific sentence",
        task_content_label: "Task Content (Category or Sentence)",
        task_content_placeholder: "e.g., Animals category or 'I want apple'",
        send_task_btn: "Send Task Now 🚀",
        current_tasks_title: "Current Tasks 📋",
        doc_settings_title: "Profile Settings ⚙️",
        doc_settings_sub: "Update professional info and password",
        your_doc_code: "🔑 Your Specialist Code",
        doc_code_help: "Share this code with parents to link their accounts.",
        copy_code_btn: "Copy Code",
        prof_name_label: "Professional Name",
        specialty_label_settings: "Specialty",
        email_no_change: "Email Address (Cannot be changed)",
        new_pass_label: "New Password (Leave empty to keep current)",
        save_settings_btn: "Save Changes ✅"
    }
};

const langToggleBtn = document.getElementById('langToggle');
let currentLang = localStorage.getItem('app_lang') || 'ar';

function applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    if(langToggleBtn) langToggleBtn.textContent = lang === 'ar' ? 'EN' : 'عربي';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key]; 
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    localStorage.setItem('app_lang', lang);
    
    if (window.renderCategories) window.renderCategories();
    if (window.renderWords) window.renderWords();
    if (window.populateCategorySelect) window.populateCategorySelect();
    if (window.renderAllCards) window.renderAllCards();
}

if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        applyLanguage(currentLang);
    });
}

const themeToggleBtn = document.getElementById('themeToggle');
let currentTheme = localStorage.getItem('app_theme') || 'light';

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        if(themeToggleBtn) themeToggleBtn.textContent = '☀️';
    } else {
        document.body.removeAttribute('data-theme');
        if(themeToggleBtn) themeToggleBtn.textContent = '🌙';
    }
    localStorage.setItem('app_theme', theme);
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(currentTheme);
    });
}

window.playTTS = function(text, lang = currentLang) {
    if (!text) return;
    const tl = lang === 'ar' ? 'ar' : 'en';
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${tl}&q=${encodeURIComponent(text)}`;
    const audio = new Audio(url);
    audio.play().catch(err => {
        console.warn("Cloud TTS failed, falling back to local...", err);
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
        window.speechSynthesis.speak(utterance);
    });
};

function enforceSession() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const currentUrl = window.location.href.toLowerCase();
    const isPublicPage = currentUrl.includes('login') || currentUrl.includes('signup') || currentUrl.includes('index') || currentUrl.endsWith('/');

    if (!currentUser && !isPublicPage) {
        window.location.replace('login.html');
        return;
    }
    if (currentUser && isPublicPage) {
        if (currentUser.role === 'parent') window.location.replace('parent-home.html');
        else if (currentUser.role === 'therapist') window.location.replace('therapist-home.html');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    enforceSession();
    applyLanguage(currentLang);
    applyTheme(currentTheme);
});