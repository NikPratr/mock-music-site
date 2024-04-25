export const fadeContent = () => {
    setTimeout(() => {
            (document.querySelector('.content-hider') as HTMLDivElement).style.opacity = '0';
            setTimeout(() => {
                (document.querySelector('.content-hider') as HTMLDivElement).style.display = 'none';
            }, 250);
    }, 250);
}