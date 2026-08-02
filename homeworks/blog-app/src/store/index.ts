import { createStore, combineReducers } from 'redux';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import {
  authReducer,
  themeReducer,
  favoritesReducer,
  imagePreviewReducer,
  postsReducer,
  likesReducer,
} from './reducers';
import { getPreloadedState, syncStore } from './persist';

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  imagePreview: imagePreviewReducer,
  favorites: favoritesReducer,
  posts: postsReducer,
  likes: likesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const preloadedState = getPreloadedState();
export const store = createStore(rootReducer, preloadedState);

syncStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;