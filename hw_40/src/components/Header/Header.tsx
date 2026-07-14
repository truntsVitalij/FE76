import { useState } from 'react';
import { Menu, X, Search, User } from 'lucide-react';
import { NavButton } from '../NavButton/NavButton';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import { Sidebar } from '../Sidebar';
import styles from './Header.module.css';

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

  const handleLogout = () => {
    onLogout?.();
    setIsSidebarOpen(false);
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

        <Sidebar
          isOpen={isSidebarOpen}
          isLoggedIn={isLoggedIn}
          userEmail={userEmail}
          count={count}
          onLogout={handleLogout}
        />
      </header>
    </div>
  );
}