import { type FC, type ButtonHTMLAttributes, type PropsWithChildren } from 'react';
import styles from './Button.module.css';

type TButtonVariant = 'primary' | 'secondary' | 'icon' | 'text';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TButtonVariant;
}

const Button: FC<PropsWithChildren<IButtonProps>> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const combinedClass = [styles[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={combinedClass} {...props}>
      {children}
    </button>
  );
};

export default Button;