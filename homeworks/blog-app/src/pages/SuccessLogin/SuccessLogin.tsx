import React from 'react';
import styles from './SuccessLogin.module.css';

interface ISuccessLoginProps {
  onGoToBlog: () => void;
}

const SuccessLogin: React.FC<ISuccessLoginProps> = ({ onGoToBlog }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Success</h2>
      
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