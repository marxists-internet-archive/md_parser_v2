import { combineReducers } from "redux";
import editorReducer from "./editorReducer";
import navReducer from "./navReducer";
import metaReducer, { dateAlertReducer } from "./metaReducer";
import htmlReducer from "./htmlReducer";

const rootReducer = combineReducers({
  editor: editorReducer,
  nav: navReducer,
  meta: metaReducer,
  date: dateAlertReducer,
  html: htmlReducer
});

export default rootReducer;
