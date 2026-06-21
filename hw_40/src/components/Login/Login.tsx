import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../Button';
import { Input } from '../Input';
import styles from './Login.module.css';
import type { LoginProps } from './types';

export const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (email === 'user@mail.com' && password === '12345') {
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/success');
  } else {
    alert('Неверный логин или пароль!');
  }
};

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>Back to home</Link>
      <h1 className={styles.title}>Sign In</h1>
      
      <div className={styles.card}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <Input label="Email" type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <Input label="Password" type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <a href="#" className={styles.forgotPassword}>Forgot password?</a>
          </div>
          <Button type="submit" fullWidth>Sign In</Button>
        </form>
        <div className={styles.footerText}>Don't have an account? <span>Sign Up</span></div>
      </div>
    </div>
  );
};