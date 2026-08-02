import { type IPost } from "../types/post";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_THEME = 'SET_THEME';
export const SET_PREVIEW_IMAGE = 'SET_PREVIEW_IMAGE';
export const CLEAR_PREVIEW_IMAGE = 'CLEAR_PREVIEW_IMAGE';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const SET_POSTS = 'SET_POSTS';
export const SET_FAVORITES = 'SET_FAVORITES';
export const LIKE_POST = 'LIKE_POST';
export const DISLIKE_POST = 'DISLIKE_POST';


export interface ILikePostAction {
  type: typeof LIKE_POST;
  payload: number;
}

export interface IDislikePostAction {
  type: typeof DISLIKE_POST;
  payload: number;
}

export interface ILoginAction {
  type: typeof LOGIN;
  payload: { email: string };
}

export interface ILogoutAction {
  type: typeof LOGOUT;
}

export interface ISetThemeAction {
  type: typeof SET_THEME;
  payload: 'light' | 'dark';
}

export interface ISetPreviewImageAction {
  type: typeof SET_PREVIEW_IMAGE;
  payload: string;
}

export interface IClearPreviewImageAction {
  type: typeof CLEAR_PREVIEW_IMAGE;
}

export interface IAddFavoriteAction {
  type: typeof ADD_FAVORITE;
  payload: number;
}

export interface IRemoveFavoriteAction {
  type: typeof REMOVE_FAVORITE;
  payload: number;
}

export interface ISetFavoritesAction {
  type: typeof SET_FAVORITES;
  payload: number[];
}

export interface ISetPostsAction {
  type: typeof SET_POSTS;
  payload: IPost[]; 
}

export type LikesAction = ILikePostAction | IDislikePostAction;
export type PostsAction = ISetPostsAction;
export type ImagePreviewAction = ISetPreviewImageAction | IClearPreviewImageAction; 
export type AuthAction = ILoginAction | ILogoutAction;
export type ThemeAction = ISetThemeAction;
export type FavoritesAction = IAddFavoriteAction | IRemoveFavoriteAction | ISetFavoritesAction;

