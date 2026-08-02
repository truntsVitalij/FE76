import { type AnyAction } from 'redux';
import { SET_PREVIEW_IMAGE, CLEAR_PREVIEW_IMAGE } from '../types';

interface IImagePreviewState {
  imageUrl: string | null;
}

const initialState: IImagePreviewState = {
  imageUrl: null,
};

export const imagePreviewReducer = (state = initialState, action: AnyAction): IImagePreviewState => {
  switch (action.type) {
    case SET_PREVIEW_IMAGE:
      return { imageUrl: action.payload };
    case CLEAR_PREVIEW_IMAGE:
      return { imageUrl: null };
    default:
      return state;
  }
};