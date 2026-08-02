import { LOGIN, LOGOUT, type ILoginAction, type ILogoutAction } from '../types';

export const login = (user: { email: string; name: string }): ILoginAction => ({
  type: LOGIN,
  payload: user,
});

export const logout = (): ILogoutAction => ({
  type: LOGOUT,
});