import type { FC, PropsWithChildren } from "react"
import styles from './button.module.css'

interface IButtonProps extends PropsWithChildren {
    onClick: () => void;
    variant: 'primary' | 'secondary';
}

export const Button: FC<IButtonProps> = ({ children, onClick, variant }) => {
    return (
        <button onClick={onClick} className={`${styles.button} ${styles[variant]}`}>
            {children}
        </button>
    )
}