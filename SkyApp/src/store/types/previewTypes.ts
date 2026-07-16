export interface PreviewState {
  //обьект
  isOpen: boolean; //переменная, попап закрыт
  currentPostId: number | null; // 0-когда попап закрыт, никакая картинка не выбрана.
}

export const OPEN_PREVIEW = "OPEN_PREVIEW"; // константы Action
export const CLOSE_PREVIEW = "CLOSE_PREVIEW";
export const NEXT_PREVIEW = "NEXT_PREVIEW";
export const PREV_PREVIEW = "PREV_PREVIEW";

interface OpenPreviewAction {  //Action для открытия
  type: typeof OPEN_PREVIEW;   // typeof - возьми тип этой константы.
  payload: number;             //Payload — доп. данные, передаются вместе с действием. Нужно знать, какую картинку открыть.
}

interface ClosePreviewAction {
  type: typeof CLOSE_PREVIEW;
}

interface NextPreviewAction {
  type: typeof NEXT_PREVIEW;
}

interface PrevPreviewAction {
  type: typeof PREV_PREVIEW;
}

export type PreviewAction =   //Объединение всех Action. Type - создается объединение нескольких типов (union type).
| OpenPreviewAction
| ClosePreviewAction
|NextPreviewAction
|PrevPreviewAction;

// Tаким образом, этот файл не изменяет состояние сам. Его задача — строго описать:
// как выглядит состояние (PreviewState);
// какие действия возможны (OPEN_PREVIEW, CLOSE_PREVIEW, NEXT_PREVIEW, PREV_PREVIEW);
// какую форму должен иметь каждый объект-действие (Action);
// объединить все действия в один тип PreviewAction, чтобы reducer и dispatch были типобезопасными. Это позволяет TypeScript находить ошибки еще до запуска приложения.
