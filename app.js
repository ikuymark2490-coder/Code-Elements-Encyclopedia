import { data } from './data.js';
import { Router } from './router.js';
import { I18nManager } from './i18n.js';

// --- Application State ---
const state = {
    theme: localStorage.getItem('theme') || 'light',
    i18n: new I18nManager()
};

// --- View Generators ---
const Views = {
    home: () => {
        const lang = state.i18n.lang;
        const main = document.getElementById('view-content');
        
        const langCards = data.languages.map(l => `
            <a href="#/language/${l.id}" class="card">
                <div class="card-icon">${l.icon}</div>
                <h3>${l.name}</h3>
                <p>${l.description[lang]}</p>
                <span class="badge badge-primary">${l.elementsCount} Elements</span>
            </a>
        `).join('');

        main.innerHTML = `
            <section class="hero">
                <h1>Code Elements Encyclopedia</h1>
                <p>${state.i18n.get('home_description') || 'A comprehensive guide to coding elements across multiple languages.'}</p>
            </section>

            <div class="stats-row grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <!-- Simple stats can go here -->
            </div>

            <h2 class="mb-4">${state.i18n.get('languages')}</h2>
            <div class="card-grid">
                ${langCards}
            </div>
        `;
    },

    language: (params) => {
        const langId = params[0];
        const langData = data.languages.find(l => l.id === langId);
        const categories = data.categories.filter(c => c.language === langId);
        const appLang = state.i18n.lang;

        const main = document.getElementById('view-content');
        
        if (!langData) {
            main.innerHTML = `<h2>Language not found</h2>`;
            return;
        }

        const categoryCards = categories.map(c => `
            <a href="#/category/${langId}/${c.id}" class="card">
                <h3>${c.name[appLang]}</h3>
                <p>${c.count} Items</p>
            </a>
        `).join('');

        main.innerHTML = `
            <div class="breadcrumb">
                <a href="#/home">${state.i18n.get('home')}</a> > ${langData.name}
            </div>
            <header class="lang-header py-8">
                <div class="flex items-center gap-4">
                    ${langData.icon}
                    <h1>${langData.name} Documentation</h1>
                </div>
                <p class="mt-4 text-muted">${langData.description[appLang]}</p>
            </header>
            <div class="card-grid">
                ${categoryCards}
            </div>
        `;
    },

    element: (params) => {
        const elId = params[0];
        const el = data.elements.find(e => e.id === elId);
        const appLang = state.i18n.lang;
        const main = document.getElementById('view-content');

        if (!el) {
            main.innerHTML = `<h2>Element not found</h2>`;
            return;
        }

        main.innerHTML = `
            <div class="breadcrumb">
                <a href="#/home">Home</a> > <a href="#/language/${el.language}">${el.language.toUpperCase()}</a> > ${el.name}
            </div>
            <article class="element-detail">
                <header class="detail-header">
                    <div class="flex justify-between items-start">
                        <h1>${el.name}</h1>
                        <button class="btn-icon" id="bookmark-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                        </button>
                    </div>
                    <div class="badge-group">
                        <span class="badge badge-primary">${el.version}</span>
                        ${el.deprecated ? '<span class="badge badge-deprecated">Deprecated</span>' : ''}
                    </div>
                </header>

                <section class="section">
                    <h3>Description</h3>
                    <p>${el.description[appLang]}</p>
                </section>

                <section class="section">
                    <h3>Syntax</h3>
                    <div class="code-block">
                        <pre><code>${el.syntax}</code></pre>
                        <button class="copy-btn" onclick="navigator.clipboard.writeText('${el.syntax}')">Copy</button>
                    </div>
                </section>

                ${el.example ? `
                    <section class="section">
                        <h3>Example</h3>
                        <div class="code-block">
                            <pre><code>${el.example}</code></pre>
                        </div>
                    </section>
                ` : ''}
            </article>
        `;
    },

    settings: () => {
        const main = document.getElementById('view-content');
        main.innerHTML = `
            <h1>${state.i18n.get('settings')}</h1>
            <div class="settings-list card mt-8">
                <div class="setting-item flex justify-between items-center py-4 border-b">
                    <div>
                        <strong>${state.i18n.get('language')}</strong>
                        <p class="text-muted">Choose your preferred language</p>
                    </div>
                    <button id="set-lang-btn" class="btn-icon w-auto px-4">${state.i18n.lang === 'th' ? 'ไทย' : 'English'}</button>
                </div>
                <div class="setting-item flex justify-between items-center py-4">
                    <div>
                        <strong>${state.i18n.get('appearance')}</strong>
                        <p class="text-muted">Dark or light mode</p>
                    </div>
                    <button id="set-theme-btn" class="btn-icon">
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle></svg>
                    </button>
                </div>
            </div>
        `;

        // Setting Listeners
        document.getElementById('set-lang-btn')?.addEventListener('click', () => {
            state.i18n.toggle();
            Views.settings();
        });
    }
};

// --- Initialization ---
const init = () => {
    // Theme setup
    if (state.theme === 'dark') document.body.classList.add('dark-mode');
    
    // UI Events
    document.getElementById('theme-toggle').addEventListener('click', () => {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', state.theme);
        
        // Toggle icons
        document.querySelector('.sun-icon').classList.toggle('hidden');
        document.querySelector('.moon-icon').classList.toggle('hidden');
    });

    document.getElementById('lang-toggle').addEventListener('click', () => {
        state.i18n.toggle();
        // Force refresh current view if needed
        const hash = window.location.hash;
        window.location.hash = '#/temp';
        window.location.hash = hash;
    });

    // Search Logic
    const searchInput = document.getElementById('global-search');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length < 2) return;
        
        // Mock search logic
        const results = data.elements.filter(el => 
            el.name.toLowerCase().includes(query) || 
            el.description[state.i18n.lang].toLowerCase().includes(query)
        );
        // Could show dropdown here
    });

    // Router Init
    const router = new Router({
        'home': Views.home,
        'language': Views.language,
        'element': Views.element,
        'settings': Views.settings
    }, document.getElementById('view-content'));

    state.i18n.apply();
};

window.addEventListener('DOMContentLoaded', init);

