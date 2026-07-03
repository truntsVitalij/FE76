import { type FC, useState } from 'react';
import Input from '../Input';
import styles from './SignUpForm.module.css';

interface ISignUpFormProps {
  onSuccess: () => void;
}

const SignUpForm: FC<ISignUpFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrors({ email: 'Enter a valid email address.' });
      return;
    }
    if (password.length < 6) {
      setErrors({ password: 'Password must be at least 6 characters.' });
      return;
    }
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match.' });
      return;
    }

    setErrors({});
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.fields}>
      <Input
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="example@mail.com"
        error={errors.email}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Min. 6 characters"
        error={errors.password}
      />
      <Input
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        placeholder="Confirm password"
        error={errors.confirmPassword}
      />
      <button type="submit" className={styles.submitBtn}>
        Sign Up
      </button>
      </div>
    </form>
  );
};

export default SignUpForm;