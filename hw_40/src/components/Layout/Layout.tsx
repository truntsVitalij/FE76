import React from 'react';
import { Menu, Search, User } from 'lucide-react';
import styles from './Layout.module.css';
import type { LayoutProps } from './types';

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className={styles.header}>
        <div>
          <Menu size={24} />
        </div>
        <div className={styles.headerActions}>
          <Search size={20} />
          <div className={styles.userAvatar}>
            <User size={24} strokeWidth={1.5} />
          </div>
        </div>
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