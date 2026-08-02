import { SET_POSTS, type ISetPostsAction } from '../types';
import type { IPost } from '../../types/post';

export const setPosts = (posts: IPost[]): ISetPostsAction => ({
  type: SET_POSTS,
  payload: posts,
});