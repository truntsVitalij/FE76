import { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./SignIn.css";

type SignInProps = {
  onSignIn: (email: string, password: string) => void;
  onSwitchToSignUp: () => void;
};

function SignIn({ onSignIn, onSwitchToSignUp }: SignInProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password && validateEmail(email)) {
      onSignIn(email, password);
    }
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit} className="signin-form">
        <h1>Sign In</h1>

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
          placeholder="Your email"
          error={emailError}
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />

        <a href="#" className="forgot-password">
          Forgot password?
        </a>

        <Button
          onClick={handleSubmit}
          variant="primary"
          size="large"
          type="submit"
        >
          Sign In
        </Button>

        <p className="signup-link">
          Don't have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSwitchToSignUp();
            }}
          >
            Sign up
          </a>
        </p>
      </form>

      <footer className="signin-footer">© 2026</footer>
    </div>
  );
}

export default SignIn;
