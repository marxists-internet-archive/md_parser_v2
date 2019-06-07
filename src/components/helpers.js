/**
 * @param {String} scrollableElemId - standart id selector format
 * for example jsAnchorNavigation('#preview') activates anchor navigation inside the #preview element.
 */
export const jsAnchorNavigation = scrollableElemId => {
  const elements = document.querySelectorAll(
    `${scrollableElemId} a[href^='#']`
  );

  elements.forEach(elem => {
    elem.addEventListener("click", event => {
      event.preventDefault();
      const target = document.getElementById(
        elem.hash.substring(1, elem.hash.length)
      );
      target.scrollIntoView({
        behavior: "auto",
        block: "nearest",
        inline: "start"
      });
    });
  });
};
