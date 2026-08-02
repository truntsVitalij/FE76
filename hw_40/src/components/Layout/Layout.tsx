import React, { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { NavButton } from '../NavButton/NavButton';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import { Sidebar } from '../Sidebar';
import styles from './Layout.module.css';

interface LayoutProps extends React.PropsWithChildren {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  postCount: number;
  onLogout: () => void;
  userEmail: string;
  userName: string;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  searchQuery, 
  onSearchChange, 
  postCount, 
  onLogout, 
  userEmail,
  userName 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSearch = () => setIsSearchMode(!isSearchMode);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          {isSearchMode ? (
            <>
              <NavButton icon={Menu} />
              <div className={styles.searchBlock}>
                <input
                  type="text"
                  placeholder="Search..."
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                />
              </div>
              <NavButton icon={X} onClick={toggleSearch} />
              <NavButton icon={Search} active={true} />
              <UserAvatar name={userName} showName />
            </>
          ) : (
            <>
              <div>
                <NavButton icon={isSidebarOpen ? X : Menu} active={true} onClick={toggleSidebar} />
              </div>
              <div className={styles.rightGroup}>
                <NavButton icon={Search} onClick={toggleSearch} />
                <UserAvatar name={userName} showName />
              </div>
            </>
          )}
        </div>

        <Sidebar 
          isOpen={isSidebarOpen} 
          isLoggedIn={true} 
          userEmail={userEmail} 
          userName={userName}
          count={postCount} 
          onLogout={onLogout} 
        />
      </header>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        <span>©2022 Blogfolio</span>
        <span>All rights reserved</span>
      </footer>
    </div>
  );
};