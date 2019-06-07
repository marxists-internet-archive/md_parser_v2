const initState = {
  projectTitle: "NewProject",
  view: [2, 3]
};

const navReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_NAV":
      return {
        ...state,
        projectTitle: action.payload.projectTitle
      };
    case "UPDATE_VIEW":
      return {
        ...state,
        view: action.payload.view
      };
    default:
      break;
  }
  return state;
};

export default navReducer;
