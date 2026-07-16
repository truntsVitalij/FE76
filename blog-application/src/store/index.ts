import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { blogsReducer } from "./reducers/blogs/blogsReducer";
import { counterReducer } from "./reducers/counter/counterReducer";
import { useSelector, type TypedUseSelectorHook } from "react-redux";

const rootReducer = combineReducers({
  blogs: blogsReducer,
  counter: counterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
