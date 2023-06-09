import { configureStore } from "@reduxjs/toolkit";

//import reducers 
import HomePageReducers from "../Features/HomePageSlice";
import AllSubredditsReducers from "../Features/AllSubredditsSlice";
import SubredditPageReducers from "../Features/SubredditPageSlice";
import SearchReducer from "../Features/SearchSlice";
import PostReducer from "../Features/PostSlice";

const store = configureStore({
    reducer:{
        homepage: HomePageReducers,
        allSubreddits: AllSubredditsReducers,
        subredditpage: SubredditPageReducers,
        search: SearchReducer,
        post: PostReducer
    }
})

export default store