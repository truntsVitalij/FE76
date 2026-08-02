import {type  AnyAction } from 'redux';
import { SET_THEME } from '../types';

interface ThemeState {
  theme: 'light' | 'dark';
}

const initialState: ThemeState = {
  theme: 'light',
};

export const themeReducer = (state = initialState, action: AnyAction): ThemeState => {
  switch (action.type) {
    case SET_THEME:
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};