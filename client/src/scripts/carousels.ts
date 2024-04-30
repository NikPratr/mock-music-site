import { MusicList } from './MusicList';

const carousels: CarouselList = {
    reviews: {
        element: document.getElementById('reviews-carousel') as HTMLDivElement,
        autoscrollIncrement: 1,
        timer: 0,
        recentlyHovered: false,
        genericScrolling: true
    },
    articles: {
        element: document.getElementById('articles-carousel') as HTMLDivElement,
        autoscrollIncrement: -1,
        timer: 0,
        recentlyHovered: false,
        genericScrolling: true
    }
};
let heroTimer = 5000;
let heroRecentlyHovered = false;
let heroHorizontalIsScrolling = false;
let heroVerticalIsScrolling = false;

const heroVertical = document.getElementById('hero-vertical') as HTMLDivElement;
const heroHorizontal = document.getElementById('hero-horizontal') as HTMLDivElement;

export const animateCarousels = () => {
    Object.values(carousels).forEach((carousel) => {
        if(!carousel.genericScrolling) return;
        
        carousel.element.addEventListener('wheel', event => {
            event.preventDefault();
            scrollCarousel(carousel, event.deltaY);
        });

        carousel.element.addEventListener('mouseenter', () => {
            carousel.timer = 2000;
            carousel.recentlyHovered = true;
        });
        
        carousel.element.addEventListener('mouseleave', () => {
            carousel.recentlyHovered = false
        });
        
        autoscroll(carousel);
    });
    console.log('something');

    populateHeroHorizontal();
    cloneCarouselItems();
    animateHeroCarousels();
};

const scrollCarousel = (carouselContainer: Carousel, amount: number) => {
    const carousel = carouselContainer.element.children[0];
    const carouselWidth = carousel.clientWidth;

    if(carouselContainer.element.scrollLeft + amount <= 0 && amount < 0) {
        carouselContainer.element.scrollLeft += (amount + carouselWidth / 2 + Math.ceil(window.innerWidth * 0.0125));

    } else if(carouselContainer.element.scrollLeft + amount >= carouselWidth / 2 + Math.ceil(window.innerWidth * 0.0125) && amount > 0) {
        carouselContainer.element.scrollLeft += (amount - carouselWidth / 2 - Math.ceil(window.innerWidth * 0.0125));

    } else {
        carouselContainer.element.scrollLeft += amount;
    }
};

const autoscroll = (carousel: Carousel) => {
    if(carousel.timer > 0 && !carousel.recentlyHovered) {
        carousel.timer -= 20;
    } else if(carousel.timer <= 0 && !carousel.recentlyHovered) {
        scrollCarousel(carousel, carousel.autoscrollIncrement);
    }

    setTimeout(() => {
        autoscroll(carousel);
    }, 20);
};

const cloneCarouselItems = () => {
    // Fun alternative to Array.from(...)
    const carouselsToClone = [...document.querySelectorAll('.blog-carousel')] as HTMLDivElement[];
    const heroVertical = document.getElementById('hero-vertical') as HTMLDivElement;
    const heroHorizontal = document.getElementById('hero-horizontal') as HTMLDivElement;
    carouselsToClone.push(heroHorizontal, heroVertical);

    carouselsToClone.forEach(carousel => {
        [...carousel.children].forEach(child => {
            carousel.appendChild(child.cloneNode(true));
        })
    })
};

const populateHeroHorizontal = () => {
    const createFillerDivs = () => {
        while(heroHorizontal.children.length < 5) {
            const fillerDiv = document.createElement('div');
            fillerDiv.classList.add('album-compact-horizontal');
            fillerDiv.innerHTML = (heroHorizontal.children.length + 2).toString();

            heroHorizontal.appendChild(fillerDiv);
        }
    };

    console.log('something');
    MusicList.albums.forEach((album, index) => {
        const albumImg = document.createElement('img');
        albumImg.setAttribute('src', album.artwork);
        albumImg.setAttribute('alt', `Album art for ${album.artist}'s ${album.title}`);
        albumImg.classList.add('album-compact-horizontal');
        heroHorizontal.appendChild(albumImg);

        if(index === MusicList.albums.length) createFillerDivs();
    });
}

const animateHeroCarousels = () => {
    const heroCarousels = [heroVertical, heroHorizontal];

    heroVertical.scrollTop = heroVertical.scrollHeight;
    
    const scrollHeroHorizontal = (amount: number) => {
        if(heroHorizontalIsScrolling) return;
        heroHorizontalIsScrolling = true;
        
        const childWidth = heroHorizontal.firstElementChild?.getBoundingClientRect().width! + 10;
        const scrollDirectionModifier = (amount > 0 || amount > 0) ? 1 : -1;
        let scrollByAmount = childWidth * scrollDirectionModifier;

        if(heroHorizontal.scrollLeft + scrollByAmount < 0) {
            heroHorizontal.scrollLeft = heroHorizontal.children.length / 2 * childWidth;
        }
        if(heroHorizontal.scrollLeft + scrollByAmount > childWidth * heroHorizontal.children.length / 2) {
            heroHorizontal.scrollLeft = 0;
        }
        
        heroHorizontal.scrollTo({
            left: heroHorizontal.scrollLeft + scrollByAmount,
            behavior: "smooth"
        });
        
        setTimeout(() => {
            heroHorizontalIsScrolling = false;
        }, 250);
    };

    const scrollHeroVertical = (amount: number) => {
            if(heroVerticalIsScrolling) return;
            heroVerticalIsScrolling = true;
            
            const childHeight = heroVertical.firstElementChild?.getBoundingClientRect().height! + 10;
            const scrollDirectionModifier = (amount > 0 || amount > 0) ? 1 : -1;
            const maxScroll = Math.floor(heroVertical.scrollHeight - heroVertical.getBoundingClientRect().height);
            let scrollByAmount = childHeight * scrollDirectionModifier;

            if(heroVertical.scrollTop + scrollByAmount < 0) {
                heroVertical.scrollTop += heroVertical.children.length / 2 * childHeight;
            };
            if(heroVertical.scrollTop + scrollByAmount > maxScroll) {
                heroVertical.scrollTop = maxScroll - heroVertical.children.length / 2 * childHeight;
            };
            
            heroVertical.scrollTo({
                top: heroVertical.scrollTop + scrollByAmount,
                behavior: "smooth"
            });
            
            
            setTimeout(() => {
            heroVerticalIsScrolling = false;
            }, 250);
    }

    const autoScrollHeroCarousels = () => {
        if(heroTimer > 0 && !heroRecentlyHovered) {
            heroTimer -= 20;
        } else if(heroTimer <= 0 && !heroRecentlyHovered) {
            scrollHeroHorizontal(-1);
            scrollHeroVertical(-1);
            heroTimer = 5000;
        }

        setTimeout(() => {
            autoScrollHeroCarousels();
        }, 20);
    };
    
    heroHorizontal.addEventListener('wheel', event => {
        event.preventDefault();

        if(event.deltaY) {
            scrollHeroHorizontal(event.deltaY);
        };
        if(event.deltaX) {
            scrollHeroHorizontal(event.deltaX);
        };
    });
    
    heroVertical.addEventListener('wheel', event => {
        event.preventDefault();

        if(event.deltaY) {
            scrollHeroVertical(event.deltaY);
        };
        if(event.deltaX) {
            scrollHeroVertical(event.deltaX);
        };
    });

    heroCarousels.forEach(carousel => {
        carousel.addEventListener('mouseenter', () => {
            heroTimer = 5000;
            heroRecentlyHovered = true;
        });
        
        carousel.addEventListener('mouseleave', () => {
            heroRecentlyHovered = false
        });
    });

    autoScrollHeroCarousels();
}

type CarouselList = { [key: string]: Carousel };
type Carousel = {
    element: HTMLDivElement
    autoscrollIncrement: number
    timer: number
    recentlyHovered: boolean
    genericScrolling: boolean
};