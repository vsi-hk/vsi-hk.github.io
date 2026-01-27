const categoryTranslations = {
    'medical': { zh: '医疗', en: 'Medical', jp: '医療' },
    'communication': { zh: '通信', en: 'Communication', jp: '通信' },
    'audio': { zh: '音频', en: 'Audio', jp: 'オーディオ' },
    'custom': { zh: '其他定制', en: 'Custom', jp: 'その他カスタム' }
};

function switchLang(lang) {
    if (!['zh', 'en', 'jp'].includes(lang)) {
        lang = 'zh'; // Default language
    }
    
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;

    // Remove active classes from any currently active language elements
    document.querySelectorAll('.lang-active, .lang-inline-active').forEach(el => {
        el.classList.remove('lang-active', 'lang-inline-active');
    });

    // Add active classes to the elements of the selected language
    document.querySelectorAll('.lang-' + lang).forEach(el => {
        if (el.tagName === 'SPAN' || el.tagName === 'A' || el.tagName === 'BUTTON' || el.tagName === 'LABEL') {
            el.classList.add('lang-inline-active');
        } else {
            el.classList.add('lang-active');
        }
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
        const placeholderKey = 'placeholder_' + lang;
        detailsTextarea.placeholder = detailsTextarea.getAttribute(placeholderKey) || '';
    }

    // Update dropdown options
    const categoryDropdown = document.getElementById('category');
    if (categoryDropdown) {
        document.getElementById('cat-medical').textContent = categoryTranslations.medical[lang];
        document.getElementById('cat-communication').textContent = categoryTranslations.communication[lang];
        document.getElementById('cat-audio').textContent = categoryTranslations.audio[lang];
        document.getElementById('cat-custom').textContent = categoryTranslations.custom[lang];
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('language') || 'zh';
    switchLang(savedLang);

    // Form submission logic for the contact page
    const form = document.getElementById('contact-form');
    if (form) {
        const formSection = document.getElementById('contact-form-section');
        const successMessage = document.getElementById('success-message');

        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission
            if(formSection && successMessage) {
                formSection.classList.add('hidden');
                successMessage.classList.remove('hidden');
                window.scrollTo(0, 0); // Scroll to the top to show the message
            }
        });
    }

    // Custom file input logic
    const fileUpload = document.getElementById('file-upload');
    if (fileUpload) {
        const fileNameDisplay = document.getElementById('file-name-display');
        
        fileUpload.addEventListener('change', function() {
            const lang = localStorage.getItem('language') || 'zh';
            if (this.files.length > 0) {
                const fileName = this.files[0].name;
                // Set the text for all languages to the filename
                fileNameDisplay.querySelectorAll('span').forEach(span => {
                    span.textContent = fileName;
                });
            } else {
                // Reset to default "No file chosen" text
                fileNameDisplay.querySelector('.lang-zh').textContent = '未选择文件';
                fileNameDisplay.querySelector('.lang-en').textContent = 'No file chosen';
                fileNameDisplay.querySelector('.lang-jp').textContent = 'ファイルが選択されていません';
            }
            // Re-apply language to show the correct text
            switchLang(lang);
        });
    }
});