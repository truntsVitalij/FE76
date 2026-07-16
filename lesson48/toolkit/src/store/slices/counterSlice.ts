import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "..";

type InitialStateType = {
  value: number;
};

const initialState: InitialStateType = {
  value: 0,
};

// slice -> { reducer, actions }
const counterSlice = createSlice({
  // {reducer: () => {}, actions: {{type: "INCREMENT"}, {type: "DECREMENT"}}}
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;

export const selectCounterValue = (state: RootState) => state.counter.value;

////////////////////////////////////////////////////
// const INCREMENT = "INCREMENT";
// const DECREMENT = "DECREMENT";

// const initialState = {
//   value: 0,
// };

// const increment = () => ({
//   type: INCREMENT,
// });

// const decrement = () => ({
//   type: DECREMENT,
// });

// const reducer = (state = initialState, action: { type: string }) => {
//   switch (action.type) {
//     case INCREMENT:
//       return {
//         ...state,
//         value: state.value + 1,
//         list: [...list.slice(0, index)],
//       };
//     case DECREMENT:
//       return { ...state, value: state.value - 1 };
//     default:
//       return state;
//   }
// };
