import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";

//import actions
import {
  fetchSubredditData,
  fetchSubredditDataAfter,
  fetchSubredditDataBefore,
} from "../../Features/SubredditPageSlice";

//import selectors
import { selectSubredditData } from "../../Features/SubredditPageSlice";

export default function SubredditPage() {
  const dispatch = useDispatch();
  const { data, status, before, after, page } =
    useSelector(selectSubredditData);
  const { subreddit } = useParams();
  const sub = subreddit.substring(1);

  const handleNextPage = (e) => {
    e.preventDefault();
    dispatch(fetchSubredditDataAfter({ sub: sub, after: after }));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handlePreviousPage = (e) => {
    e.preventDefault();
    dispatch(fetchSubredditDataBefore({ sub: sub, before: before }));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    dispatch(fetchSubredditData(sub));
  }, [dispatch, sub]);

  return (
    <div className="subreddit-page-div">
      {Object.values(data).length ? <h1>r/{sub}</h1> : null}
      {Object.values(data).length > 0 ? (
        Object.values(data).map((obj) => {
          return (
            <>
              {status === "loading" ? (
                <h5 className="loading">Loading...</h5>
              ) : (
                <Link className="link" to={`/:${obj.subreddit}/:${obj.id}`}>
                  <div className="subreddit-page-post">
                    <div className="subreddit-page-header">
                      <h2>{obj.title}</h2>
                      <div className="popular-tiles-upvotes">
                        <span>
                          <i className="chevron-up"></i>
                          {obj.score}
                          <i className="chevron-down"></i>
                        </span>
                      </div>
                    </div>

                    <div className="subreddit-page-media">
                      {obj.video_url && (
                        <div className="video-container">
                          <ReactPlayer
                            className="video"
                            url={obj.video_url}
                            controls={true}
                            muted
                            playing
                          />
                        </div>
                      )}
                      {obj.post_hint === "image" && obj.image_url && (
                        <div className="image-container">
                          <img src={obj.image_url} alt={obj.title} />
                        </div>
                      )}
                      {obj.gif_url && (
                        <div className="gif-container">
                          <video
                            className="gif"
                            src={obj.gif_url}
                            autoPlay
                            loop
                            muted
                          />
                        </div>
                      )}
                      {obj.url_overridden_by_dest && (
                        <div className="url-container">
                          <a href={obj.url_overridden_by_dest} target="_blank" rel="noreferrer">
                            Link
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="subreddit-page-footer">
                      <footer>
                        <p>comments: {obj.num_comments}</p>
                        <p>u/{obj.author}</p>
                      </footer>
                    </div>
                  </div>
                </Link>
              )}
            </>
          );
        })
      ) : (
        <h1>Error, no results found</h1>
      )}
      {Object.values(data).length > 0 ? (
        page === 0 ? (
          <div className="nav-button-div">
            <button className="nav-button" onClick={handleNextPage}>
              next page
            </button>
          </div>
        ) : (
          <div className="nav-button-div">
            <button className="nav-button" onClick={handlePreviousPage}>
              previous page
            </button>
            <button className="nav-button" onClick={handleNextPage}>
              next page
            </button>
          </div>
        )
      ) : null}
    </div>
  );
}
