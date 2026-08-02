import { type RootState } from '../index';

export const loadAuth = (): Partial<RootState> => {
  const user = localStorage.getItem('user');
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (user && isLoggedIn === 'true') {
    try {
      return { auth: { user: JSON.parse(user), isLoggedIn: true } };
    } catch {
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
    }
  }
  return {};
};

export const saveAuth = (state: RootState) => {
  if (state.auth.user) {
    localStorage.setItem('user', JSON.stringify(state.auth.user));
    localStorage.setItem('isLoggedIn', 'true');
  } else {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
  }
};