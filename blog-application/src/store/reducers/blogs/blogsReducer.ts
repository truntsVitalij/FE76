import type { Blog } from "../../../types/blog";
import {
  DELETE_BLOG,
  FETCH_BLOG_LIST_STARTED,
  FETCH_BLOG_LIST_FINISHED,
  UPDATE_BLOG_LIST,
  type BlogAction,
} from "../../actions/blogs/blogsActions";

type BlogsState = {
  list: Blog[];
  isLoading: boolean;
};

const initialState: BlogsState = {
  isLoading: false,
  list: [],
};

export const blogsReducer = (
  state: BlogsState = initialState,
  action: BlogAction,
): BlogsState => {
  switch (action.type) {
    case UPDATE_BLOG_LIST:
      return {
        ...state,
        list: action.payload,
      };
    case DELETE_BLOG:
      return {
        ...state,
        list: state.list.filter((blog) => blog.id !== action.payload),
      };
    case FETCH_BLOG_LIST_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_BLOG_LIST_FINISHED:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
