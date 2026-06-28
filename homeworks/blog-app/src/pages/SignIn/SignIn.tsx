import React from 'react';
import SignInForm from '../../components/SignInForm';
import styles from './SignIn.module.css';

interface SignInProps {
  onLoginSuccess: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onLoginSuccess }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Sign In</h2>
      <SignInForm onSuccess={onLoginSuccess} />
    </div>
  );
};

export default SignIn;