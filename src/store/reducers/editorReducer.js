import data from "../_static_data/content";

const initState = {
  content: data.text,
  selectionStart: 0,
  selectionEnd: 0
};

const editorReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_STORE":
      return {
        ...state,
        content: action.payload.content,
        content: action.payload.contentRendered,
        selectionStart: action.payload.selectionStart,
        selectionEnd: action.payload.selectionEnd
      };
    case "UPDATE_SELECTION":
      return {
        ...state,
        selectionStart: action.payload.selectionStart,
        selectionEnd: action.payload.selectionEnd
      };
    default:
      break;
  }
  return state;
};

export default editorReducer;
