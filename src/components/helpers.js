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

/**
 * @returns {String} formatted Date || "ERROR"
 * @param {String} - dateString
 * @param {object} - moment Object
 * @requires moment -
 * [import moment from "moment";]
 * [import "moment/locale/ru";]
 *
 * formatting possibilities:
 * YYYY
 * YYYY-MM
 * YYYY-MM-DD
 */
export const transformDate = (dateString, moment) => {
  moment.locale("ru");
  const ruMoment = moment(dateString);

  let result = "";
  if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    result = ruMoment.format("LL");
  } else if (dateString.match(/^\d{4}-\d{2}$/)) {
    result = ruMoment.format("MMMM YYYY");
  } else if (dateString.match(/^\d{4}$/)) {
    result = ruMoment.format("YYYY") + "-й";
  } else {
    result = "ERROR";
  }
  return result;
};
