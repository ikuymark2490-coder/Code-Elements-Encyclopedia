import { i18n } from './data.js';

export class I18nManager {
    constructor() {
        this.lang = localStorage.getItem('app-lang') || 'en';
    }

    toggle() {
        this.lang = this.lang === 'en' ? 'th' : 'en';
        localStorage.setItem('app-lang', this.lang);
        this.apply();
        return this.lang;
    }

    get(key) {
        return i18n[this.lang][key] || key;
    }

    apply() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = this.get(key);
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = this.get(key);
        });

        const toggleBtn = document.getElementById('lang-toggle');
        if(toggleBtn) toggleBtn.textContent = this.lang.toUpperCase();
        
        document.documentElement.lang = this.lang;
    }
}

