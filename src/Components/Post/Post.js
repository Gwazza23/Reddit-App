import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

//import selector
import { selectPost } from "../../Features/PostSlice";
import { selectSubredditData } from "../../Features/SubredditPageSlice";

//import action
import { fetchPostComments } from "../../Features/PostSlice"; //parent_id
import { fetchSubredditData } from "../../Features/SubredditPageSlice"; //name

export default function Post() {
  const dispatch = useDispatch();

  let { subreddit, id } = useParams();

  const subredditData = useSelector(selectSubredditData);
  const postData = useSelector(selectPost);
  subreddit = subreddit.substring(1);
  id = id.substring(1);

  const decode = (html) => {
    const text = document.createElement("span");
    text.innerHTML = html;
    return text.textContent || text.innerText;
  };

  useEffect(() => {
    dispatch(fetchSubredditData(subreddit));
    dispatch(fetchPostComments({ subreddit: subreddit, id: id }));
  }, [dispatch]);

  if (postData.status === "loading") {
    return <h1 className="loading">Loading...</h1>;
  }
  if (postData.error === "error") {
    return <h1>{subredditData.error}</h1>;
  }
  if (subredditData.status === "loading") {
    return <h1 className="loading">Loading...</h1>;
  }
  if (subredditData.error === "error") {
    return <h1>{subredditData.error}</h1>;
  }

  console.log(postData.data);

  const lookup = {};
  for (const obj of subredditData.data) {
    lookup[obj.name] = obj;
  }

  if(subredditData.length > 0){
  for (const obj of postData.data) {
    const match = lookup[obj.parent_id];
    if (match) {
      return (
        <>
          <div className="post-info">
            <div className="post-header">
              <h1>{match.title}</h1>
              <div className="div1">
                <h4>u/{match.author}</h4>
                <div className="popular-tiles-upvotes">
                  <span>
                    <i className="chevron-up"></i>
                    <p>{match.score}</p>
                    <i className="chevron-down"></i>
                  </span>
                </div>
              </div>
            </div>
            {match.video_url && (
              <div className="video-container">
                <ReactPlayer
                  className="video"
                  url={match.video_url}
                  controls={true}
                  muted
                  playing
                />
              </div>
            )}
            <div className="post-media">
              {match.post_hint === "image" && match.image_url && (
                <div className="image-container">
                  <img src={match.image_url} alt={match.title} />
                </div>
              )}
              {match.gif_url && (
                <div className="gif-container">
                  <video
                    className="gif"
                    src={match.gif_url}
                    autoPlay
                    loop
                    muted
                  />
                </div>
              )}
              {match.url_overridden_by_dest && (
                <div className="url-container">
                  <a href={match.url_overridden_by_dest} target="_blank">
                    Link to content
                  </a>
                </div>
              )}
              {match.selftext_html && (
                <div
                  className="selftext"
                  dangerouslySetInnerHTML={{
                    __html: decode(match.selftext_html),
                  }}
                ></div>
              )}
            </div>
          </div>
          <div className="comment-div">
            {postData.data.map((obj) => {
              return (
                obj.body ?
                (<div className="individual-comment">
                  <div className="individual-comment-header">
                    <h5>u/{obj.author}</h5>
                    <div className="popular-tiles-upvotes">
                      <span>
                        <i className="chevron-up"></i>
                        <p>{obj.score}</p>
                        <i className="chevron-down"></i>
                      </span>
                    </div>
                  </div>
                  <p>{obj.body}</p>
                </div>) : null
              );
            })}
          </div>
        </>
      );
    }
  }
}else{
  return <h1>Error, no result found</h1>
}
}
