import type { FC, ButtonHTMLAttributes, PropsWithChildren } from "react";
import styles from "./Button.module.css";

interface IButtonProps extends PropsWithChildren {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "secondary2";
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button: FC<IButtonProps> = ({
  type,
  onClick,
  className,
  children,
  variant = "primary",
  disabled = false,
  fullWidth = false,
  ...props
}) => {
  const classNames = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : "",
    disabled ? styles.disabled : "",
    className || ""
  ]
    .filter(Boolean)
    .join(" "); //массив button primary fullWidth
  return (
    <button {...props} className={classNames} onClick={onClick}>{children}</button>
  );
};

// //работа по урокам (для себя)
// type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

// export const Button: FC<ButtonProps> = ({
//     children,
//     ...props
// }) => {
//     return(
//         <button className={styles.button}
//         {...props}> {children} </button>
//     )
// }

//или
//  function Button({onClick, children} : IButtonProps) {
//     return <button onClick={onClick} className={styles.button}> {children} </button>
//  }
