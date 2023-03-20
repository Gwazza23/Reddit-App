import { Outlet, Link } from "react-router-dom";

export default function SearchBar() {
  return (
    <>
      <div className="search-bar-div">
        <Link className="link" to={'/'}>
          <h1>
            Reddit<span>.min</span>
          </h1>
        </Link>
        <form>
          <input />
        </form>
      </div>
      <Outlet />
    </>
  );
}
