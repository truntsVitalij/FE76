import { type AnyAction } from 'redux';
import { SET_POSTS } from '../types';
import type { IPost } from '../../types/post';

interface IPostsState {
  items: IPost[];
}

const initialState: IPostsState = {
  items: [],
};

export const postsReducer = (state = initialState, action: AnyAction): IPostsState => {
  switch (action.type) {
    case SET_POSTS:
      return { ...state, items: action.payload };
    default:
      return state;
  }
};