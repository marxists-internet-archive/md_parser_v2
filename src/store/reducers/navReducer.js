const initState = {
  projectTitle: "NewProject"
};

const navReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_STORE":
      return {
        ...state,
        content: action.payload.projectTitle
      };
    default:
      break;
  }
  return state;
};

export default navReducer;
