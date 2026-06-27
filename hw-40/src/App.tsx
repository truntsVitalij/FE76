import { useState } from "react";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Success from "./components/Success/Success";
import PostList from "./components/PostList/PostList";
import PostDetail from "./components/PostDetail/PostDetail";
import "./index.css";

type Post = {
  id: number;
  title: string;
  body: string;
};

type User = {
  name: string;
  email: string;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>({ name: "", email: "" });
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [currentPage, setCurrentPage] = useState<
    "signin" | "signup" | "success" | "posts" | "postDetail"
  >("signin");

  const handleSignIn = (email: string, password: string) => {
    setUser({ name: email.split("@")[0], email });
    setIsAuthenticated(true);
    setCurrentPage("success");
  };

  const handleSignUp = (email: string, password: string, name: string) => {
    setUser({ name, email });
    setIsAuthenticated(true);
    setCurrentPage("success");
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUser({ name: "", email: "" });
    setCurrentPage("signin");
  };

  const handlePostSelect = (post: Post) => {
    setSelectedPost(post);
    setCurrentPage("postDetail");
  };

  const handleBackToPosts = () => {
    setSelectedPost(null);
    setCurrentPage("posts");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "signin":
        return (
          <SignIn
            onSignIn={handleSignIn}
            onSwitchToSignUp={() => setCurrentPage("signup")}
          />
        );

      case "signup":
        return (
          <SignUp
            onSignUp={handleSignUp}
            onSwitchToSignIn={() => setCurrentPage("signin")}
          />
        );

      case "success":
        return (
          <Success
            user={user}
            onSignOut={handleSignOut}
            onViewPosts={() => setCurrentPage("posts")}
          />
        );

      case "posts":
        return <PostList onPostSelect={handlePostSelect} />;

      case "postDetail":
        return selectedPost ? (
          <PostDetail post={selectedPost} onBack={handleBackToPosts} />
        ) : null;

      default:
        return <SignIn onSignIn={handleSignIn} />;
    }
  };

  return <div className="app">{renderPage()}</div>;
}

export default App;
