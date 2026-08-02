import { ADD_FAVORITE, REMOVE_FAVORITE, SET_FAVORITES, type IAddFavoriteAction, type IRemoveFavoriteAction, type ISetFavoritesAction } from '../types';

export const addFavorite = (postId: number): IAddFavoriteAction => ({
  type: ADD_FAVORITE,
  payload: postId,
});

export const removeFavorite = (postId: number): IRemoveFavoriteAction => ({
  type: REMOVE_FAVORITE,
  payload: postId,
});

export const toggleFavorite = (postId: number, isFavorite: boolean) => {
  return isFavorite ? removeFavorite(postId) : addFavorite(postId);
};

export const setFavorites = (ids: number[]): ISetFavoritesAction => ({
  type: SET_FAVORITES,
  payload: ids,
});