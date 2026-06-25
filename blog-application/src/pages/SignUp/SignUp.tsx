import type { FC } from "react"
import type { TAppPages } from "../../App"

interface ISignUpProps {
    onClick: (page: TAppPages) => void
}

const SignUp: FC<ISignUpProps> = ({ onClick }) => {

    const handleClick = () => {
        console.log('Отмена регистрации')

        onClick('SignIn')
    }

    return (
        <div>
            <h2>Пожалуйста, пройдите регистрацию</h2>
            <button onClick={handleClick}> Вернутся назад </button>
        </div>
    )
}

export default SignUp;