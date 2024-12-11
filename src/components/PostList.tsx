import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Track loading state

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching starts
    // Fetch posts from API
    // fetch("https://jsonplaceholder.typicode.com/posts")
    //   .then((response) => response.json())
    //   .then((data: Post[]) => {
    //     setPosts(data);
    //     setLoading(false); // Set loading to false once data is fetched
    axios
      .get(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => {
        setPosts(response.data); // The posts data is in response.data
        setLoading(false);
      })

      .catch((error) => {
        console.error("Error fetching post details:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading post...</p>;
  }

  if (!posts) {
    return <p>Post not found.</p>;
  }

  return (
    <div>
      <h2>All Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
