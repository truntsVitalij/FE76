import React from 'react';
import SignUpForm from '../../components/SignUpForm';
import styles from './SignUp.module.css';

interface SignUpProps {
  onSignUpSuccess: () => void;
  onSwitchToSignIn: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUpSuccess, onSwitchToSignIn }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Sign Up</h2>
      <SignUpForm onSuccess={onSignUpSuccess} />
      <p className={styles.hint}>
        Already have an account?{' '}
        <span className={styles.link} onClick={onSwitchToSignIn}>
          Sign In
        </span>
      </p>
    </div>
  );
};

export default SignUp;