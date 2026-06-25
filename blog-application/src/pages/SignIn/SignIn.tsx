import { useEffect, type FC } from 'react';
import styles from './SignIn.module.css';
import type { TAppPages } from '../../App';

interface ISignInProps {
    onClick: (page: TAppPages) => void;
    onAlreadyAuthorized: () => void;
}

const SignIn: FC<ISignInProps> = ({ onClick }) => {
    const handleClick = () => {
        console.log('Попытка перейти в регистрацию');

        onClick('SignUp');
    }

    useEffect(() => {
        // есть ли в локал сторейдж авторизация.
        // если есть - меняем activePage onAlreadyAuthorized();
    }, []);

    return (
        <div className={styles.page}>
            <h2>Sign In </h2>
            <p>Don't have an account? <button onClick={handleClick}>Sign up</button></p>
        </div>
    )
}

export default SignIn;