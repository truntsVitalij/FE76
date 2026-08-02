import { type FC } from 'react';
import { Link } from 'react-router-dom';
import Title from '../../shared/ui/Title';
import SignInForm from '../../components/SignInForm';
import styles from './SignIn.module.css';


const SignIn: FC = () => {
  return (
    <div className={styles.card}>
      <Title level={2} className={styles.title}>Sign In</Title>
      <SignInForm />
      <p className={styles.hint}>
        Don't have an account?{' '}
        <Link to="/signup" className={styles.link}>Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;