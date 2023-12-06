import {
  CREATE,
  UPDATE, //TODO add update post functionality
  FETCH_ALL,
  FETCH_POST,
  LIKE,
  COMMENT,
  REPLY,
  DELETE,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

//Action Creators - functions that return actions
export const getPostById = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPostById(id);

    //with redux thunk instead of returning the action you have to dispatch the action
    //we can use dispatch because we implemented const dispatch = useDispatch() in app.jsx
    dispatch({
      type: FETCH_POST,
      payload: { data },
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostByUserId = (userId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPostByUserId(userId);

    //with redux thunk instead of returning the action you have to dispatch the action
    //we can use dispatch because we implemented const dispatch = useDispatch() in app.jsx
    dispatch({
      type: FETCH_POST,
      payload: { data },
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts();

    console.log("data", data);

    dispatch({
      type: FETCH_ALL,
      payload: { data },
    });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getComments = (postId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchComments(postId);

    dispatch({
      type: FETCH_ALL,
      payload: { data },
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const likePostComment =
  (id, rid = null) =>
  async (dispatch) => {
    try {
      const { data } = await api.likePostComment(id, rid);

      dispatch({ type: LIKE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const commentPost = (id) => async (dispatch) => {
  try {
    const { data } = await api.commentPost(id);

    dispatch({ type: COMMENT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const replyPostComment = (id) => async (dispatch) => {
  try {
    const { data } = await api.replyPostComment(id);

    dispatch({ type: REPLY, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
