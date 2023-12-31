import { AUTH, LOGOUT, UPDATEPROFILE } from "../constants/actionTypes";
// import { user } from "../assets/dummyData"; //Dummy data

const authReducer = (state = { user: null, edit: false }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, user: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, user: null };
    case UPDATEPROFILE:
      return { ...state, edit: action?.payload };
    default:
      return state;
  }
};

export default authReducer;
