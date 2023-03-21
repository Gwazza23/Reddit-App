import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import ReactPlayer from "react-player";

//import actions
import {
  fetchPopular,
  fetchPopularAfter,
  fetchPopularBefore,
} from "../../Features/HomePageSlice";

//import selectors
import { selectPopular } from "../../Features/HomePageSlice";

//import components
import SubredditList from "../SubredditList/SubredditList";

export default function HomePage() {
  const dispatch = useDispatch();

  const { data, status, error, after, before, page } =
    useSelector(selectPopular);
    
  const handleNextPage = (e) => {
    e.preventDefault();
    dispatch(fetchPopularAfter(after));
  };
  const handlePreviousPage = (e) => {
    e.preventDefault();
    dispatch(fetchPopularBefore(before));
  };

  useEffect(() => {
    dispatch(fetchPopular());
  }, [dispatch]);

  if (status === "loading") {
    return <h1 className="loading">Loading...</h1>;
  }
  if (status === "error") {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <div className="home-page-div">
        <main>
          <h2>Popular</h2>
          <div>
            {Object.values(data).map((obj) => {
              return (
              <Link className="link" to={`/:${obj.subreddit}/:${obj.id}`}><div className="popular-tiles" key={obj.id}>
                  <div className="popular-tiles-header">
                    <div className="popular-tiles-subreddit-name">
                     <Link className="link" to={`:${obj.subreddit}`}><h4>r<span>/{obj.subreddit}</span></h4></Link>
                    </div>
                    <div className="popular-tiles-upvotes">
                      <span>
                        <i className="chevron-up"></i>
                        <p>{obj.score}</p>
                        <i className="chevron-down"></i>
                      </span>
                    </div>
                  </div>
                  <div className="popular-tiles-title">
                    <h2>{obj.title}</h2>
                  </div>
                  <div className="popular-tiles-media">
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
                  </div>
                </div></Link>
              );
            })}
          </div>

          {page === 0 ? (
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
          )}
        </main>
        <aside>
          <SubredditList />
        </aside>
      </div>
      <Outlet />
    </>
  );
}
