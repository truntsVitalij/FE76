import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { SuccessLogin } from './pages/SuccessLogin';
import { Blog } from './pages/blog';

interface User {
  email: string;
  password: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleRegister = (email: string, password: string) => {
    setUsers(prev => [...prev, { email, password }]);
  };

  const handleLogin = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user || (email === 'admin@example.com' && password === '123456')) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  return (
    <Routes>
      <Route 
        path="/register" 
        element={<Register onRegister={handleRegister} />} 
      />
      <Route 
        path="/success" 
        element={<SuccessLogin />} 
      />
      <Route 
        path="/login" 
        element={<Login onLogin={handleLogin} />} 
      />
      <Route 
        path="/blog" 
        element={
          isLoggedIn ? <Blog /> : <Navigate to="/login" replace />
        } 
      />
      <Route 
        path="/" 
        element={<Navigate to="/login" replace />} 
      />
    </Routes>
  );
}

export default App;