import { Outlet } from "react-router-dom";

export default function SearchBar() {
  return (
    <>
    <div className="search-bar-div">
      <h1>
        Reddit<span>.min</span>
      </h1>
      <form>
        <input />
      </form>
    </div>
    <Outlet />
    </>
  );
}
