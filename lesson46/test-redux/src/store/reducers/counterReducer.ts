import {
  DECREMENT,
  INCREMENT,
  INCREMENT_BY_VALUE,
} from "../actions/counterActions";

const initialState = {
  value: 0,
};

export const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        value: state.value + 1,
      };
    case DECREMENT:
      return {
        ...state,
        value: state.value === 0 ? state.value : state.value - 1,
      };
    case INCREMENT_BY_VALUE:
      return {
        ...state,
        value: state.value + action.payload,
      };
    default:
      return state;
  }
};
