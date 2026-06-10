import type { FC, PropsWithChildren } from "react"

import styles from './button.module.css'

interface IButtonProps extends PropsWithChildren {
    type?: 'primary' | 'secondary' | 'tertiary';
    size?: 'small' | 'medium' | 'large';
    outlined?: boolean;
}

export const Button: FC<IButtonProps> = ({ children, type = 'primary', size = 'medium', outlined = false }) => {

    return <button className={`${styles.button} ${styles[type]}`}>{children}</button>
}

