const initState = {
  renderedHtml: "test2"
};

const htmlReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_HTML":
      return {
        ...state,
        renderedHtml: action.payload.renderedHtml
      };
    default:
      break;
  }
  return state;
};

export default htmlReducer;
