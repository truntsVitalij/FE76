import { LIKE_POST, DISLIKE_POST, type ILikePostAction, type IDislikePostAction } from '../types';

export const likePost = (postId: number): ILikePostAction => ({
  type: LIKE_POST,
  payload: postId,
});

export const dislikePost = (postId: number): IDislikePostAction => ({
  type: DISLIKE_POST,
  payload: postId,
});