import { THEME } from "../constants/actionTypes";
const themeReducer = (state = { theme: "light" }, action) => {
  switch (action.type) {
    case THEME:
      localStorage.setItem("theme", JSON.stringify({ ...action?.data }));
      return { ...state, theme: action?.data };
    default:
      return state;
  }
};

export default themeReducer;
