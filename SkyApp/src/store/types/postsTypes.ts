export interface PostsState {
    liked: number[];
    disliked: number[];
    favorites: number[];
}

export const LIKE_POST = "posts/LIKE_POST";
export const DISLIKE_POST = "posts/DISLIKE_POST";
export const TOGGLE_FAVORITE = "posts/TOGGLE_FAVORITE";

interface LikePostAction {
  type: typeof LIKE_POST;
  payload: number;
}

interface DislikePostAction {
  type: typeof DISLIKE_POST;
  payload: number;
}

interface ToggleFavoriteAction {
  type: typeof TOGGLE_FAVORITE;
  payload: number;
}

export type PostsAction =
  | LikePostAction
  | DislikePostAction
  | ToggleFavoriteAction;