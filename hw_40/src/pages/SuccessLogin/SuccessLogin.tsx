import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Button } from '../../components/Button';
import styles from './SuccessLogin.module.css';
import type { SuccessLoginProps } from './types';

export const SuccessLogin: React.FC<SuccessLoginProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'your email';

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>Back to home</Link>
      <h1 className={styles.title}>Success</h1>
      <div className={styles.card}>
        <div className={styles.text}>
          <strong>{email} confirmed.</strong>
          Your registration is now completed.
        </div>
        <Button onClick={handleGoToLogin} fullWidth>Go to Sign In</Button>
      </div>
    </div>
  );
};