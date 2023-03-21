import { Outlet, Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'

import { selectSearch } from "../../Features/SearchSlice";
import { fetchSubredditSearch } from "../../Features/SearchSlice";
import { useState } from "react";

export default function SearchBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState();

  const handleInputChange = (e) =>{
    setSearch(e.target.value)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchSubredditSearch(search))
    navigate(`/search/:${search}`)
    setSearch('')
  }
  
  return (
    <>
      <div className="search-bar-div">
        <Link className="link" to={'/'}>
          <h1>
            Reddit<span>.min</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit}>
          <input value={search} placeholder="search subreddits..." onChange={handleInputChange}/>
        </form>
      </div>
      <Outlet />
    </>
  );
}
