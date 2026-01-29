document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('language') || 'zh';
    switchLang(savedLang);

    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    menuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
    });
});

const categoryTranslations = {
    '': { zh: '請選擇一個類別', en: 'Please select a category', jp: 'カテゴリを選択してください' },
    'medical': { zh: '醫療', en: 'Medical', jp: '医療' },
    'communication': { zh: '通信', en: 'Communication', jp: '通信' },
    'audio': { zh: '音頻', en: 'Audio', jp: 'オーディオ' },
    'custom': { zh: '其他訂製', en: 'Custom', jp: 'その他カスタム' }
};

function switchLang(lang) {
    if (!['zh', 'en', 'jp'].includes(lang)) {
        lang = 'zh'; // Default language
    }
    
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('[class*="lang-"]').forEach(el => {
        el.style.display = 'none';
    });

    document.querySelectorAll('.lang-' + lang).forEach(el => {
        el.style.display = 'inline';
    });

    // Update button styles in both desktop and mobile language switchers
    ['zh', 'en', 'jp'].forEach(l => {
        const btn = document.getElementById('btn-' + l);
        const mobileBtn = document.getElementById('btn-' + l + '-mobile');
        
        if (btn) {
            if (l === lang) {
                btn.classList.add('text-blue-600', 'font-bold');
            } else {
                btn.classList.remove('text-blue-600', 'font-bold');
            }
        }

        if (mobileBtn) {
            if (l === lang) {
                mobileBtn.classList.add('text-blue-600', 'font-bold');
            } else {
                mobileBtn.classList.remove('text-blue-600', 'font-bold');
            }
        }
    });

    // Update logo text
    document.querySelectorAll('.logo-text').forEach(el => {
        const text = el.getAttribute('data-' + lang);
        if (text) {
            el.textContent = text;
        }
    });

    // Special handling for form placeholders on the contact page
    const detailsTextarea = document.getElementById('details');
    if (detailsTextarea) {
        detailsTextarea.placeholder = detailsTextarea.getAttribute('placeholder-' + lang) || '';
    }

    // Update dropdown options
    const categoryDropdown = document.getElementById('category');
    if (categoryDropdown) {
        for (const option of categoryDropdown.options) {
            const value = option.value;
            if (categoryTranslations[value]) {
                option.textContent = categoryTranslations[value][lang];
            }
        }
    }
}