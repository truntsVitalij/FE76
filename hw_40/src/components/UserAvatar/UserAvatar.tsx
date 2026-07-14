import React from 'react';
import styles from './UserAvatar.module.css';

interface UserAvatarProps {
  showName?: boolean;
  email?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ showName = false, email = '' }) => {
  const initials = email ? email.substring(0, 2).toUpperCase() : '??';

  return (
    <div className={styles.userContainer}>
      <div className={styles.avatar}>{initials}</div>
      {showName && <span className={styles.userName}>{email}</span>}
    </div>
  );
};