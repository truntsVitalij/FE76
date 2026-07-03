import { type FC, useState } from 'react';
import Input from '../Input';
import styles from './SignInForm.module.css';

interface ISignInFormProps {
  onSuccess: () => void;
}

const SignInForm: FC<ISignInFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

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

    setErrors({});
    localStorage.setItem('isLoggedIn', 'true');
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
      <button type="submit" className={styles.submitBtn}>
        Sign In
      </button>
      </div>
    </form>
  );
};

export default SignInForm;