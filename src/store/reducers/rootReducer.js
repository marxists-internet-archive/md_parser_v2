import { combineReducers } from "redux";
import editorReducer from "./editorReducer";

const rootReducer = combineReducers({
  editor: editorReducer
});

export default rootReducer;
