# Reddit.min
Reddit.min is a web app that is a simplified version of Reddit.

## Description
This project was made as part of the portofolio project for codecademy. Reddit.min is a simplified version of a normal reddit web app that only uitlises the essential features. 

### Components of the web app
* Reddit API Json - used to fetch data from the api which is then displayed on the web page.
* React - used to create interactive interface by creating components that link with one another
* CSS - used to add styling to the HTML
* HTML - basic html used to create JSX for React Components
* React Router - used to link React components with one another in order to allow users to navigate between different components
* React Redux - used to store and read data that is fetched from the reddit API and dispatch actions to the store in order to update the data.

## Features

At the top of each page is a search bar which can be used to navigate to any subreddit.  
The subreddit search page contains a list of subreddits that are most closely associated with the input given in the search bar,each subreddit tile display the number of members in the subreddit, you can navigate to individual subreddits from here.    
The Reddit.min home page contains a list of currently popular post worlwide along with the score for each post and a side container containing the top 10 popular subreddits worlwide, both these components of the homepage will change overtime according to the data fetched from the API.You can navigate to the subreddits or the posts through here.  
Each Post indicates the author and the score of the post, it will include videos,images gif or a link to content that is on another website.Comments for each post can also be viewed along with the score.

## Features to implement in the future
1. From the home page and each subreddit page implement the ability to toggle between hot,new and top posts.  
2. Implement image carousels into each post instead of redirecting users to website that hosts the pictures.

