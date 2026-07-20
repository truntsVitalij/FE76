// import { posts } from "../../data/Posts";

import {
    LIKE_POST,
    DISLIKE_POST,
    type PostsState,
    TOGGLE_FAVORITE,
    type PostsAction,
} from "../types/postsTypes";

const initialState: PostsState = {
    liked: [],
    disliked: [],
    favorites: [],
}

export const postsReducer = (
    state = initialState,
    action: PostsAction
): PostsState => {

    switch (action.type) {

        case LIKE_POST: {
            const isLiked = state.liked.includes (action.payload);
            return{
                ...state,
                liked: isLiked
                ? state.liked.filter (id => id !== action.payload)
                : [... state.liked, action.payload],

                disliked: state.disliked.filter (  // если поставили лайк — убрать дизлайк
                    id => id !== action.payload
                ),
            };
        }

        case DISLIKE_POST: {
            const isDisliked = state.disliked.includes(action.payload);
            return{
                ...state,
                disliked: isDisliked
                ? state.disliked.filter (id => id !== action.payload)
                :[...state.disliked, action.payload],

                liked: state.liked.filter (  // если поставили дизлайк — убрать лайк
                    id => id!== action.payload
                ),
            };
        }

        case TOGGLE_FAVORITE: {
            const isFavorite = state.favorites.includes(action.payload);
            return {
                ...state,
                favorites: isFavorite
                ? state.favorites.filter(id => id !== action.payload)
                :[...state.favorites, action.payload],
            };
        }
        default:
            return state

    }
}
