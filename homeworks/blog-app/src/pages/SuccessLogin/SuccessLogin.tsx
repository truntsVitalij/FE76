import React from 'react';
import styles from './SuccessLogin.module.css';
import Title from '../../components/Title/Title';

interface ISuccessLoginProps {
  onGoToBlog: () => void;
}

const SuccessLogin: React.FC<ISuccessLoginProps> = ({ onGoToBlog }) => {
  return (
    <div className={styles.card}>
      <Title level={2} className={styles.title}>Success</Title>
      
      <div className={styles.box}>
        <p className={styles.text}>
          Email confirmed.<br />
          Your login was successful.
        </p>
        
        <button onClick={onGoToBlog} className={styles.homeBtn}>
          Go to home
        </button>
      </div>
    </div>
  );
};


export default SuccessLogin;