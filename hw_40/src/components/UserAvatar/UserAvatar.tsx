import { getInitials } from '../../utils/getInitials';
import styles from './UserAvatar.module.css';

interface UserAvatarProps {
  name?: string;
  showName?: boolean;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ name, showName = false }) => {
  const initials = getInitials(name);

  return (
    <div className={styles.avatar}>
      <div className={styles.avatarCircle}>{initials}</div>
      {showName && <span className={styles.avatarName}>{name}</span>}
    </div>
  );
};