import React, { useState, type FC } from "react";
import { AuthLayout } from "../../components/Layouts/AuthLayout";

import { Link, useNavigate } from "react-router-dom";
import { Container } from "../../components/Container";
import { Input } from "../../components/Input";
import { Button } from "../../shared/ui/Button";

import styles from "./LoginPage.module.css";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isDark = false; //временно
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem("user", email); //временно
    navigate("/blog");
  };

  return (
    <Container>
      <AuthLayout
        title="Sign In"
        dark={isDark}
        footerText="Don't have an account?"
        footerLinkText="Sign Up"
        footerLinkTo="/sign-up"
      >
        <form className={styles.form} onSubmit={handleSubmit}>
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

          <div className={styles.actions}>
            <Link to="/reset-password" className={styles.forgot}>
              {" "}
              Forgot password?{" "}
            </Link>{" "}
          </div>

          <Button type="submit"> Sign In</Button>
        </form>
      </AuthLayout>
    </Container>
  );
};

export default LoginPage;

//работа по урокам (для себя)
// import React, { useEffect, useState, type FC } from "react";
// import { Link, useNavigate } from "react-router-dom";

// import styles from "./LoginPage.module.css";

// // import type { TAppPages } from "../../App";

// // interface ISingInProps {
// //   onClick: (page: TAppPages) => void;
// // }

// // const LoginPage: FC<ISingInProps> = ({ onClick }) => {

// const LoginPage: FC = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // const handleClick = () => {
//   //   // onClick("BlogList");
//   //   navigate("/sing-up");
//   // };

//   const handleSignInClick = (e: React.FormEvent) => {
//     e.preventDefault();

//     localStorage.setItem("user", email);

//     // проверяем credentionals(логин, пароль)
//     //переключиться на страницу blog
//     navigate("/blog");
//   };
//   useEffect(() => {
//     //если в локал сайдж авторизация
//     //если есть - меняем activePage onAlreadyAutorizied()
//   }, []);

//   return (
//     <section className={styles.page}>
//       <div className={styles.wrapper}>
//         <button className={styles.back} onClick={() => navigate("/blog")}>
//           {" "}
//           Back to home{" "}
//         </button>
//         <h2 className={styles.title}> SignIn </h2>

//         <form className={styles.form} onSubmit={handleSignInClick}>
//           <label className={styles.label}>
//             {" "}
//             Password
//             <input
//               type="password"
//               placeholder="Your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </label>

//           <label className={styles.label}>
//             {" "}
//             Email
//             <input
//               type="email"
//               placeholder="Your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </label>

//           <button
//             className={styles.submit}
//             type="submit"
//             onClick={handleSignInClick}
//           >
//             {" "}
//             Sign in{" "}
//           </button>

//           <p className={styles.text}>
//             {" "}
//             Don't have ac account ?
//             {/* <button onClick={handleClick}> Sign Up </button> */}
//             <Link to="sign-up" className={styles.link}>
//               Sign Up
//             </Link>
//           </p>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default LoginPage;
