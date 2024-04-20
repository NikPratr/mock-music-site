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
    },
    newAlbums: {
        element: document.getElementById('new-carousel') as HTMLDivElement,
        autoscrollIncrement: -1,
        timer: 0,
        recentlyHovered: false,
        genericScrolling: false
    }
};
let newMusicCarouselScrolling = false;

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
    const heroVertical = document.getElementById('hot-carousel') as HTMLDivElement;
    const heroHorizontal = document.getElementById('new-carousel') as HTMLDivElement;
    carouselsToClone.push(heroHorizontal, heroVertical);

    carouselsToClone.forEach(carousel => {
        [...carousel.children].forEach(child => {
            carousel.appendChild(child.cloneNode(true));
        })
    })
};

const animateHeroCarousels = () => {
    const heroVertical = document.getElementById('hot-carousel') as HTMLDivElement;
    const heroHorizontal = document.getElementById('new-carousel') as HTMLDivElement;

    const scrollHeroHorizontal = (amount: number) => {
        if(newMusicCarouselScrolling) return;
        newMusicCarouselScrolling = true;
        
        const HCScrollLeft = heroHorizontal.scrollLeft;
        const childWidth = heroHorizontal.firstElementChild?.getBoundingClientRect().width! + 10;
        const scrollDirectionModifier = (amount > 0 || amount > 0) ? 1 : -1;
        const childIndex = Math.ceil(HCScrollLeft / childWidth);
        const nextChildIndex = childIndex + scrollDirectionModifier;
        const nextChild = heroHorizontal.children[nextChildIndex];
        
        if(nextChild) {
            heroHorizontal.scrollTo({
                left: childWidth * nextChildIndex,
                behavior: "smooth"
            });
        };
        
        setTimeout(() => {
            if(heroHorizontal.children.length / nextChildIndex === 2 && scrollDirectionModifier > 0) {
                heroHorizontal.scrollLeft = 0;
            }

            if((heroHorizontal.children.length / nextChildIndex) === Infinity && scrollDirectionModifier < 0) {
                heroHorizontal.scrollLeft = childWidth * heroHorizontal.children.length / 2;
            }
            newMusicCarouselScrolling = false;
        }, 250);
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
    
}

type CarouselList = { [key: string]: Carousel };

type Carousel = {
    element: HTMLDivElement
    autoscrollIncrement: number
    timer: number
    recentlyHovered: boolean
    genericScrolling: boolean
};

type CarouselTimers = {
    hoverDelay: number,
    autoScrollDelay?: number
};