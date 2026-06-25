import { type FC, type FormEvent } from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import styles from './SignInForm.module.css';

export interface SignInFormValues {
  email: string;
  password: string;
}

interface SignInFormProps {
  email: string;
  password: string;
  error?: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
}

export const SignInForm: FC<SignInFormProps> = ({
  email,
  password,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.formGroup}>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
        />
        <a href="#" className={styles.forgotPassword}>Forgot password?</a>
      </div>
      <Button type="submit" fullWidth>Sign In</Button>
    </form>
  );
};