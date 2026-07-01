import { useState } from 'react';
import Layout from './components/Layout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SuccessLogin from './pages/SuccessLogin';
import Blog from './pages/Blog';
import posts from './data/posts';

type PageType = 'signin' | 'signup' | 'success' | 'blog';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>(() => {
    const isAuth = localStorage.getItem('isLoggedIn') === 'true';
    return isAuth ? 'blog' : 'signin';
  });

  const handleLoginSuccess = () => setCurrentPage('success');
  const handleSignUpSuccess = () => setCurrentPage('success');
  const handleGoToBlog = () => setCurrentPage('blog');
  const goToSignIn = () => setCurrentPage('signin');
  const goToSignUp = () => setCurrentPage('signup');

  return (
    <Layout>
      {currentPage === 'signin' && (
        <SignIn onLoginSuccess={handleLoginSuccess} onSwitchToSignUp={goToSignUp} />
      )}
      {currentPage === 'signup' && (
        <SignUp onSignUpSuccess={handleSignUpSuccess} onSwitchToSignIn={goToSignIn} />
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