import React from 'react';
import SignUpForm from '../../components/SignUpForm';
import styles from './SignUp.module.css';
import Title from '../../components/Title/Title';
interface SignUpProps {
  onSignUpSuccess: () => void;
  onSwitchToSignIn: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUpSuccess, onSwitchToSignIn }) => {
  return (
    <div className={styles.card}>
      <Title level={2} className={styles.title}>Sign Up</Title>
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