import { type FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignInForm } from '../../components/SignInForm';
import styles from './Login.module.css';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    setError('');

    if (email !== 'admin@example.com' || password !== '123456') {
      setError('Wrong email or password');
      return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    navigate('/success');
  };

  return (
    <>
      <a className={styles.backLink}>← Back</a>
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
          Don't have an account? <span>Sign Up</span>
        </p>
      </div>
    </>
  );
};