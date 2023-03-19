import { configureStore } from "@reduxjs/toolkit";

//import reducers 
import HomePageReducers from "../Features/HomePageSlice";
import AllSubredditsReducers from "../Features/AllSubredditsSlice";

const store = configureStore({
    reducer:{
        homepage: HomePageReducers,
        allSubreddits: AllSubredditsReducers
    }
})

export default store