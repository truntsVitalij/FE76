import {type RootState } from '../index';

export const loadLikes = (): Partial<RootState> => {
  const data = localStorage.getItem('likes');
  if (data) {
    try {
      const parsed = JSON.parse(data);
      if (typeof parsed === 'object' && parsed !== null) {
        return { likes: parsed };
      }
    } catch {
      localStorage.removeItem('likes');
    }
  }
  return {};
};

export const saveLikes = (state: RootState) => {
  localStorage.setItem('likes', JSON.stringify(state.likes));
};