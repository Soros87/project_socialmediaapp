import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signin = (formData, navigateTo) => async (dispatch) => {
  try {
    //login the user
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    //navigate to
    navigateTo("/");
  } catch (error) {
    console.log(error);
    // Display an alert if password or email doesn't match
    if (error.response && error.response.status === 404) {
      window.alert(
        "Email (not verified) or password is incorrect. Please try again."
      ); // Alert message
    }
  }
};

export const signup = (formData, navigateTo) => async (dispatch) => {
  try {
    //signup the user
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    //navigate to
    navigateTo("/login");
  } catch (error) {
    console.log(error);
    if (error.response && error.response.status === 400) {
      window.alert("Email already registered. Please login"); // Alert message
    }
  }
};
