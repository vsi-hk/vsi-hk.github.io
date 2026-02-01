document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('close-menu');
if (menuBtn && mobileMenu) {
    menuBtn.onclick = (e) => {
        e.preventDefault();
        mobileMenu.classList.remove('hidden'); // Show full-screen mobile menu
        document.body.style.overflow = 'hidden'; // Stop scrolling
    };
}
if (closeBtn && mobileMenu) {
    closeBtn.onclick = () => {
        mobileMenu.classList.add('hidden'); // Hide mobile menu
        document.body.style.overflow = ''; // Resume scrolling
    };
}
});

window.switchLang = function(lang) {
    const allLangs = ['zh', 'en', 'jp'];
    const activeClass = 'text-blue-600';
    const inactiveClass = 'text-slate-500';

    allLangs.forEach(l => {
        document.querySelectorAll('.lang-' + l).forEach(el => {
            el.style.setProperty('display', 'none', 'important');
        });
    });
    document.querySelectorAll('.lang-' + lang).forEach(el => {
        el.style.setProperty('display', 'inline-block', 'important');
    });

    allLangs.forEach(l => {
        const btn = document.getElementById('btn-' + l);
        if (btn) {
            if (l === lang) {
                btn.classList.add(activeClass);
                btn.classList.remove(inactiveClass);
            } else {
                btn.classList.add(inactiveClass);
                btn.classList.remove(activeClass);
            }
        }
    });
};
switchLang('zh');