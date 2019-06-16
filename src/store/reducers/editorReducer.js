import data from "../_static_data/content";

const initState = {
  content: data.text,
  contentRendered: "",
  selectionStart: 0,
  selectionEnd: 0,
  scrollPos: 0,
  update: false
};

/** TODO: refactor reducer, use metaReducer like schema... */
const editorReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_STORE":
      return {
        ...state,
        content: action.payload.content,
        contentRendered: action.payload.contentRendered,
        selectionStart: action.payload.selectionStart,
        selectionEnd: action.payload.selectionEnd,
        update: action.payload.update
      };
    case "UPDATE_SELECTION":
      return {
        ...state,
        selectionStart: action.payload.selectionStart,
        selectionEnd: action.payload.selectionEnd
      };
    case "UPDATE_SCROLL":
      return {
        ...state,
        scrollPos: action.payload.scrollPos
      };
    default:
      break;
  }
  return state;
};

export default editorReducer;
