import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

// Define a type for the post data
interface Post {
  id: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

const PostDetails = () => {
  const { id } = useParams(); // Get post ID from URL
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [comments, setComments] = useState<Comment[]>([]); // Array of comments
  const [commentsLoading, setCommentsLoading] = useState<boolean>(true); // Track loading state for comments

  useEffect(() => {
    setLoading(true);
    // Fetch post details
    // fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    //   .then((response) => response.json())
    //   .then((data: Post) => {
    //     setPost(data);
    //     setLoading(false);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        setPost(response.data); // Set the post data to state
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching post details:", error));

    // Fetch post comments
    setCommentsLoading(true);
    // fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    //   .then((response) => response.json())
    //   .then((data: Comment[]) => {
    //     setComments(data);
    //     setCommentsLoading(false);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((response) => {
        setComments(response.data); // Set the comments data to state
        setCommentsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching post comments:", error);
        setCommentsLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading post...</p>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Link to="/">Back to Posts</Link>

      <h3>Comments</h3>
      {commentsLoading ? (
        <p>Loading comments...</p>
      ) : comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>
                <strong>{comment.name}</strong> ({comment.email})
              </p>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments available for this post.</p>
      )}
    </div>
  );
};

export default PostDetails;
