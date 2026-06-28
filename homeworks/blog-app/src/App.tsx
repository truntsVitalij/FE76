import { useState } from 'react';
import Layout from './components/Layout';
import SignIn from './pages/SignIn';
import SuccessLogin from './pages/SuccessLogin';
import Blog from './pages/Blog';
import posts from './data/posts';

type PageType = 'signin' | 'success' | 'blog';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>(() => {
    const isAuth = localStorage.getItem('isLoggedIn') === 'true';
    return isAuth ? 'blog' : 'signin';
  });

  const handleLoginSuccess = () => {
    setCurrentPage('success');
  };

  const handleGoToBlog = () => {
    setCurrentPage('blog');
  };

  return (
    <Layout>
      {currentPage === 'signin' && (
        <SignIn onLoginSuccess={handleLoginSuccess} />
      )}
      {currentPage === 'success' && (
        <SuccessLogin onGoToBlog={handleGoToBlog} />
      )}
      {currentPage === 'blog' && (
        <Blog posts={posts} title="Space Blog" />
      )}
    </Layout>
  );
}

export default App;