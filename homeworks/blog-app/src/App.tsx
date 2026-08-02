import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "./store";
import Layout from "./layouts/Layout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SuccessLogin from "./pages/SuccessLogin";
import Blog from "./pages/Blog";
import PostDetails from "./pages/PostDetails";
import SearchResults from "./pages/SearchResults";
import ImagePreview from "./components/ImagePreview";

function App() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={isLoggedIn ? "/blog" : "/signin"} />}
          />

          <Route
            path="/signin"
            element={!isLoggedIn ? <SignIn /> : <Navigate to="/blog" />}
          />

          <Route
            path="/signup"
            element={!isLoggedIn ? <SignUp /> : <Navigate to="/blog" />}
          />

          <Route path="/success" element={<SuccessLogin />} />

          <Route
            path="/blog"
            element={
              isLoggedIn ? (
                <Blog title="Space Blog" />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />

          <Route
            path="/post/:id"
            element={isLoggedIn ? <PostDetails /> : <Navigate to="/signin" />}
          />

          <Route
            path="/search"
            element={isLoggedIn ? <SearchResults /> : <Navigate to="/signin" />}
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>

      <ImagePreview />
    </>
  );
}

export default App;
