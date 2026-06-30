import type {FC} from 'react';
import styles from './LoginPage.module.css'
import type { TAppPages } from '../../App';

interface ISingInProps {
    onClick: (page:TAppPages) => void;
}

const LoginPage: FC<ISingInProps> = ({onClick}) => {
    const handleClick = () => {
        onClick('SignUp');
    }

    return (
        <div className={styles.page}> 
            <h2> LoginPage / SignIn </h2>
            <p> Don't have ac account ? 
                <button onClick={handleClick}> Sing Up </button>
            </p>
         </div>
    )
}

export default LoginPage;