import type { Blog } from "../../../types/blog";

export const UPDATE_BLOG_LIST = "UPDATE_BLOG_LIST" as const;
export const DELETE_BLOG = "DELETE_BLOG" as const;
export const FETCH_BLOG_LIST_STARTED = "FETCH_BLOG_LIST_STARTED" as const;
export const FETCH_BLOG_LIST_FINISHED = "FETCH_BLOG_LIST_FINISHED" as const;

export const fetchBlogList = () => async (dispatch) => {
  dispatch(fetchBlogListStarted());

  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  dispatch(updateBlogList(data));
  dispatch(fetchBlogListFinished());
};

export const fetchBlogListStarted = () => ({
  type: FETCH_BLOG_LIST_STARTED,
});

export const fetchBlogListFinished = () => ({
  type: FETCH_BLOG_LIST_FINISHED,
});

export const updateBlogList = (blogList: Blog[]) => ({
  type: UPDATE_BLOG_LIST,
  payload: blogList,
});

export const deleteBlog = (blogId: number) => ({
  type: DELETE_BLOG,
  payload: blogId,
});

export type BlogAction =
  | ReturnType<typeof updateBlogList>
  | ReturnType<typeof deleteBlog>
  | ReturnType<typeof fetchBlogListStarted>
  | ReturnType<typeof fetchBlogListFinished>;
