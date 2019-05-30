import data from "../_static_data/content";

const initState = {
  content: data.text,
  selectionStart: 0
};

const editorReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_STORE":
      return {
        ...state,
        content: action.payload.content,
        selectionStart: action.payload.selectionStart
      };
    default:
      break;
  }
  return state;
};

export default editorReducer;
