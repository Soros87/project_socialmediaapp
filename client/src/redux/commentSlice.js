import {
  FETCH_ALL,
  COMMENT,
  UPDATE,
  DELETE,
  LIKE,
  START_LOADING,
  END_LOADING,
  REPLY,
} from "../constants/actionTypes";
import { comments } from "../assets/dummyData"; //Dummy data

//function below is a reducer - a function that is able to process our message, our Action. A reducer takes the existing state and applies the message on it. The end result is a new state.
export default (state = { isLoading: false, comments: comments }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      //payload comes from posts.js in ../src/action
      return {
        ...state,
        comments: action.payload.data,
      };

    case COMMENT:
      return { ...state, comments: [...state.comments, action.payload] };

    case UPDATE:
    case LIKE:
      return {
        ...state,
        comments: state.comments.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case REPLY:
      return {
        ...state,
        comments: state.comments.map((post) => {
          if (post._id === +action.payload._id) {
            return action.payload;
          }
          return post;
        }),
      };
    case DELETE:
      return {
        ...state,
        comments: state.comments.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};
