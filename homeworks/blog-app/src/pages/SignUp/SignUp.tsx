import { type FC } from 'react';
import { Link } from 'react-router-dom';
import Title from '../../shared/ui/Title';
import SignUpForm from '../../components/SignUpForm';
import styles from './SignUp.module.css';

const SignUp: FC = () => {
  return (
    <div className={styles.card}>
      <Title level={2} className={styles.title}>Sign Up</Title>
      <SignUpForm />
      <p className={styles.hint}>
        Already have an account?{' '}
        <Link to="/signin" className={styles.link}>Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;