import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../../shared/ui/Title';
import Button from '../../shared/ui/Button';
import styles from './SuccessLogin.module.css';


const SuccessLogin: FC = () => {
 
  const navigate = useNavigate();

  return (
    
    <div className={styles.card}>
      <Title level={2} className={styles.title}>Success</Title>
      <div className={styles.box}>
        <p className={styles.text}>
          Email confirmed.<br />
          Your login was successful.
        </p>
        <Button variant="primary" onClick={() => navigate('/blog')}>
          Go to home
        </Button>
      </div>
    </div>
  );
};

export default SuccessLogin;