import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchPopularSubreddits = createAsyncThunk(
  "allSubreddits/fetchPopularSubreddits",
  async (thunkAPI) => {
    const response = await fetch(
      "https://www.reddit.com/subreddits/popular.json"
    );
    const json = await response.json();
    const data = json.data.children;

    const dataArray = data.map((object) => ({
      id: object.data.id,
      display_name: object.data.display_name,
      header_img: object.data.header_img,
      icon_img: object.data.icon_img
    })) 

    return dataArray
  }
);

const AllSubredditsSlice = createSlice({
  name: "allSubreddits",
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularSubreddits.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchPopularSubreddits.fulfilled, (state, action) => {
        state.status = "Completed";
        state.data = action.payload;
      })
      .addCase(fetchPopularSubreddits.rejected, (state, action) => {
        state.status = "Errror";
        state.error = action.error.message;
      });
  },
});

//export selector
export const selectPopularSubreddits = (state) => state.allSubreddits;

//export action
export { fetchPopularSubreddits };

// export reducer
export default AllSubredditsSlice.reducer;
