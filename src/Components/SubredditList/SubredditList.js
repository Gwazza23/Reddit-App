import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//import selector
import { selectPopularSubreddits } from "../../Features/AllSubredditsSlice";

//import action
import { fetchPopularSubreddits } from "../../Features/AllSubredditsSlice";

export default function SubredditList() {
  const dispatch = useDispatch();

  const { data } = useSelector(selectPopularSubreddits);
  const newData = data.slice(0, 10);

  useEffect(() => {
    dispatch(fetchPopularSubreddits());
  }, [dispatch]);

  return (
    <div className="subreddit-list-div">
      <h3>Popular Subreddits</h3>
      {Object.values(newData).map((obj) => {
        return (
          <div className="individual-subreddit" key={obj.id}>
            <h4>{obj.display_name}</h4>
          </div>
        );
      })}
    </div>
  );
}
