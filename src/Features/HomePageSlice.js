import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchPopular = createAsyncThunk(
  "home/fetchPopular",
  async (arg, thunkAPI) => {
    const response = await fetch("https://www.reddit.com/r/popular.json");
    const json = await response.json();
    const data = json.data.children

    const dataArray = data.map((object) => ({
        id: object.data.id,
        title: object.data.title,
        name: object.data.name,
        selftext_html: object.data.selftext_html,
        score:object.data.score,
        author: object.data.author,
        subreddit: object.data.subreddit,
        thumbnail: object.data.thumbnail,
        subreddit_name_prefixed: object.data.subreddit_name_prefixed
    }))

    return dataArray;
  }
);

const HomePageSlice = createSlice({
  name: "homepage",
  initialState: {
    data: {},
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopular.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPopular.fulfilled, (state, action) => {
        state.status = "completed";
        state.data = action.payload;
      })
      .addCase(fetchPopular.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

//export reducer
export default HomePageSlice.reducer;

//export action
export { fetchPopular }

//export selector 

export const selectPopular = state => state.homepage