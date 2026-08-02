export const INCREMENT = "users/INCREMENT";
export const DECREMENT = "users/DECREMENT";

export const increment = (id: number) => {
  return {
    type: INCREMENT,
    payload: id,
  };
};

export const decrement = (id: number) => {
  return {
    type: DECREMENT,
    payload: id,
  };
};
