import { INCREMENT, DECREMENT } from "../actions/usersActions";

const initialState = {
  list: [
    { id: 1, name: "John Doe", counter: 0 },
    { id: 2, name: "Jane Doe", counter: 0 },
    { id: 3, name: "John Smith", counter: 0 },
  ],
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        list: state.list.map((user) =>
          user.id === action.payload
            ? { ...user, counter: user.counter + 1 }
            : user,
        ),
      };
    case DECREMENT:
      const index = state.list.findIndex((user) => user.id === action.payload);

      return {
        ...state,
        list: [
          ...state.list.slice(0, index),
          { ...state.list[index], counter: state.list[index].counter - 1 },
          ...state.list.slice(index + 1),
        ],
      };
    default:
      return state;
  }
};
