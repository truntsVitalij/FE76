const initialState = {
  list: [
    {
      id: 1,
      title: "Blog 1",
      content: "Content 1",
      isLiked: false,
      isFavorite: false,
    },
  ],
};

export const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LIKE_BLOG":
      return {
        ...state,
        list: state.list.map((blog) =>
          blog.id === action.payload ? { ...blog, isLiked: true } : blog,
        ),
      };
    case "UNLIKE_BLOG":
      return {
        ...state,
        list: state.list.map((blog) =>
          blog.id === action.payload ? { ...blog, isLiked: false } : blog,
        ),
      };
    default:
      return state;
  }
};
