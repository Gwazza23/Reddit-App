import { configureStore } from "@reduxjs/toolkit";

//import reducers 
import HomePageReducers from "../Features/HomePageSlice";

const store = configureStore({
    reducer:{
        homepage: HomePageReducers
    }
})

export default store