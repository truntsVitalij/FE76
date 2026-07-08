import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/layout/layout";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import SuccessLogin from "./pages/successLogin/successLogin";
import BlogList from "./pages/blogList/blogList";
import BlogPage from "./pages/blogPage/blogPage";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  const isAuth = localStorage.getItem("isAuth");

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={isAuth ? <Navigate to="/blog" /> : <Login />}
          />

          <Route path="/register" element={<Register />} />

          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <SuccessLogin />
              </ProtectedRoute>
            }
          />

          <Route
              path="/blog"
              element={
                  <ProtectedRoute>
                      <BlogList />
                  </ProtectedRoute>
              }
          />

          <Route
              path="/blog/:id"
              element={
                  <ProtectedRoute>
                      <BlogPage />
                  </ProtectedRoute>
              }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;