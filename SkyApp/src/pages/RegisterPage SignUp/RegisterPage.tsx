import type { FC } from "react";
// import type { TAppPages } from '../../App';
import styles from "./RegisterPage.module.css";
import { useNavigate } from "react-router-dom";

// interface ISingUpProps {
//     onClick: (page: TAppPages) => void;
// }

// const RegisterPage: FC<ISingUpProps> = ({onClick}) => {
const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    // onClick('SignIn')
    navigate(-1);
  };

  return (
    <div>
      <h2> You need a registration </h2>
      <button onClick={handleClick}> return </button>
    </div>
  );
};

export default RegisterPage;
