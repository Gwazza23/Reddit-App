import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchPostComments = createAsyncThunk(
  "post/fetchPostComments",
  async ({ subreddit: subreddit, id: id }, thunkAPI) => {
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}/comments/${id}.json`
    );
    const json = await response.json();
    const data = json[1].data.children;

    const dataArray = data.map((object) => ({
        subreddit: object.data.subreddit,
        id: object.data.id,
        author: object.data.author,
        score: object.data.score,
        name: object.data.name,
        body: object.data.body,
        parent_id: object.data.parent_id
      }));

    return dataArray;
  }
);

const PostSlice = createSlice({
  name: "post",
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        state.status = "completed";
        state.data = action.payload;
      })
      .addCase(fetchPostComments.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
  },
});

//export reducer
export default PostSlice.reducer;

//export selector
export const selectPost = (state) => state.post;

//export action
export { fetchPostComments };