import React from 'react';
import SignInForm from '../../components/SignInForm';
import styles from './SignIn.module.css';
import Title from '../../components/Title/Title';

interface ISignInProps {
  onLoginSuccess: () => void;
  onSwitchToSignUp: () => void; 
}

const SignIn: React.FC<ISignInProps> = ({ onLoginSuccess, onSwitchToSignUp }) => {
  return (
    <div className={styles.card}>
      <Title level={2} className={styles.title}>Sign in</Title>
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