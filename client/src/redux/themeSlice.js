import { THEME } from "../constants/actionTypes";
const themeReducer = (state = { theme: "light" }, action) => {
  switch (action.type) {
    case THEME:
      localStorage.setItem("theme", JSON.stringify({ ...action.payload }));
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

export default themeReducer;
