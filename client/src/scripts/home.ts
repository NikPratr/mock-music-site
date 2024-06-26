import { Album, Song } from './Music';
import { MusicList } from './MusicList';
import { animateCarousels } from './carousels';
import { fadeContent } from './generics';
import { addNavBar } from './nav';

let oddTabRow = false;

export const optionsOnClick = (event: MouseEvent) => {
    const parentElement = event.currentTarget as HTMLLIElement;
    const clickedTab = event.target as HTMLLIElement;
    const optionsBar = clickedTab.parentElement as HTMLUListElement;
    const selector = Array.from(parentElement.children).find(element => element.classList.contains('options-bar-selector')) as HTMLLIElement;
    const clickedTabPosition = clickedTab.getBoundingClientRect().left - optionsBar.getBoundingClientRect().left;
    if (!clickedTab.classList.contains('options-bar') && selector && clickedTab != selector) {
        selector.style.left = `${clickedTabPosition}px`;
        selector.style.width = `${clickedTab.getBoundingClientRect().width}px`;
    }
}

const submitEmail = () => {
    const emailButton = document.getElementById('mail-button') as HTMLButtonElement;
    emailButton.addEventListener('click', () => window.alert('This doesn\'t actually do anything ¯\\_(ツ)_/¯'))
}

const displayAlbum = (album: Album) => {
    const featuredAlbum = document.getElementById('lpd-right')! as HTMLDivElement;

    const albumDivHTML = document.createElement('div');
    albumDivHTML.classList.add('featured-album');
    albumDivHTML.setAttribute('id', 'home-featured-album');
    albumDivHTML.innerHTML = `
        <img class="featured-album-art" src="${album.artwork}" alt="Album art for The ${album.artist}'s ${album.title}">
        <div class="featured-album-descriptors">
            <h2>${album.title}</h2>
            <h3>by: ${album.artist}</h3>
            <ul class="track-list">
                ${album.trackList.map((track, index) => {
        return `<li class="track-details">
                                    <p class="track-details-index">${index + 1}</p>
                                    <p class="track-details-name">${track.name}</p>
                                    <p class="track-details-length">${track.length}</p>
                                </li>`
    }).join('')}
            </ul>
        </div>
    `

    featuredAlbum.prepend(albumDivHTML);
}

export const resizeSelectorTabs = () => {
    const discoverOptions = Array.from(document.getElementsByClassName('options-bar')) as HTMLUListElement[];
    discoverOptions.forEach(optionsBar => {
        const primaryTab = Array.from(optionsBar.children).findIndex(child => (child as HTMLLIElement).dataset.primary === 'true') - 1;
        const childCount: number = optionsBar.childElementCount - 1;
        const optionsBarWidth = optionsBar.getBoundingClientRect().width;
        const selectorWidth = Math.round(optionsBarWidth / childCount);
        const selector = Array.from(optionsBar.children).find(element => element.classList.contains('options-bar-selector')) as HTMLLIElement;
        const leftPosition = primaryTab >= 0 ? primaryTab * selectorWidth : -2;
        selector.style.width = `${selectorWidth}px`;
        selector.style.left = `${leftPosition}px`;

        setTimeout(() => {
            selector.style.opacity = '1';
        }, 250);
    });
}

export const addOptionsLogic = () => {
    const discoverOptions = Array.from(document.getElementsByClassName('options-bar')) as HTMLUListElement[];
    resizeSelectorTabs();
    discoverOptions.forEach(optionsBar => {
        optionsBar.addEventListener('click', optionsOnClick)
    });
}

const addGenreLogic = () => {
    const genres = document.querySelectorAll('.genre');
    const observer = new IntersectionObserver(entries => {
        let delay = 200;
        const processedEntries = oddTabRow ? entries : entries.reverse();
        oddTabRow = !oddTabRow;

        processedEntries.forEach((entry) => {
            setTimeout(() => {
                if (entry.target.classList.contains('fade-in') && entry.intersectionRatio > 0) {
                    entry.target.classList.remove('fade-in');
                    observer.unobserve(entry.target);
                }
            }, delay);
            delay += 200;
        });
    });

    genres.forEach(entry => {
        observer.observe(entry);
    });
}

const onPageLoad = () => {
    fadeContent();
    MusicList.get();
    displayAlbum(MusicList.albums[0]);
    addNavBar(document.body as HTMLBodyElement, 'home');
    addOptionsLogic();
    addGenreLogic();
    submitEmail();

    animateCarousels();
}

document.addEventListener('DOMContentLoaded', () => {
    if(window.location.href.indexOf('home.html') > -1) {
        onPageLoad();
    }
});
window.addEventListener('resize', resizeSelectorTabs);