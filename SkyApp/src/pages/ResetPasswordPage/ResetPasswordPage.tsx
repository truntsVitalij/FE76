import React, { useState, type FC } from "react";
import { AuthLayout } from "../../components/Layouts/AuthLayout";

import { useNavigate } from "react-router-dom";
import { Container } from "../../components/Container";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import styles from "./ResetPasswordPage.module.css";

const ResetPasswordPage: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const isDark = false; //временно
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem("user", email); //временно
    navigate("/reset-password-next", { state: { email } }); //change
  };

  return (
    <Container>
      <AuthLayout title="Reset password" dark={isDark}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={setEmail}
          />

          <Button type="submit"> Reset </Button>
        </form>
      </AuthLayout>
    </Container>
  );
};

export default ResetPasswordPage;
