import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (
      user &&
      email === user.email &&
      password === user.password
    ) {
      localStorage.setItem("isAuth", "true");
      navigate("/success");
    } else {
      alert("Неверный email или пароль");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Вход</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button type="submit">Войти</button>

      <p>
        Нет аккаунта? <Link to="/register">Регистрация</Link>
      </p>
    </form>
  );
}

export default Login;