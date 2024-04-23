export const fadeContent = () => {
    setTimeout(() => {
            (document.querySelector('.content-hider') as HTMLDivElement).style.opacity = '0';
    }, 250);
}