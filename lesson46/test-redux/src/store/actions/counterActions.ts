export const INCREMENT = "counter/INCREMENT";
export const DECREMENT = "counter/DECREMENT";
export const INCREMENT_BY_VALUE = "counter/INCREMENT_BY_VALUE";

export const increment = () => {
  return {
    type: INCREMENT,
  };
};

export const decrement = () => {
  return {
    type: DECREMENT,
  };
};

export const incrementByValue = (value: number) => {
  return {
    type: INCREMENT_BY_VALUE,
    payload: value,
  };
};
