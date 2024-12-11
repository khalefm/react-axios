import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState(1); // default userId
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Data to be sent in the POST request
    const postData = {
      title: title,
      body: body,
      userId: userId,
    };

    try {
      // Sending POST request using axios
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        postData
      );
      setResponseMessage(`Post created with ID: ${response.data.id}`);
      setTitle("");
      setBody("");
    } catch (error) {
      setResponseMessage("Error creating post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required></textarea>
        </div>
        <div>
          <label htmlFor="userId">User ID:</label>
          <input
            type="number"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Create Post"}
        </button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
      <Link to="/">back to </Link>
    </div>
  );
};

export default PostForm;
