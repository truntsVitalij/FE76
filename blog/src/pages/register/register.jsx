import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    localStorage.setItem("user", JSON.stringify(user));

    alert("Регистрация прошла успешно!");

    navigate("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Регистрация</h2>

      <input
        type="text"
        name="name"
        placeholder="Имя"
        value={user.name}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        type="password"
        name="password"
        placeholder="Пароль"
        value={user.password}
        onChange={handleChange}
      />

      <br />
      <br />

      <button type="submit">Зарегистрироваться</button>

      <p>
        Уже есть аккаунт? <Link to="/">Войти</Link>
      </p>
    </form>
  );
}

export default Register;