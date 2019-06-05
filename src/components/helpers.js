/**
 * @param {string} scrollableElemId - standart id selector format
 * for example jsAnchorNavigation('#preview') activates anchor navigation inside the #preview element. 
 */
export const jsAnchorNavigation = (scrollableElemId) => {
    const elements = document.querySelectorAll(`${scrollableElemId} a[href^='#']`);
    elements.forEach(elem => {
      elem.addEventListener("click", (event) => {
        event.preventDefault();
        const linkedElem = document.getElementById(elem.hash.substring(1, elem.hash.length));
        /** TODO: replace scroll method */
        linkedElem.scrollIntoView();
      })
    });
}