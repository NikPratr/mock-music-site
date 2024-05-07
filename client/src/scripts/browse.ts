import { fadeContent } from "./generics";
import { addOptionsLogic, resizeSelectorTabs } from "./home";
import { addNavBar } from "./nav";

const suboptionList: SuboptionList = {
    genres: ['Electronic', 'Rock', 'Metal', 'Alternative', 'Rap', 'Punk', 'Folk', 'Pop', 'Ambient', 'Soundtrack', 'Jazz', 'Classical', 'Country', 'Indie'],
    moods: ['Chill', 'Blues', 'Focus', 'Motivation', 'Feel Good', 'Party', 'Work', 'Sleep', 'Energetic'],
    timePeriod: ['Recent', '10s', '00s', '90s', '80s', '70s', '60s', '50s', '40s'],
    popularity: ['Classics', 'Popular Now', 'Top 100s', 'Lesser known', 'New Artists'],
    recommended: [],
    newToYou: [],
    sellingNow: []
}
const activeFilter: ActiveFilter = {
    filterOption: '',
    filterSuboptions: []
}

const toCamelCase = (string: string) => {
    return string
        .replace(/[-_\s](.)/g, (_match, group) => group.toUpperCase())
        .replace(/^\w/, letter => letter.toLocaleLowerCase());
}

const onPageLoad = () => {
    fadeContent();
    addNavBar(document.body as HTMLBodyElement, 'browse');
    addOptionsLogic();
    addFilterLogic();
}

const addFilterLogic = () => {
    const filterOptionsLIs = [...(document.querySelector('.filter-options') as HTMLUListElement).children] as HTMLLIElement[];

    const filterSuboptions = document.querySelector('.filter-suboptions') as HTMLUListElement;

    filterOptionsLIs.forEach(optionLi => {
        const convertedOptionText = toCamelCase(optionLi.innerHTML);
            
        optionLi.addEventListener('click', () => {
            const activeFilterOption = filterOptionsLIs.find(child => child.classList.contains('filter-active')) as HTMLLIElement;
            filterSuboptions.style.opacity = '0';
            
            
            setTimeout(() => {
                while (filterSuboptions.firstChild) {
                    filterSuboptions.removeChild(filterSuboptions.firstChild);
                }

                if(activeFilterOption === optionLi) {
                    optionLi.classList.remove('filter-active');
                    activeFilter.filterOption = '';
                    activeFilter.filterSuboptions = [];
                } else if(activeFilterOption !== optionLi) {
                    activeFilterOption?.classList.remove('filter-active');
                    optionLi.classList.add('filter-active');
                    activeFilter.filterOption = convertedOptionText;
                    activeFilter.filterSuboptions = [];

                    convertedOptionText !== 'timePeriod' ? suboptionList[convertedOptionText].sort() : '';
                    suboptionList[convertedOptionText].forEach(suboption => {
                        const subOptionEl = document.createElement('li');
        
                        subOptionEl.addEventListener('click', () => {
                            subOptionEl.classList.toggle('filter-active');
                            subOptionEl.classList.contains('filter-active')
                                ? activeFilter.filterSuboptions.push(toCamelCase(subOptionEl.innerHTML))
                                : activeFilter.filterSuboptions = activeFilter.filterSuboptions.filter(filterSuboption => filterSuboption !== toCamelCase(subOptionEl.innerHTML));
                        })
                        subOptionEl.innerHTML = suboption;
                        filterSuboptions.append(subOptionEl);
                    });

                    filterSuboptions.style.opacity = '1';
                }
            }, 200);
        });
    });
}

if(window.location.href.indexOf('browse.html') > -1) {
    onPageLoad();
}
window.addEventListener('resize', resizeSelectorTabs);

type SuboptionList = { [key: string]: Suboptions };
type Suboptions = string[];

type ActiveFilter = {
    filterOption: string
    filterSuboptions: string[]
};