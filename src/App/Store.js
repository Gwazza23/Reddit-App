import { configureStore } from "@reduxjs/toolkit";

//import reducers 
import HomePageReducers from "../Features/HomePageSlice";
import AllSubredditsReducers from "../Features/AllSubredditsSlice";
import SubredditPageReducers from "../Features/SubredditPageSlice";

const store = configureStore({
    reducer:{
        homepage: HomePageReducers,
        allSubreddits: AllSubredditsReducers,
        subredditpage: SubredditPageReducers
    }
})

export default store