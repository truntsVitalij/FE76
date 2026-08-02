import { type FC } from 'react';
import { useAppSelector } from '../../store';
import Modal from '../../shared/ui/Modal';
import Button from '../../shared/ui/Button';
import Title from '../../shared/ui/Title';
import styles from './ProfileModal.module.css';

interface IProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: FC<IProfileModalProps> = ({ isOpen, onClose }) => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <Title level={2} className={styles.title}>Your profile</Title>
        <div className={styles.info}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <Button variant="primary" onClick={onClose} className={styles.okBtn}>
          OK
        </Button>
      </div>
    </Modal>
  );
};

export default ProfileModal;