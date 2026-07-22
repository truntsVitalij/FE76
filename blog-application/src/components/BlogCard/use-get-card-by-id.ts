export const useGetCardById = (id: number) => {
  const card = useSelector((state: RootState) =>
    state.blogs.list.find((card) => card.id === id),
  );

  return card;
};

export const useIsFavoritePost = (id: number) => {
  const isFavorite = useSelector((state: RootState) =>
    state.blogs.list.some((card) => card.id === id),
  );

  return isFavorite;
};
