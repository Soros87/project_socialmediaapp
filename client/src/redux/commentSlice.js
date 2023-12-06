import {
  FETCH_ALL_COMMENT,
  COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  LIKE_COMMENT,
  START_LOADING_COMMENT,
  END_LOADING_COMMENT,
  REPLY_COMMENT,
} from "../constants/actionTypes";
// import { comments } from "../assets/dummyData"; //Dummy data

//function below is a reducer - a function that is able to process our message, our Action. A reducer takes the existing state and applies the message on it. The end result is a new state.
export default (state = { isLoading: false, comments: [] }, action) => {
  switch (action.type) {
    case START_LOADING_COMMENT:
      return { ...state, isLoading: true };
    case END_LOADING_COMMENT:
      return { ...state, isLoading: false };
    case FETCH_ALL_COMMENT:
      //payload comes from posts.js in ../src/action
      return {
        ...state,
        comments: action.payload.data,
      };

    case COMMENT:
      return { ...state, comments: [...state, action.payload] };

    case UPDATE_COMMENT:
    case LIKE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case REPLY_COMMENT:
      return {
        ...state,
        comments: state.comments.map((post) => {
          if (post._id === +action.payload._id) {
            return action.payload;
          }
          return post;
        }),
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};
