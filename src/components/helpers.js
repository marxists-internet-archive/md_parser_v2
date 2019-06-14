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
const _transformDate = (dateString, moment) => {
  moment.locale("ru");
  const ruMoment = moment(new Date(dateString));
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

/**
 * @param {String} dateInput - date from input field
 * @param {String} readableDateAlert - transformed date
 * 
 * @returns {Object} alert component settings as object
 */
const _prepareDateAlert = (dateInput, readableDateAlert) => {
  let date = {}
  const errorMessage = `Пожалуйста введите правильный формат числа! Например 1917 или 1917-11 или 1917-11-07`;

  if (!dateInput) {
    date = {
      alertVisibility: "invisible",
      alertVariant: "",
      alertResult: ""
    }
  } else if (readableDateAlert === "ERROR") {
    date = {
      alertVisibility: "visible",
      alertVariant: "danger",
      alertResult: errorMessage
    }
  } else if (readableDateAlert !== "") {
    date = {
      alertVisibility: "visible",
      alertVariant: "info",
      alertResult: readableDateAlert
    }
  }
  return date;
}

/**
 * Maps date input to alert object,
 * has to be passed to meta/dateAlertReducer
 * @param {String} dateString 
 * @param {Object} moment 
 */
export const renderDateAlert = (dateString, moment) => {
  const readableDate = _transformDate(dateString, moment);
  const dateAlertState = _prepareDateAlert(dateString, readableDate);
  return dateAlertState
}