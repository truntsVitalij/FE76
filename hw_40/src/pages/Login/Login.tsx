import { type FC, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SignInForm } from '../../components/SignInForm';
import styles from './Login.module.css';

interface LoginProps {
  onLogin: (email: string, password: string) => boolean;
}

export const Login: FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    setError('');

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    const success = onLogin(email, password);

    if (success) {
      navigate('/blog');
    } else {
      setError('Wrong email or password');
    }
  };

  return (
    <div className={styles.container}>
      <Link to="/register" className={styles.backLink}>← Back</Link>
      <h1 className={styles.title}>Sign In</h1>
      <div className={styles.card}>
        <SignInForm
          email={email}
          password={password}
          error={error}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={handleSubmit}
        />
        <p className={styles.footerText}>
          Don't have an account?{' '}
          <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};