import Layout from "./Layout";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import EditPost from "./EditPost";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import api from "./api/posts";
import useWindowSize from "./hooks/useWindowSize";
import useAxiosFetch from "./hooks/useAxiosFetch";

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:5500/posts"
  );

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        // axios automatically converts to JSON and catch errors when they arent't in the 200 range
        // this means we don't have to do an if condition to make sure we have a response
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          // not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        // searching the body or title to see if it includes the search characters
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

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

  const handleEdit = async (id) => {
    // format the date
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    // create the new post
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      // send the user back to the homepage
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      // take them to the home page after deleting a post
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout search={search} setSearch={setSearch} width={width} />}
      >
        <Route path="edit">
          <Route
            path=":id"
            element={
              <EditPost
                posts={posts}
                handleEdit={handleEdit}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                editBody={editBody}
                setEditBody={setEditBody}
              />
            }
          />
        </Route>
        <Route
          index
          element={
            <Home
              posts={searchResults}
              fetchError={fetchError}
              isLoading={isLoading}
            />
          }
        />
        <Route path="post">
          <Route
            index
            element={
              <NewPost
                handleSubmit={handleSubmit}
                postTitle={postTitle}
                setPostTitle={setPostTitle}
                postBody={postBody}
                setPostBody={setPostBody}
              />
            }
          />
          <Route
            path=":id"
            element={<PostPage posts={posts} handleDelete={handleDelete} />}
          />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
