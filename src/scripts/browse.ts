import { addOptionsLogic, resizeSelectorTabs } from "./home";
import { addNavBar } from "./nav";

const onPageLoad = () => {
    addNavBar(document.body as HTMLBodyElement, 'browse');
    addOptionsLogic();
}

document.addEventListener('DOMContentLoaded', onPageLoad);
window.addEventListener('resize', resizeSelectorTabs);