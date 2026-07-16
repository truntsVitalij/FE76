import { createStore } from "redux";
import { previewReducer } from "./reducers/previewReduser";
export const store = createStore(previewReducer);    //хранилище
export type RootState = ReturnType <typeof store.getState>;
// export default store;


// import { PreviewAction } from "./types/imgTypes";

// export default {PreviewAction}