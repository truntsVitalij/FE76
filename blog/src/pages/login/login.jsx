import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EMAIL = "admin@mail.com";
const PASSWORD = "123456";

function Login(){

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const navigate = useNavigate();

    function handleSubmit(e){

        e.preventDefault();

        if(email===EMAIL && password===PASSWORD){

            localStorage.setItem("isAuth","true");

            navigate("/success");
        }
        else{
            alert("Wrong login or password");
        }

    }

    return(

        <form onSubmit={handleSubmit}>

            <input
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />

            <br/><br/>

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />

            <br/><br/>

            <button>Login</button>

        </form>

    )

}

export default Login;