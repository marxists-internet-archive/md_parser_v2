import { combineReducers } from "redux";
import editorReducer from "./editorReducer";
import navReducer from "./navReducer";

const rootReducer = combineReducers({
  editor: editorReducer,
  nav: navReducer
});

export default rootReducer;
