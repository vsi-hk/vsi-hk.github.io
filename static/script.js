function switchLang(lang) {
    // 切換所有帶語言標記的元素
    document.querySelectorAll('[class*="lang-"]').forEach(el => {
        el.classList.remove('lang-active', 'lang-inline-active');
    });
    
    const activeElements = document.querySelectorAll('.lang-' + lang);
    activeElements.forEach(el => {
        if (el.tagName === 'SPAN') {
            el.classList.add('lang-inline-active');
        } else {
            el.classList.add('lang-active');
        }
    });

    // 更新按鈕樣式
    ['zh', 'en', 'jp'].forEach(l => {
        const btn = document.getElementById('btn-' + l);
        if (l === lang) {
            btn.classList.add('text-blue-600', 'font-bold');
        } else {
            btn.classList.remove('text-blue-600', 'font-bold');
        }
    });
}
