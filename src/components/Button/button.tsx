import styles from './button.module.css'

import type {FC, PropsWithChildren} from 'react'

interface IButtonProps extends PropsWithChildren {
    type?: 'primary' | 'secondary' | 'tertiary';
    outlined?: boolean;
}

const Button: FC<IButtonProps> = ({
    children,
    type="primary", 
    outlined = false
}) => {
    return (
    <button 
    className={`${styles.button} ${styles[type]} ${outlined ? styles.outlined : ""}`}>
        {children}</button>)
}

export default Button