import { useState, useContext } from "react";
import DataContext from "./context/DataContext";
import { useNavigate } from "react-router-dom";
import api from "./api/posts";
import { format } from "date-fns";

const NewPost = () => {
  const { posts, setPosts } = useContext(DataContext);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // increment the id value on the post
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    // format the date
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    // create the new post
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post("/posts", newPost);
      // create a new array that has all the posts plus the new post
      const allPosts = [...posts, response.data];
      // update the posts state
      setPosts(allPosts);
      // set the post title and body to empty incase the user wants to post again
      setPostTitle("");
      setPostBody("");
      // send the user back to the homepage
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <main className="NewPost">
      <h1>New Post</h1>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
