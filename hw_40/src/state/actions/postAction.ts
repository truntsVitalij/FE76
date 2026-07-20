import type { Post } from '../../pages/blog/types';

export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_TO_FAVORITES = 'REMOVE_TO_FAVORITES';
export const SET_POSTS = 'SET_POSTS';
export const TOGGLE_LIKE = 'TOGGLE_LIKE';
export const TOGGLE_DISLIKE = 'TOGGLE_DISLIKE';
export const RESTORE_STATE = 'RESTORE_STATE';
export const addToFavorite = (post: Post) => ({
    type: ADD_TO_FAVORITES,
    payload: post,
});

export const removeToFavorite = (id: number) => ({
    type: REMOVE_TO_FAVORITES,
    payload: id,
});

export const setPosts = (posts: any) => ({
    type: SET_POSTS,
    payload: posts,
});

export const toggleLike = (id: number) => ({
    type: TOGGLE_LIKE,
    payload: id,
});

export const toggleDislike = (id: number) => ({
    type: TOGGLE_DISLIKE,
    payload: id,
});

export const restoreState = (favorites: any[], likedIds: number[], dislikedIds: number[]) => ({
  type: RESTORE_STATE,
  payload: { favorites, likedIds, dislikedIds },
});