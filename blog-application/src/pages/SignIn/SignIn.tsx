import { useEffect, type FC } from 'react';
import { Link, useMatch, useNavigate } from 'react-router';

import styles from './SignIn.module.css';

const SignIn: FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/blogs');
        }
    }, [])

    const match = useMatch('/sign-in');
    console.log(match, 'match');
    const handleSignInClick = () => {
        localStorage.setItem('isLogin', 'true')
        // проверяем credentionals

        // переключится на страницу blog
        navigate('/blogs');
    }

    useEffect(() => {
        // есть ли в локал сторейдж авторизация.
        // если есть - меняем activePage onAlreadyAuthorized();
    }, []);

    return (
        <div className={styles.page}>
            <h2>Sign In </h2>
            <button onClick={handleSignInClick}>Sign in</button>

            <p>Don't have an account? <Link className={`${styles.link} ${match?.pathname === '/sign-up' ? styles.active : ''}`} to='/sign-up'>Sign up</Link></p>
        </div>
    )
}

export default SignIn;


// const Link = ({ to, children }: { to: string, children: React.ReactNode }) => {
//     // кастомная реализация ссылки от react-router
//     return <a href={to}>{children}</a>
// }