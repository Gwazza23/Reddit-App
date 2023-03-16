import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//import actions
import { fetchPopular } from "../../Features/HomePageSlice";

//import selectors
import { selectPopular } from "../../Features/HomePageSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector(selectPopular);
  useEffect(() => {
    dispatch(fetchPopular());
  }, [dispatch]);

  if (status === "loading") {
    return <h1 className="loading">Loading...</h1>;
  }
  if (status === 'error') {
    return <h1>{error}</h1>
  }

  return (
    <div className="home-page-div">
      <main>
        <h2>Popular</h2>
        <div>
          {Object.values(data).map((obj) => {
            return (
              <div className="popular-tiles">
                <div className="popular-tiles-header">
                  <h4>{obj.subreddit_name_prefixed}</h4>
                  <div className="popular-tiles-upvotes">
                    <span>
                      <i className="chevron-up"></i>
                      {obj.score}
                      <i className="chevron-down"></i>
                    </span>
                  </div>
                </div>
                <h2>{obj.title}</h2>
                <p>{obj.selftext_html}</p>
                <img
                  src={
                    obj.thumbnail === "default" || obj.thumbnail === "self"
                      ? undefined
                      : obj.thumbnail
                  }
                  alt="thumbnail"
                />
              </div>
            );
          })}
        </div>
      </main>
      <aside></aside>
    </div>
  );
}
