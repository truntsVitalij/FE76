import { SET_PREVIEW_IMAGE, CLEAR_PREVIEW_IMAGE, type ISetPreviewImageAction, type IClearPreviewImageAction } from '../types';

export const setPreviewImage = (imageUrl: string): ISetPreviewImageAction => ({
  type: SET_PREVIEW_IMAGE,
  payload: imageUrl,
});

export const clearPreviewImage = (): IClearPreviewImageAction => ({
  type: CLEAR_PREVIEW_IMAGE,
});