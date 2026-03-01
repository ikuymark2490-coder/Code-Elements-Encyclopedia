export class Router {
    constructor(routes, contentElement) {
        this.routes = routes;
        this.contentElement = contentElement;
        this.init();
    }

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    }

    handleRoute() {
        const hash = window.location.hash || '#/home';
        const [path, ...params] = hash.split('/').slice(1);
        
        const route = this.routes[path] || this.routes['home'];
        
        // Show loader before rendering
        this.contentElement.innerHTML = `
            <div class="loader-container">
                <div class="loader"></div>
            </div>
        `;

        setTimeout(() => {
            route(params);
            window.scrollTo(0, 0);
        }, 100);
    }
}

