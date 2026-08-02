import { type  RootState } from '../index';

export const loadFavorites = (): Partial<RootState> => {
  const data = localStorage.getItem('favorites');
  if (data) {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return { favorites: { ids: parsed } };
      }
    } catch {
      localStorage.removeItem('favorites');
    }
  }
  return {};
};

export const saveFavorites = (state: RootState) => {
  localStorage.setItem('favorites', JSON.stringify(state.favorites.ids));
};