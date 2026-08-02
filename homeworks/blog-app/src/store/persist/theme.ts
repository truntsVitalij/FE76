import { type RootState } from '../index';

export const loadTheme = (): Partial<RootState> => {
  const theme = localStorage.getItem('theme');
  if (theme === 'light' || theme === 'dark') {
    return { theme: { theme } };
  }
  return {};
};

export const saveTheme = (state: RootState) => {
  localStorage.setItem('theme', state.theme.theme);
};