import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchSubredditData = createAsyncThunk(
  "subreddit/fetchSubredditData",
  async (param, thunkAPI) => {
    const response = await fetch(
      `https://www.reddit.com/r/${param}.json?exclude=pinned`
    );
    const json = await response.json();
    const data = json.data.children;

    const dataArray = data.map((object) => ({
      subreddit: object.data.subreddit,
      title: object.data.title,
      id: object.data.id,
      author: object.data.author,
      score: object.data.score,
      num_comments: object.data.num_comments,
      name: object.data.name,
      post_hint: object.data.post_hint,
      url_overridden_by_dest: object.data.url_overridden_by_dest,
      video_url:
        object.data.media &&
        object.data.media.reddit_video &&
        object.data.media.reddit_video.hls_url,
      image_url: object.data.url,
      gif_url:
        object.data.preview &&
        object.data.preview.reddit_video_preview &&
        object.data.preview.reddit_video_preview.fallback_url,
    }));

    return dataArray;
  }
);

const fetchSubredditDataAfter = createAsyncThunk(
  "subreddit/fetchSubredditDataAfter",
  async ({ sub: sub, after: after }, thunkAPI) => {
    const response = await fetch(
      `https://www.reddit.com/r/${sub}.json?after=${after}&exclude=pinned`
    );
    const json = await response.json();
    const data = json.data.children;

    const dataArray = data.map((object) => ({
      subreddit: object.data.subreddit,
      title: object.data.title,
      id: object.data.id,
      author: object.data.author,
      score: object.data.score,
      num_comments: object.data.num_comments,
      name: object.data.name,
      post_hint: object.data.post_hint,
      url_overridden_by_dest: object.data.url_overridden_by_dest,
      video_url:
        object.data.media &&
        object.data.media.reddit_video &&
        object.data.media.reddit_video.hls_url,
      image_url: object.data.url,
      gif_url:
        object.data.preview &&
        object.data.preview.reddit_video_preview &&
        object.data.preview.reddit_video_preview.fallback_url,
    }));

    return dataArray;
  }
);

const fetchSubredditDataBefore = createAsyncThunk(
  "subreddit/fetchSubredditDataBefore",
  async ({ sub: sub, before: before }, thunkAPI) => {
    const response = await fetch(
      `https://www.reddit.com/r/${sub}.json?before=${before}&exclude=pinned`
    );
    const json = await response.json();
    const data = json.data.children;

    const dataArray = data.map((object) => ({
      subreddit: object.data.subreddit,
      title: object.data.title,
      id: object.data.id,
      author: object.data.author,
      score: object.data.score,
      num_comments: object.data.num_comments,
      name: object.data.name,
      post_hint: object.data.post_hint,
      url_overridden_by_dest: object.data.url_overridden_by_dest,
      video_url:
        object.data.media &&
        object.data.media.reddit_video &&
        object.data.media.reddit_video.hls_url,
      image_url: object.data.url,
      gif_url:
        object.data.preview &&
        object.data.preview.reddit_video_preview &&
        object.data.preview.reddit_video_preview.fallback_url,
    }));

    return dataArray;
  }
);

const SubredditPageSlice = createSlice({
  name: "subredditpage",
  initialState: {
    data: [],
    status: null,
    error: null,
    page: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubredditData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubredditData.fulfilled, (state, action) => {
        state.status = "completed";
        state.data = action.payload;
        state.after = action.payload[action.payload.length - 1].name;
        state.before = action.payload[0].name;
        state.limit = action.payload.length;
      })
      .addCase(fetchSubredditData.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(fetchSubredditDataAfter.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubredditDataAfter.fulfilled, (state, action) => {
        state.status = "completed";
        state.data = action.payload;
        state.after = action.payload[action.payload.length - 1].name;
        state.before = action.payload[0].name;
        state.limit = action.payload.length;
        state.page += 1;
      })
      .addCase(fetchSubredditDataAfter.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(fetchSubredditDataBefore.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubredditDataBefore.fulfilled, (state, action) => {
        state.status = "completed";
        state.data = action.payload;
        state.after = action.payload[action.payload.length - 1].name;
        state.before = action.payload[0].name;
        state.limit = action.payload.length;
        state.page -= 1;
      })
      .addCase(fetchSubredditDataBefore.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

//export reducer
export default SubredditPageSlice.reducer;

//export action
export {
  fetchSubredditData,
  fetchSubredditDataAfter,
  fetchSubredditDataBefore,
};

//export selector
export const selectSubredditData = (state) => state.subredditpage;
