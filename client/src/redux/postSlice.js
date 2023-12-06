import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  COMMENT,
} from "../constants/actionTypes";
// import { posts } from "../assets/dummyData"; //Dummy data

//function below is a reducer - a function that is able to process our message, our Action. A reducer takes the existing state and applies the message on it. The end result is a new state.
export default (state = { isLoading: false, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      //payload comes from posts.js in ../src/action

      return {
        ...state,
        posts: action.payload.data,
      };

    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload.data };

    case FETCH_POST:
      return { ...state, post: action.payload.data };

    case CREATE:
      return {
        ...state,
        posts: [...state.posts.posts, action.payload.data],
      };

    case UPDATE:
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === +action.payload._id) {
            return action.payload;
          }
          return post;
        }),
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};
