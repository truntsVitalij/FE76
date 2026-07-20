import type { FC, ButtonHTMLAttributes } from 'react';
import styles from "./Button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>; 

export const Button: FC<ButtonProps> = ({
    children,
    ...props
}) => {
    return(
        <button className={styles.button}
        {...props}> {children} </button>
    )
}