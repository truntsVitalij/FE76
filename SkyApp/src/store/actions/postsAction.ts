import {
  LIKE_POST,
    DISLIKE_POST,
    TOGGLE_FAVORITE,
} from "../types/postsTypes";

export const likePost = (id: number) => ({
  type: LIKE_POST,
  payload: id,
});

export const dislikePost = (id: number) => ({
  type: DISLIKE_POST,
  payload: id,
});

export const toggleFavorite = (id: number) => ({
  type: TOGGLE_FAVORITE,
  payload: id,
});

