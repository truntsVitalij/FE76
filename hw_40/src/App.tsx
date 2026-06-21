import React from 'react';
import type { FC, PropsWithChildren } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { SuccessLogin } from './pages/SuccessLogin';
import { Blog } from './pages/blog';

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  if (!localStorage.getItem('isLoggedIn')) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const GuestRoute: FC<PropsWithChildren> = ({ children }) => {
  if (localStorage.getItem('isLoggedIn')) return <Navigate to="/blog" replace />;

};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<GuestRoute><Navigate to="/login" replace /></GuestRoute>} />
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