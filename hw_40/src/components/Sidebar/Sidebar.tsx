import { Sun, Moon } from 'lucide-react';
import { getInitials } from '../../utils/getInitials';
import styles from './Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  userEmail: string;
  userName: string;
  count?: number;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  isLoggedIn,
  userEmail,
  userName,
  count,
  onLogout
}) => {
  const initials = getInitials(userName, userEmail);

  return (
    <div className={`${styles.sidebarDropdown} ${isOpen ? styles.sidebarOpen : ''}`}>
      {isLoggedIn ? (
        <>
          <div className={styles.sidebarUserInfo}>
            <div className={styles.sidebarAvatar}>
              {initials}
            </div>
            <div className={styles.sidebarUserText}>
              <span className={styles.sidebarUserName}>{userName || userEmail}</span>
            </div>
          </div>

          <div className={styles.sidebarLinks}>
            <div className={`${styles.sidebarLink} ${styles.linkActive}`}>
              Home {count !== undefined && <span>({count})</span>}
            </div>
            <div className={`${styles.sidebarLink} ${styles.linkDefault}`}>
              Add post
            </div>
            <div className={`${styles.sidebarLink} ${styles.linkDefault}`}>
              Profile
            </div>
          </div>

          <div className={styles.sidebarFooter}>
            <div className={styles.themeButtons}>
              <button className={styles.themeBtn}>
                <Sun className={styles.themeIcon} />
              </button>
              <button className={styles.themeBtn}>
                <Moon className={styles.themeIcon} />
              </button>
            </div>
            <button
              className={styles.logoutBtn}
              onClick={() => {
                onLogout?.();
              }}
            >
              Log Out
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.sidebarLinks}>
            <div className={`${styles.sidebarLink} ${styles.linkActive}`}>
              Home
            </div>
            <div className={`${styles.sidebarLink} ${styles.linkDefault}`}>
              Sign In
            </div>
          </div>

          <div className={styles.sidebarFooter}>
            <div className={styles.themeButtons}>
              <button className={styles.themeBtn}>
                <Sun className={styles.themeIcon} />
              </button>
              <button className={styles.themeBtn}>
                <Moon className={styles.themeIcon} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};