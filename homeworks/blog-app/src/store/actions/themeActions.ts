import { SET_THEME, type ISetThemeAction } from '../types';

export const setTheme = (theme: 'light' | 'dark'): ISetThemeAction => ({
  type: SET_THEME,
  payload: theme,
});