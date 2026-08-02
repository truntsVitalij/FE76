import type {  FC, PropsWithChildren, SubmitEventHandler } from 'react';
import styles from './FormContainer.module.css';

interface IFormContainerProps {
  onSubmit: SubmitEventHandler
  className?: string;
}

const FormContainer: FC<PropsWithChildren<IFormContainerProps>> = ({
  children,
  onSubmit,
  className = '',
}) => {
  return (
    <form onSubmit={onSubmit} className={`${styles.form} ${className}`}>
      {children}
    </form>
  );
};

export default FormContainer;