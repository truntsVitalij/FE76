import { Routes, Route, Navigate } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { SuccessLogin } from './pages/SuccessLogin';
import { Blog } from './pages/blog';
import { PostPage } from './pages/PostPage';
import { ALL_POSTS } from './data/posts';

interface User {
  email: string;
  password: string;
}

function App() {
  const [users, setUsers] = useLocalStorage<User[]>('registeredUsers', []);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage<boolean>('isLoggedIn', false);
  const [currentUser, setCurrentUser] = useLocalStorage<string>('currentUser', '');
  const [favoriteIds, setFavoriteIds] = useLocalStorage<number[]>('favoriteIds', []);
  const [likedIds, setLikedIds] = useLocalStorage<number[]>('likedIds', []);
  const [dislikedIds, setDislikedIds] = useLocalStorage<number[]>('dislikedIds', []);

  const handleToggleFavorite = (postId: number) => {
    setFavoriteIds(prev =>
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const handleToggleLike = (postId: number) => {
    setLikedIds(prev =>
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
    setDislikedIds(prev => prev.filter(id => id !== postId));
  };

  const handleToggleDislike = (postId: number) => {
    setDislikedIds(prev =>
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
    setLikedIds(prev => prev.filter(id => id !== postId));
  };

  const handleRegister = (email: string, password: string): boolean => {
    const userExists = users.find(u => u.email === email);
    if (userExists) {
      alert('User with this email already exists');
      return false;
    }
    setUsers(prev => [...prev, { email, password }]);
    return true;
  };

  const handleLogin = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user || (email === 'admin@example.com' && password === '123456')) {
      setIsLoggedIn(true);
      setCurrentUser(email);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
  };

  return (
    <Routes>
      <Route 
        path="/register" 
        element={
          isLoggedIn ? (
            <Navigate to="/blog" replace />
          ) : (
            <Register onRegister={handleRegister} />
          )
        } 
      />
      <Route 
        path="/success" 
        element={<SuccessLogin />} 
      />
      <Route 
        path="/login" 
        element={
          isLoggedIn ? (
            <Navigate to="/blog" replace />
          ) : (
            <Login onLogin={handleLogin} />
          )
        } 
      />
      <Route 
        path="/blog" 
        element={
          isLoggedIn ? (
            <Blog
              userEmail={currentUser}
              onLogout={handleLogout}
              favoriteIds={favoriteIds}
              likedIds={likedIds}
              dislikedIds={dislikedIds}
              onToggleFavorite={handleToggleFavorite}
              onToggleLike={handleToggleLike}
              onToggleDislike={handleToggleDislike}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
      <Route 
        path="/post/:id" 
        element={
          isLoggedIn ? (
            <PostPage
              posts={ALL_POSTS}
              favoriteIds={favoriteIds}
              likedIds={likedIds}
              dislikedIds={dislikedIds}
              onToggleFavorite={handleToggleFavorite}
              onToggleLike={handleToggleLike}
              onToggleDislike={handleToggleDislike}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
      <Route path="/" element={<Navigate to={isLoggedIn ? "/blog" : "/login"} replace />} />
    </Routes>
  );
}

export default App;