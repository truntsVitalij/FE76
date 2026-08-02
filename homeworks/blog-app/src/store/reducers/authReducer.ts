
import {type  AnyAction } from 'redux';
import { LOGIN, LOGOUT } from '../types';

interface IAuthState {
  isLoggedIn: boolean;
  user: { email: string; name: string } | null;
}

const initialState: IAuthState = {
  isLoggedIn: false,
  user: null,
};

export const authReducer = (state = initialState, action: AnyAction): IAuthState => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: true, user: action.payload };
    case LOGOUT:
      return { ...state, isLoggedIn: false, user: null };
    default:
      return state;
  }
};