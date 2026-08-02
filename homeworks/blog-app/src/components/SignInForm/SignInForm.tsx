import { type FC, useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { login } from "../../store/actions";
import Input from "../../shared/ui/Input";
import Button from "../../shared/ui/Button";
import FormContainer from "../../shared/ui/FormContainer";
import styles from "./SignInForm.module.css";
import { isValidEmail, isValidPassword } from "../../shared/utils/validation";

const SignInForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setErrors({ email: "Enter a valid email address." });
      return;
    }
    if (!isValidPassword(password)) {
      setErrors({ password: "Password must be at least 6 characters." });
      return;
    }

    setErrors({});

    const name = email.split("@")[0];
    dispatch(login({ email, name }));

    setTimeout(() => {
      navigate("/success", { replace: true });
    }, 0);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
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
      <Button type="submit" variant="primary" className={styles.submitBtn}>
        Sign In
      </Button>
    </FormContainer>
  );
};

export default SignInForm;
