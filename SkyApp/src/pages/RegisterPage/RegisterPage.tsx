import React, { useState, type FC } from "react";
import { AuthLayout } from "../../components/AuthLayout";

import { useNavigate, useLocation } from "react-router-dom";
import { Container } from "../../components/Container";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import styles from "./RegisterPage.module.css";

const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const location = useLocation();
  const passwordChanged = location.state?.passwordChanged ?? false;

  const isDark = false; //временно
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem("user", email); //временно
    navigate("/sign-in");
  };

  return (
    <Container>
      <AuthLayout
        title="Sign Up"
        dark={isDark}
        description={
          passwordChanged ? "Your password has been changed!" : undefined
        }
        footerText="Already have an account?"
        footerLinkText="Sign In"
        footerLinkTo="/sign-in"
      >
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={setName}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={setEmail}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={setPassword}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            value={ConfirmPassword}
            onChange={setConfirmPassword}
          />

          <Button type="submit"> Sign Up</Button>
        </form>
      </AuthLayout>
    </Container>
  );
};

export default RegisterPage;

//работа по урокам (для себя)
// import type { FC } from "react";
// // import type { TAppPages } from '../../App';
// import styles from "./RegisterPage.module.css";
// import { useNavigate } from "react-router-dom";

// // interface ISingUpProps {
// //     onClick: (page: TAppPages) => void;
// // }

// // const RegisterPage: FC<ISingUpProps> = ({onClick}) => {
// const RegisterPage: FC = () => {
//   const navigate = useNavigate();
//   const handleClick = () => {
//     // onClick('SignIn')
//     navigate(-1);
//   };

//   return (
//     <div>
//       <h2> You need a registration </h2>
//       <button onClick={handleClick}> return </button>
//     </div>
//   );
// };

// export default RegisterPage;
