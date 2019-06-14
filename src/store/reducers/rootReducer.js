import { combineReducers } from "redux";
import editorReducer from "./editorReducer";
import navReducer from "./navReducer";
import metaReducer, {dateAlertReducer} from "./metaReducer";

const rootReducer = combineReducers({
  editor: editorReducer,
  nav: navReducer,
  meta: metaReducer,
  date: dateAlertReducer
});

export default rootReducer;
