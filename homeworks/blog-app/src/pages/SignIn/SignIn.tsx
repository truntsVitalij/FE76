import React from 'react';
import SignInForm from '../../components/SignInForm';
import styles from './SignIn.module.css';

interface ISignInProps {
  onLoginSuccess: () => void;
  onSwitchToSignUp: () => void; 
}

const SignIn: React.FC<ISignInProps> = ({ onLoginSuccess, onSwitchToSignUp }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Sign In</h2>
      <SignInForm onSuccess={onLoginSuccess} />
      <p className={styles.hint}>
        Don't have an account?{' '}
        <span className={styles.link} onClick={onSwitchToSignUp}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default SignIn;