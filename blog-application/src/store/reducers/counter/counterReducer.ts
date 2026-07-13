import {
  INCREMENT,
  type CounterAction,
} from "../../actions/counter/counterActions";

type CounterState = {
  value: number;
};

const initialState: CounterState = {
  value: 0,
};

export const counterReducer = (
  state: CounterState = initialState,
  action: CounterAction,
): CounterState => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        value: state.value + 1,
      };
    default:
      return state;
  }
};
