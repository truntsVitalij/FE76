import { combineReducers } from "redux";
import { previewReducer } from "./previewReduser";
import { postsReducer } from "./postsReducer";

export const rootReducer = combineReducers({
  preview: previewReducer,
  posts: postsReducer,
});

// import { useDispatch, UseDispatch, useSelector } from "react-redux";
// // --------------REDUx----------
// const initialSatate = { count: 0};
// const state = useSelector((state) => state);
// const dispatch = useDispatch();
// const reducer = (state = initialSatate, action) => {
// }   //функция , action - набор параметров,
