//Страница Login. Тут пользователь вводит логин и пароль.

import { useState } from "react";
// import { Layout } from "../components/Layout/Layout";

type LoginPageProps = {
    setPage: ( value: "login" | "success" | "blog") => void;
}

export const LoginPage = ({ setPage, }: LoginPageProps ) =>  {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (
            email === "admin@gmail.com" &&
            password === "11111"
        ) {
        localStorage.setItem (
        "isAuth", 
        "true"
    );  
    setPage("success");
}
    };
    return (
        <>
        <h2> Login </h2>
        <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />  
        <input   type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}> Login </button>
        </>
    );
}
