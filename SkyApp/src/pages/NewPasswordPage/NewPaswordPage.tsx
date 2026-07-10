import React, { useState, type FC } from "react";
import { AuthLayout } from "../../components/Layouts/AuthLayout";

import { Link, useNavigate } from "react-router-dom";
import { Container } from "../../components/Container";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import styles from "./NewPaswordPage.module.css";
import ResetPasswordNextPage from "../ResetPasswordNextPage";

const NewPasswordPage: FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isDark = false; //временно
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem("user", password); //временно
    navigate("/sign-up", { state: { passwordChanged: true } }); //not shure ResetPasswordNextPage
  };

  return (
    <Container>
      <AuthLayout title="New Password" dark={isDark}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Password"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={setPassword}
          />
          <Input
            label="ConfirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />

          <Button type="submit"> Set password</Button>
        </form>
      </AuthLayout>
    </Container>
  );
};

export default NewPasswordPage;
