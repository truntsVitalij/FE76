import React from 'react';
import styles from './UserAvatar.module.css';

interface UserAvatarProps {
  showName?: boolean;
  name?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ showName = false, name = '' }) => {
  const initials = name 
    ? name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase() 
    : '??';

  return (
    <div className={styles.userContainer}>
      <div className={styles.avatar}>{initials}</div>
      {showName && <span className={styles.userName}>{name}</span>}
    </div>
  );
};