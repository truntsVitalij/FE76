import {
  CLOSE_PREVIEW,
  NEXT_PREVIEW,
  OPEN_PREVIEW,
  PREV_PREVIEW,
} from "../types/previewTypes";

export const openPreview = (id: number) => ({
  type: OPEN_PREVIEW,
  payload: id,
});

export const ClosePreview = () => ({
  type: CLOSE_PREVIEW,
});

export const NextPreview = () => ({
  type: NEXT_PREVIEW,
});

export const PrevPreview = () => ({
  type: PREV_PREVIEW,
});
