import type { FC } from "react"
import { useNavigate } from "react-router";


const SignUp: FC = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        console.log('Отмена регистрации');
        navigate(-2);

    }

    return (
        <div>
            <h2>Пожалуйста, пройдите регистрацию</h2>
            <button onClick={handleClick}> Вернуться назад </button>
        </div>
    )
}

export default SignUp;