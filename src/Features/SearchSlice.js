import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchSubredditSearch = createAsyncThunk('search/fetchSubredditSearch', async(param, thunkAPI) => {
    const response = await fetch(`https://www.reddit.com/subreddits/search.json?q=${param}`)
    const json = await response.json();
    const data = json.data.children

    const dataArray = data.map((object) => ({
        id: object.data.id,
        title: object.data.title,
        name: object.data.name,
        display_name_prefixed: object.data.display_name_prefixed,
        display_name: object.data.display_name,
        subscribers: object.data.subscribers
      }));

    return dataArray
})

const SearchSlice = createSlice({
    name: 'search',
    initialState: {
        data: [],
        status: null,
        error: null
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(fetchSubredditSearch.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchSubredditSearch.fulfilled, (state,action) => {
                state.status = 'completed'
                state.data = action.payload
            })
            .addCase( fetchSubredditSearch.rejected, (state, action) => {
                state.status = 'error'
                state.error = action.error.message
            })
    }
})

//export reducer
export default SearchSlice.reducer

//export action
export {fetchSubredditSearch}

//export selector 
export const selectSearch = (state) => state.search