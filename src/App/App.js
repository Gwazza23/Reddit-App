import "./App.css";

//import react-router-dom
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

//import components
import HomePage from "../Components/HomePage/HomePage";
import SearchBar from "../Components/SearchBar/SearchBar";
import SubredditPage from "../Components/SubredditPage/SubredditPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<SearchBar />}>
        <Route path="/" element={<HomePage/>} />
        <Route path=":subreddit" element={<SubredditPage />}/>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
