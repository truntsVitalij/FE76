import { useEffect, type FC } from "react";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
// import type { TAppPages } from "../../App";

// interface ISingInProps {
//   onClick: (page: TAppPages) => void;
// }

// const LoginPage: FC<ISingInProps> = ({ onClick }) => {
const LoginPage: FC = () => {
  const navigate = useNavigate();

  // const handleClick = () => {
  //   // onClick("BlogList");
  //   navigate("/sing-up");
  // };

  const handleSignInClick = () => {
    // проверяем credentionals(логин, пароль)
    //переключиться на страницу blog
    navigate("/blog");
  };
  useEffect(() => {
    //если в локал сайдж авторизация
    //если есть - меняем activePage onAlreadyAutorizied()
  }, []);

  return (
    <div className={styles.page}>
      <button> Back to home </button>
      <h2> SignIn </h2>
      <div className="registration_block">
        <button onClick={handleSignInClick}> Sing in </button>
        <p>
          Don't have ac account ?
          {/* <button onClick={handleClick}> Sing Up </button> */}
          <Link className={styles.link} to='/sign-up'> Sing Up </Link> 
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
