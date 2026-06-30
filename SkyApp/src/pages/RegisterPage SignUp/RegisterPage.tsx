import type { FC } from 'react';
import type { TAppPages } from '../../App';
import styles from './RegisterPage.module.css'

interface ISingUpProps {
    onClick: (page: TAppPages) => void;
}
const RegisterPage: FC<ISingUpProps> = ({onClick}) => {
    const handleClick = () => {
        onClick('SignIn')
    }

    return (
        <div> 
            <h2> You need a registration </h2> 
            <button onClick={handleClick}> return </button>
        </div>
    )
}

export default RegisterPage;