document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('close-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('open');
                document.body.style.overflow = 'hidden';
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    if (closeBtn && mobileMenu) {
        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    // Handle Solutions submenu toggle
    const solutionsToggle = document.getElementById('solutions-toggle');
    const solutionsSubmenu = document.getElementById('solutions-submenu');
    const solutionsToggleIcon = document.getElementById('solutions-toggle-icon');
    
    if (solutionsToggle && solutionsSubmenu) {
        solutionsToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const isHidden = solutionsSubmenu.classList.contains('hidden');
            if (isHidden) {
                solutionsSubmenu.classList.remove('hidden');
                solutionsToggleIcon.style.transform = 'rotate(180deg)';
            } else {
                solutionsSubmenu.classList.add('hidden');
                solutionsToggleIcon.style.transform = 'rotate(0deg)';
            }
        });
    }

    // Close mobile menu when clicking any link inside it
    mobileMenu && mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside of it
    document.addEventListener('click', (e) => {
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            // Check if click is outside menu and hamburger button
            if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            }
        }
    });

    // Initialize language from localStorage (fall back to zh)
    const stored = localStorage.getItem('site-lang');
    const defaultLang = stored || 'zh';
    window.switchLang(defaultLang);
});

window.switchLang = function(lang) {
    const allLangs = ['zh', 'en', 'jp'];
    if (!allLangs.includes(lang)) lang = 'zh';

    // Persist selection
    try { localStorage.setItem('site-lang', lang); } catch (e) { /* ignore */ }

    // Hide all language spans, then show selected
    allLangs.forEach(l => {
        document.querySelectorAll('.lang-' + l).forEach(el => {
            el.style.setProperty('display', 'none', 'important');
        });
    });
    document.querySelectorAll('.lang-' + lang).forEach(el => {
        el.style.setProperty('display', 'inline-block', 'important');
    });

    // Set active state on language buttons
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
        btn.classList.toggle('lang-btn--active', btn.dataset.lang === lang);
    });

    // Update option elements with data-lang attributes
    document.querySelectorAll('option[data-lang-en]').forEach(option => {
        const langKey = 'data-lang-' + lang;
        const text = option.getAttribute(langKey);
        if (text) {
            option.textContent = text;
        }
    });

    // Update language buttons (any element with data-lang-btn)
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
        const bLang = btn.getAttribute('data-lang');
        btn.classList.remove('lang-btn--active');
        btn.setAttribute('aria-pressed', 'false');
        if (bLang === lang) {
            btn.classList.add('lang-btn--active');
            btn.setAttribute('aria-pressed', 'true');
        }
    });
};
