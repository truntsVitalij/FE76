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

export const closePreview = () => ({
  type: CLOSE_PREVIEW,
});

export const nextPreview = () => ({
  type: NEXT_PREVIEW,
});

export const prevPreview = () => ({
  type: PREV_PREVIEW,
});
