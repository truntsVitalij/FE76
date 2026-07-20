import React, { useState, type FC } from "react";
import { AuthLayout } from "../../components/AuthLayout";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container } from "../../components/Container";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import styles from "./ResetPasswordNextPage.module.css";

const ResetPasswordNextPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email ?? "");
  const isDark = false; //временно
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem("user", email); //временно
    navigate("/new-password");
  };

  return (
    <Container>
      <AuthLayout
        title="Reset password"
        dark={isDark}
        description=<>
          You will receive an email{" "}
          <span className={styles.email}> {email} </span> with a link to reset
          your password!{" "}
        </> 
      >
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={setEmail}
          />

          <Button type="submit"> Go to home </Button>
        </form>
      </AuthLayout>
    </Container>
  );
};

export default ResetPasswordNextPage;
