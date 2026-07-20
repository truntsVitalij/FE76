import { 
    ADD_TO_FAVORITES, 
    REMOVE_TO_FAVORITES,
    SET_POSTS, 
    TOGGLE_LIKE, 
    TOGGLE_DISLIKE ,
    RESTORE_STATE
 } from '../actions/postAction';

interface PostState{
    favorites: any[];
    posts: any[];
    likedIds: number[];
    dislikedIds: number[];
}

const initialState: PostState = {
    favorites: [],
    posts: [],
    likedIds: [],
    dislikedIds: [],
};

export const postReducer = (state = initialState, action: any) => {
    console.log('Экшен:', action.type, 'Данные:', action.payload); //проверка
    console.log('Состояние до:', state); //проверка
    switch (action.type) {
        case ADD_TO_FAVORITES:
            return {
                ...state,
                favorites: [...state.favorites, action.payload],
            };
        case REMOVE_TO_FAVORITES:
            return {
                ...state,
                favorites: state.favorites.filter((post) => post.id !== action.payload)
            };
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload,
            };
        case TOGGLE_LIKE:
            return {
                ...state,
                likedIds: state.likedIds.includes(action.payload)
                    ? state.likedIds.filter((id: number) => id !== action.payload)
                    : [...state.likedIds, action.payload],
                    dislikedIds: state.dislikedIds.filter((id: number) => id !== action.payload),
            };
        case TOGGLE_DISLIKE:
            return {
                ...state,
                dislikedIds: state.dislikedIds.includes(action.payload)
                    ? state.dislikedIds.filter((id: number) => id !== action.payload)
                    : [...state.dislikedIds, action.payload],
                    likedIds: state.likedIds.filter((id: number) => id !== action.payload),
            };
        case RESTORE_STATE:
            return {
              ...state,
              favorites: action.payload.favorites,
              likedIds: action.payload.likedIds,
              dislikedIds: action.payload.dislikedIds,
            };        
        default:
            return state;
    }
};