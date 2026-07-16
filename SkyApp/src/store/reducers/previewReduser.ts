// Reducer — это единственное место, где изменяется state

import { posts } from "../../data/Posts";
import {
  CLOSE_PREVIEW,
  NEXT_PREVIEW,
  OPEN_PREVIEW,
  PREV_PREVIEW,
  type PreviewAction,
  type PreviewState,
} from "../types/previewTypes";

const initialState: PreviewState = {  //первое состояние Redux, сост. по умолчанию: попап закрыт, картинка не выбрана
  isOpen: false,
  currentPostId: null,
};

export const previewReducer = ( //Создаем f
  state = initialState,  
  action: PreviewAction,
): PreviewState => {
  switch (action.type) {  //Switch проверяет Какой Action пришел?
    case OPEN_PREVIEW:
      return {  //Reducer ничего не изменяет "на месте". Он создает и возвращает новый объект состояния. Redux затем заменяет старое состояние этим новым.
        ...state,  //-spread-оператор.
        isOpen: true,
        currentPostId: action.payload,  //Берем id из Action.
      };

    case CLOSE_PREVIEW:
      return {
        ...state,
        isOpen: false,
      };

    case NEXT_PREVIEW: {
      if (state.currentPostId === null) return state; //Если картинка не открыта,то листать нечего.Поэтому просто возвращаем старое состояние.Ничего не меняем.

      const index = posts.findIndex((post) => post.id === state.currentPostId);  //findIndex-метод массива.
      const nextIndex = index === posts.length - 1 ? 0 : index + 1; //posts.length - 10posts - 9index, Если уже последний пост - Переходим на первый.
      return {
        ...state,
        currentPostId: posts[nextIndex].id,
      };
    }

    case PREV_PREVIEW: {
      if (state.currentPostId === null) return state;

      const index = posts.findIndex((post) => post.id === state.currentPostId);
      const prevIndex = index === 0 ? posts.length - 1 : index - 1;
      return {
        ...state,
        currentPostId: posts[prevIndex].id,
      };
    }
    default:
      return state;  //Это обязательная часть любого reducer'а.
  }
};
