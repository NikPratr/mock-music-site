import { optionsOnClick } from "./home";

let open = true;

export const addNavBar = (body: HTMLBodyElement, tab?: string) => {
    const navBar = document.createElement('nav');
    navBar.innerHTML =
    `
        <div id="logo-small">Music Bench</div>

        <div id="nav-search">
            <input id="nav-search-input" type="text">
            <button id="nav-search-button">Search</button>
        </div>

        <ul id="nav-tabs" class="options-bar">
            <li class="options-bar-selector"></li>
            <li id="inspect-tab" class="nav-tab">Inspect Mode</li>
            <li id="home-tab" data-primary="${tab === 'home' ? 'true' : 'false'}" class="nav-tab">Home</li>
            <li id="browse-tab" data-primary="${tab === 'browse' ? 'true' : 'false'}" class="nav-tab">Browse</li>
            <li id="news-tab" data-primary="${tab === 'news' ? 'true' : 'false'}" class="nav-tab">News</li>
            <li id="shop-tab" data-primary="${tab === 'shop' ? 'true' : 'false'}" class="nav-tab">Merchandise</li>
            <li id="login-tab" data-primary="${tab === 'login' ? 'true' : 'false'}" class="nav-tab">Log In</li>
        </ul>
    `;

    document.addEventListener('wheel', event => {
        document.onscroll = () => {
            if(event.deltaY > 0) {
                navBar.style.top = '-10vh';
                open = false;
            }
            
            if(event.deltaY < 0) {
                navBar.style.top = '0';
                open = true;
            }
        }
    });

    document.addEventListener('mousemove', event => {
        const mouseY = event.clientY;
        if(mouseY <= window.innerHeight * 0.05) {
            navBar.style.top = '0';
        }
        
        if(mouseY > window.innerHeight * 0.10 && !open) {
            navBar.style.top = '-10vh';
        }
    });

    const handleTabSwap = (event: MouseEvent, tab: string) => {
        const contentHider = document.querySelector('.content-hider') as HTMLDivElement;
        contentHider.style.display = 'block';
        optionsOnClick(event);
        
        setTimeout(() => {
            contentHider.style.opacity = '1';
            optionsSelector.style.opacity = '0';

            setTimeout(() => {
                window.location.href = `${tab}.html`;
            }, 250);
        }, 250);
    }

    body.prepend(navBar);

    const optionsSelector = Array.from(navBar.children[2].children).find(child => child.classList.contains("options-bar-selector")) as HTMLLIElement;
    const browseTab = document.getElementById('browse-tab');
    const homeTab = document.getElementById('home-tab');
    browseTab?.addEventListener('click', event => handleTabSwap(event, 'browse'));
    homeTab?.addEventListener('click', event => handleTabSwap(event, 'home'));
}