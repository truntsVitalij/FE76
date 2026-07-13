export const INCREMENT = "INCREMENT" as const;

export const increment = () => ({
  type: INCREMENT,
});

export type CounterAction = ReturnType<typeof increment>;
