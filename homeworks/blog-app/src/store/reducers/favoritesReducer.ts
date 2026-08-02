import { type AnyAction } from 'redux';
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../types';

interface IFavoritesState {
  ids: number[];
}

const initialState: IFavoritesState = {
  ids: [],
};

export const favoritesReducer = (state = initialState, action: AnyAction): IFavoritesState => {
  switch (action.type) {
    case ADD_FAVORITE:
      if (state.ids.includes(action.payload)) return state;
      return { ...state, ids: [...state.ids, action.payload] };
    case REMOVE_FAVORITE:
      return { ...state, ids: state.ids.filter(id => id !== action.payload) };
    default:
      return state;
  }
};