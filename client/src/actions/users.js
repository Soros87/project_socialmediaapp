import {
  FETCH_ALL,
  FETCH_POST,
  LIKE,
  COMMENT,
  REPLY,
  DELETE,
  UPDATEPROFILE,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const requestPasswordReset = (email) => async () => {
  try {
    await api.requestPasswordReset(email);
  } catch (error) {
    console.log(error);
    window.alert("Something went wrong. Please try again.");
  }
};

export const getUser = () => async (id) => {
  try {
    const { data } = await api.getUser(id);

    if (data?.message === "Authentication failed") {
      localStorage.removeItem("user");
      window.alert("User session expired. Login again.");
      window.location.replace("/login");
    }
    return data?.user;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(formData);
    dispatch({
      type: UPDATEPROFILE,
      payload: { data },
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendFriendRequest = () => async (reqTo) => {
  try {
    await api.friendRequest(reqTo);
  } catch (error) {
    console.log(error);
  }
};

export const getFriendRequest = () => async () => {
  try {
    const { data } = await api.getFriendRequest();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const acceptFriendRequest = () => async (id, status) => {
  try {
    const { user, friend } = await api.acceptFriendRequest({ rid: id, status });
    dispatch({
      type: UPDATEPROFILE,
      payload: { user },
    });
    return { user, friend };
  } catch (error) {
    console.log(error);
  }
};

export const viewProfile = () => async (id) => {
  try {
    await api.viewProfile(id);
  } catch (error) {
    console.log(error);
  }
};

export const suggestedFriends = () => async () => {
  try {
    const { data } = await api.suggestedFriends();
    return data;
  } catch (error) {
    console.log(error);
  }
};
