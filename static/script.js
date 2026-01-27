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
        // Use 'lang-inline-active' for span and other inline-like elements
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
}

document.addEventListener('DOMContentLoaded', function() {
    // On page load, get the saved language or default to Chinese
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
});