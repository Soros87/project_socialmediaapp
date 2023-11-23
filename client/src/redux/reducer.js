import { combineReducers } from "redux";

import userSlice from "./userSlice";
import themeSlice from "./themeSlice";
import postSlice from "./postSlice";

export const rootReducer = combineReducers({
  user: userSlice,
  theme: themeSlice,
  post: postSlice,
});
