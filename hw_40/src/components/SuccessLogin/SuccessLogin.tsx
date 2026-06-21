import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../Button';
import styles from './SuccessLogin.module.css';
import type { SuccessLoginProps } from './types';

export const SuccessLogin: React.FC<SuccessLoginProps> = () => {
  const navigate = useNavigate();
  const handleGoToBlog = () => { navigate('/blog'); };
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>Back to home</Link>
      <h1 className={styles.title}>Success</h1>
      <div className={styles.card}>
        <div className={styles.text}><strong>Email confirmed.</strong> Your registration is now completed.</div>
        <Button onClick={handleGoToBlog} fullWidth>Go to home</Button>
      </div>
    </div>
  );
};