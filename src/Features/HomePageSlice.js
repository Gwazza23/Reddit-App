import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchPopular = createAsyncThunk("home/fetchPopular", async (thunkAPI) => {
  const response = await fetch("https://www.reddit.com/r/popular.json");
  const json = await response.json();
  const data = json.data.children;

  const dataArray = data.map((object) => ({
    id: object.data.id,
    title: object.data.title,
    name: object.data.name,
    score: object.data.score,
    author: object.data.author,
    subreddit: object.data.subreddit,
    selftext_html: object.data.selftext_html,
    video_url: object.data.media && object.data.media.reddit_video && object.data.media.reddit_video.hls_url,
    image_url: object.data.url,
    gif_url:
      object.data.preview &&
      object.data.preview.reddit_video_preview &&
      object.data.preview.reddit_video_preview.fallback_url,
    post_hint: object.data.post_hint
  }));

  return dataArray;
});

const fetchPopularAfter = createAsyncThunk(
  "home/fetchPopularAfter",
  async (after, thunkAPI) => {
    const response = await fetch(
      `https://www.reddit.com/r/popular.json?after=${after}`
    );
    const json = await response.json();
    const data = json.data.children;
    const dataArray = data.map((object) => ({
      id: object.data.id,
    title: object.data.title,
    name: object.data.name,
    score: object.data.score,
    author: object.data.author,
    subreddit: object.data.subreddit,
    selftext_html: object.data.selftext_html,
    video_url: object.data.media && object.data.media.reddit_video && object.data.media.reddit_video.hls_url,
    image_url: object.data.url,
    gif_url:
      object.data.preview &&
      object.data.preview.reddit_video_preview &&
      object.data.preview.reddit_video_preview.fallback_url,
    post_hint: object.data.post_hint
    }));

    return dataArray;
  }
);

const fetchPopularBefore = createAsyncThunk(
  "home/fetchPopularBefore",
  async (before, thunkAPI) => {
    const response = await fetch(
      `https://www.reddit.com/r/popular.json?before=${before}`
    );
    const json = await response.json();
    const data = json.data.children;
    const dataArray = data.map((object) => ({
      id: object.data.id,
    title: object.data.title,
    name: object.data.name,
    score: object.data.score,
    author: object.data.author,
    subreddit: object.data.subreddit,
    selftext_html: object.data.selftext_html,
    video_url: object.data.media && object.data.media.reddit_video && object.data.media.reddit_video.hls_url,
    image_url: object.data.url,
    gif_url:
      object.data.preview &&
      object.data.preview.reddit_video_preview &&
      object.data.preview.reddit_video_preview.fallback_url,
    post_hint: object.data.post_hint
    }));

    return dataArray;
  }
);

const HomePageSlice = createSlice({
  name: "homepage",
  initialState: {
    data: [],
    status: null,
    error: null,
    page: 0,
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
        state.after = action.payload[action.payload.length - 1].name;
        state.before = action.payload[0].name;
        state.limit = action.payload.length;
      })
      .addCase(fetchPopular.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(fetchPopularAfter.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPopularAfter.fulfilled, (state, action) => {
        state.status = "completed";
        state.data = action.payload;
        state.after = action.payload[action.payload.length - 1].name;
        state.before = action.payload[0].name;
        state.limit = action.payload.length;
        state.page += 1;
      })
      .addCase(fetchPopularAfter.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(fetchPopularBefore.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPopularBefore.fulfilled, (state, action) => {
        state.status = "completed";
        state.data = action.payload;
        state.after = action.payload[action.payload.length - 1].name;
        state.before = action.payload[0].name;
        state.limit = action.payload.length;
        state.page -= 1;
      })
      .addCase(fetchPopularBefore.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

//export reducer
export default HomePageSlice.reducer;

//export action
export { fetchPopular, fetchPopularAfter, fetchPopularBefore };

//export selector

export const selectPopular = (state) => state.homepage;
