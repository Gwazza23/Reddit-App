import "./App.css";

//import react-router-dom 
import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'
import SearchBar from "../Components/SearchBar/SearchBar";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<SearchBar />}/>
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
