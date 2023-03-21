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
import SearchResults from "../Components/SearchResult/SearchResult";
import Post from "../Components/Post/Post";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<SearchBar />}>
        <Route path="/" element={<HomePage/>} />
        <Route path=":subreddit" element={<SubredditPage />}/>
        <Route path="search/:result" element={<SearchResults />} />
        <Route path=":subreddit/:id" element={<Post />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
