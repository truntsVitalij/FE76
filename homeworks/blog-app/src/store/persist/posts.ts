import {type RootState } from '../index';
import postsData from '../../data/posts';

export const loadPosts = (): Partial<RootState> => ({
  posts: { items: postsData },
});