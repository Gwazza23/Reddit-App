import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

//import selector
import { selectSearch } from "../../Features/SearchSlice";

export default function SearchResults() {
  let { result } = useParams();
  result = result.substring(1);

  const { data, status, error } = useSelector(selectSearch);

  if (status === "loading") {
    return <h1 className="loading">Loading...</h1>;
  }
  if (status === "error") {
    return <h1>{error}</h1>;
  }

  return (
    <div className="search-results-div">
      <h1>Results for : {result}</h1>
      { Object.values(data).length > 0 ? Object.values(data).map((obj) => {
        return (
          <Link className="link" to={`/:${obj.display_name}`}>
            <div className="search-results-subreddits">
              <h3>{obj.display_name_prefixed}</h3>
              <h6>
                {obj.subscribers > 1000000
                  ? (obj.subscribers / 1000000).toFixed(1) + "M"
                  : (obj.subscribers / 1000).toFixed(0) + "K"}{" "}
                members
              </h6>
            </div>
          </Link>
        );
      }) : <h1>No Results Found</h1>}
    </div>
  );
}
