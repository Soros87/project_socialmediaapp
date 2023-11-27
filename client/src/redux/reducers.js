import { combineReducers } from "redux";

import userSlice from "./userSlice";
import postSlice from "./postSlice";
import themeSlice from "./themeSlice";
import commentSlice from "./commentSlice";

const rootReducer = combineReducers({
  user: userSlice,
  post: postSlice,
  theme: themeSlice,
  comment: commentSlice,
});

export default rootReducer;
