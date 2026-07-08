import { useNavigate } from "react-router-dom";

function SuccessLogin(){

    const navigate = useNavigate();

    return(

        <div>

            <h2>You have logged in successfully!</h2>

            <button
                onClick={()=>navigate("/blog")}
            >
                Go to Blog
            </button>

        </div>

    )

}

export default SuccessLogin;