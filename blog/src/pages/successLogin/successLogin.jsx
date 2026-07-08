import { useNavigate } from "react-router-dom";

function SuccessLogin() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Вы успешно вошли!</h2>

      <button onClick={() => navigate("/blog")}>
        Перейти к постам
      </button>
    </div>
  );
}

export default SuccessLogin;