import { combineReducers } from "redux";
import editorReducer from "./editorReducer";
import navReducer from "./navReducer";
import metaReducer from "./metaReducer";

const rootReducer = combineReducers({
  editor: editorReducer,
  nav: navReducer,
  meta: metaReducer
});

export default rootReducer;
