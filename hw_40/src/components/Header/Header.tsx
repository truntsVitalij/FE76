import { useState } from 'react';
import { Menu, X, Search, User, Sun, Moon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import styles from './Header.module.css';

interface NavButtonProps {
  icon: LucideIcon;
  active?: boolean;
  onClick?: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ icon: Icon, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`${styles.navBtn} ${active ? styles.navBtnActive : ''}`}
  >
    <Icon className={styles.icon} />
  </button>
);

interface UserAvatarProps {
  showName?: boolean;
  email?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ showName = false, email = '' }) => {
  const initials = email ? email.substring(0, 2).toUpperCase() : '??';

  return (
    <div className={styles.userContainer}>
      <div className={styles.avatar}>{initials}</div>
      {showName && <span className={styles.userName}>{email}</span>}
    </div>
  );
};

interface HeaderProps {
  isLoggedIn: boolean;
  userEmail?: string;
  onLogout?: () => void;
  count?: number;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

export function Header({
  isLoggedIn = false,
  userEmail = '',
  onLogout,
  count,
  searchQuery = '',
  onSearchChange,
}: HeaderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSearch = () => {
    setIsSearchMode(!isSearchMode);
  };

  if (isSearchMode) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerRow}>
            <NavButton icon={Menu} />
            <div className={styles.searchBlock}>
              <input
                type="text"
                placeholder="Search..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                autoFocus
              />
            </div>
            <NavButton icon={X} onClick={toggleSearch} />
            <NavButton icon={Search} active={true} />
            {isLoggedIn && <UserAvatar email={userEmail} showName />}
          </div>
        </header>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <div>
            <NavButton
              icon={isSidebarOpen ? X : Menu}
              active={true}
              onClick={toggleSidebar}
            />
          </div>
          <div className={styles.rightGroup}>
            <NavButton icon={Search} onClick={toggleSearch} />
            {isLoggedIn ? (
              <UserAvatar email={userEmail} showName />
            ) : (
              <NavButton icon={User} />
            )}
          </div>
        </div>

        <div className={`${styles.sidebarDropdown} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
          {isLoggedIn ? (
            <>
              <div className={styles.sidebarUserInfo}>
                <div className={styles.sidebarAvatar}>
                  {userEmail ? userEmail.substring(0, 2).toUpperCase() : '??'}
                </div>
                <div className={styles.sidebarUserText}>
                  <span className={styles.sidebarUserName}>{userEmail}</span>
                </div>
              </div>

              <div className={styles.sidebarLinks}>
                <div className={`${styles.sidebarLink} ${styles.linkActive}`}>
                  Home {count !== undefined && <span>({count})</span>}
                </div>
                <div className={`${styles.sidebarLink} ${styles.linkDefault}`}>
                  Add post
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
                    setIsSidebarOpen(false);
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
      </header>
    </div>
  );
}