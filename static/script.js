const categoryTranslations = {
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

    // Update button styles in the language switcher
    ['zh', 'en', 'jp'].forEach(l => {
        const btn = document.getElementById('btn-' + l);
        if (btn) {
            if (l === lang) {
                btn.classList.add('text-blue-600', 'font-bold');
            } else {
                btn.classList.remove('text-blue-600', 'font-bold');
            }
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
            option.textContent = categoryTranslations[value][lang];
        }
    }

    // Update file input display
    const fileUpload = document.getElementById('file-upload');
    if (fileUpload) {
        updateFileNameDisplay(fileUpload);
    }
}

function updateFileNameDisplay(fileUpload) {
    const fileNameDisplay = document.getElementById('file-name-display');
    const lang = localStorage.getItem('language') || 'zh';

    if (fileUpload.files.length > 0) {
        fileNameDisplay.textContent = fileUpload.files[0].name;
    } else {
        const noFileChosenTexts = {
            zh: '未選擇文件',
            en: 'No file chosen',
            jp: 'ファイルが選択されていません'
        };
        fileNameDisplay.textContent = noFileChosenTexts[lang];
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('language') || 'zh';
    switchLang(savedLang);

    const form = document.getElementById('contact-form');
    if (form) {
        const formSection = document.getElementById('contact-form-section');
        const successMessage = document.getElementById('success-message');

        form.addEventListener('submit', function(e) {
            e.preventDefault(); 
            if(formSection && successMessage) {
                formSection.classList.add('hidden');
                successMessage.classList.remove('hidden');
                window.scrollTo(0, 0); 
            }
        });
    }

    const fileUpload = document.getElementById('file-upload');
    if (fileUpload) {
        fileUpload.addEventListener('change', function() {
            updateFileNameDisplay(this);
        });
    }
});