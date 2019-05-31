const initState = {
  projectTitle: "NewProject"
};

const navReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_NAV":
      return {
        ...state,
        projectTitle: action.payload.projectTitle
      };
    default:
      break;
  }
  return state;
};

export default navReducer;
