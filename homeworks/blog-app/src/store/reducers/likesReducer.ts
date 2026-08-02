import { type AnyAction } from 'redux';
import { LIKE_POST, DISLIKE_POST } from '../types';

interface ILikesState {
  [postId: number]: {
    likes: number;
    dislikes: number;
  };
}

const initialState: ILikesState = {};

export const likesReducer = (state = initialState, action: AnyAction): ILikesState => {
  switch (action.type) {
    case LIKE_POST: {
      const postId = action.payload;
      return {
        ...state,
        [postId]: {
          ...state[postId],
          likes: (state[postId]?.likes || 0) + 1,
          dislikes: state[postId]?.dislikes || 0,
        },
      };
    }
    case DISLIKE_POST: {
      const postId = action.payload;
      return {
        ...state,
        [postId]: {
          ...state[postId],
          likes: state[postId]?.likes || 0,
          dislikes: (state[postId]?.dislikes || 0) + 1,
        },
      };
    }
    default:
      return state;
  }
};