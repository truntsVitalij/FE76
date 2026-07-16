import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "..";

type Post = {
  id: number;
  title: string;
  body: string;
};

type InitialPostState = {
  list: Post[];
  loading: boolean;
  error: string | null;
};

const initialState: InitialPostState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchPostList = createAsyncThunk<Post[]>(
  "post/fetchPostList",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    return data;
  },
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPostList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;

export const selectPostList = (state: RootState) => state.post.list;
