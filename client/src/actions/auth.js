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
  }
};
