import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Login } from './components/Login/Login';
import { SuccessLogin } from './components/SuccessLogin/SuccessLogin';
import { Blog } from './components/Blog/Blog';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={
            localStorage.getItem('isLoggedIn') 
              ? <Navigate to="/blog" replace /> 
              : <Navigate to="/login" replace />
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<SuccessLogin />} />
          <Route path="/blog" element={
            <ProtectedRoute><Blog /></ProtectedRoute>
          } />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
export default App;