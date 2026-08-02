import { combineReducers, createStore } from "redux";

import { counterReducer } from "./reducers/counterReducer";
import { usersReducer } from "./reducers/usersReducer";
import { blogReducer } from "./reducers/blogReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  users: usersReducer,
  blog: blogReducer,
});

const store = createStore(rootReducer);

export default store;
