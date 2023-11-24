import { AUTH, LOGOUT } from "../constants/actionTypes";
import { user } from "../assets/data"; //Dummy data

const authReducer = (state = { user: user }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, user: action?.data };

    case LOGOUT:
      localStorage.clear();

      return { ...state, user: null };

    default:
      return state;
  }
};

export default authReducer;
