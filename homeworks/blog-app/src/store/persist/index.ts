import { store, type RootState } from '../index';
import { loadAuth, saveAuth } from './auth';
import { loadTheme, saveTheme } from './theme';
import { loadFavorites, saveFavorites } from './favorites';
import { loadLikes, saveLikes } from './likes';
import { loadPosts } from './posts';


export const getPreloadedState = (): Partial<RootState> => ({
  ...loadAuth(),
  ...loadTheme(),
  ...loadFavorites(),
  ...loadLikes(),
  ...loadPosts(), 
});


export const syncStore = () => {
  let previousState = store.getState();

  store.subscribe(() => {
    const currentState = store.getState();

    if (currentState.auth !== previousState.auth) {
      saveAuth(currentState);
    }
    if (currentState.theme.theme !== previousState.theme.theme) {
      saveTheme(currentState);
    }
    if (currentState.favorites.ids !== previousState.favorites.ids) {
      saveFavorites(currentState);
    }
    if (currentState.likes !== previousState.likes) {
      saveLikes(currentState);
    }

    previousState = currentState;
  });
};