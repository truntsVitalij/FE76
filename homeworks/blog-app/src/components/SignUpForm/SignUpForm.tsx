import { type FC, useState, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { login } from '../../store/actions';
import Input from '../../shared/ui/Input';
import Button from '../../shared/ui/Button';
import FormContainer from '../../shared/ui/FormContainer';
import styles from './SignUpForm.module.css';
import { isValidEmail, isValidPassword, isEmptyString } from '../../shared/utils/validation';

const SignUpForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    if (isEmptyString(name)) {
      setErrors({ name: 'Name is required.' });
      return;
    }
   
    if (!isValidEmail(email)) {
      setErrors({ email: 'Enter a valid email address.' });
      return;
    }
    if (!isValidPassword(password)) {
      setErrors({ password: 'Password must be at least 6 characters.' });
      return;
    }
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match.' });
      return;
    }

    setErrors({});

  
    dispatch(login({ email, name }));
   
   setTimeout(() => {
  navigate('/success', { replace: true });
}, 0);

  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        id="name"
        label="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        placeholder="Your name"
        error={errors.name}
        className={styles.formInput}
      />
      <Input
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="example@mail.com"
        error={errors.email}
        className={styles.formInput}
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
        className={styles.formInput}
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
        className={styles.formInput}
      />
      <Button type="submit" variant="primary" className={styles.submitBtn}>
        Sign Up
      </Button>
    </FormContainer>
  );
};

export default SignUpForm;