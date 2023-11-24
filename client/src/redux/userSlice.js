import { AUTH, LOGOUT } from "../constants/actionTypes";
import { user } from "../assets/data"; //Dummy data

const authReducer = (state = { authData: user }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };

    case LOGOUT:
      localStorage.clear();

      return { ...state, authData: null };

    default:
      return state;
  }
};

export default authReducer;
