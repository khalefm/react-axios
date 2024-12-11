import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostList from "./components/PostList";
import PostDetails from "./components/PostDetails";
import PostForm from "./components/PostForm";

function App() {
  return (
    <Router>
      <div>
        <h1>Posts App</h1>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/create" element={<PostForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
