import { AUTH, LOGOUT, UPDATEPROFILE } from "../constants/actionTypes";
import { user } from "../assets/dummyData"; //Dummy data

const authReducer = (state = { user: user, edit: false }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, user: action?.data, edit: false };
    case LOGOUT:
      localStorage.clear();
      return { ...state, user: null, edit: false };
    case UPDATEPROFILE:
      return { ...state, edit: action?.data };
    default:
      return state;
  }
};

export default authReducer;
