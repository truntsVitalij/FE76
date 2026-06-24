import { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./SignUp.css";

type SignUpProps = {
  onSignUp: (email: string, password: string, name: string) => void;
  onSwitchToSignIn: () => void;
};

function SignUp({ onSignUp, onSwitchToSignIn }: SignUpProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (
      name &&
      email &&
      password &&
      validateEmail(email) &&
      validatePassword(password)
    ) {
      onSignUp(email, password, name);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h1>Sign Up</h1>

        <Input
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
          placeholder="Enter your email"
          error={emailError}
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          placeholder="Create a password"
          error={passwordError}
        />

        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
        />

        <Button
          onClick={handleSubmit}
          variant="primary"
          size="large"
          type="submit"
        >
          Create Account
        </Button>

        <p className="signin-link">
          Already have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSwitchToSignIn();
            }}
          >
            Sign In
          </a>
        </p>
      </form>

      <footer className="signup-footer">© 2026</footer>
    </div>
  );
}

export default SignUp;
