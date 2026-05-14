// ==========================================
// قاعدة البيانات الديناميكية (Data Store)
// ==========================================

// تم إيقاف سطر المسح لضمان عدم ضياع الكلمات التي يضيفها المستخدم!
// localStorage.removeItem('communikid_appData'); 

const defaultData = {
    categories: {
        "animals": {
            title_ar: "حيوانات",
            title_en: "Animals",
            thumbnail: "https://i.ibb.co/wjPtrmD/Animals.jpg",
            words: [
                { ar: "أسد", en: "Lion", image: "https://i.ibb.co/XffNnKHh/Lion.jpg" },
                { ar: "قطة", en: "Cat", image: "https://i.ibb.co/N2rj08TX/Cat.jpg" },
                { ar: "كلب", en: "Dog", image: "https://i.ibb.co/Kz9bjknR/Dog.jpg" },
                { ar: "فيل", en: "Elephant", image: "https://i.ibb.co/5hFx85VY/Elephant.jpg" },
                { ar: "عصفور", en: "Bird", image: "https://i.ibb.co/nN1507sT/Bird.jpg" }
            ]
        },
        "food": {
            title_ar: "أكل وشرب",
            title_en: "Food & Drinks",
            thumbnail: "https://i.ibb.co/gZFfmsPQ/Food-Drink.jpg",
            words: [
                { ar: "ماء", en: "Water", image: "https://i.ibb.co/3YFyjz0j/Water.jpg" },
                { ar: "تفاحة", en: "Apple", image: "https://i.ibb.co/nqLvgqF8/Apple.jpg" },
                { ar: "موز", en: "Banana", image: "https://i.ibb.co/0j686N73/Banana.jpg" },
                { ar: "خبز", en: "Bread", image: "https://i.ibb.co/GQJHNSxf/egyptian-baladi-bread.jpg" }
            ]
        },
        "feelings": {
            title_ar: "مشاعر",
            title_en: "Feelings",
            thumbnail: "https://i.ibb.co/tPZMSy3Q/Feeling.png",
            words: [
                { ar: "سعيد", en: "Happy", image: "https://i.ibb.co/q3Wz6XpN/Happy.jpg" },
                { ar: "حزين", en: "Sad", image: "https://i.ibb.co/bj7rDHCC/Sad.jpg" },
                { ar: "غاضب", en: "Angry", image: "https://i.ibb.co/tTvrq4FL/Angry.jpg" },
                { ar: "خائف", en: "Scared", image: "https://i.ibb.co/mrbzsvmM/Scared.jpg" }
            ]
        },
        "actions": {
            title_ar: "أفعال",
            title_en: "Actions",
            thumbnail: "https://i.ibb.co/ZR2Cxtxz/Actions.jpg",
            words: [
                { ar: "ألعب", en: "Play", image: "https://i.ibb.co/h0T9Hk6/Play.jpg" }, 
                { ar: "أنام", en: "Sleep", image: "https://i.ibb.co/tw6YTp06/Sleep.jpg" },
                { ar: "أشرب", en: "Drink", image: "https://i.ibb.co/FLL7zghb/Drink.jpg" }
            ]
        }
    }
};

// تحميل البيانات المحفوظة في المتصفح أو استخدام البيانات الافتراضية
let savedAppData = localStorage.getItem('communikid_appData');
let appData;

if (savedAppData != null) {
    appData = JSON.parse(savedAppData);
} else {
    appData = defaultData;
}

// دالة عشان نحفظ البيانات بعد ما نضيف كلمة جديدة
function saveAppDataToStorage() {
    localStorage.setItem('communikid_appData', JSON.stringify(appData));
}