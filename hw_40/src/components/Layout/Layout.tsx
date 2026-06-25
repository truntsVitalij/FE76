import React from 'react';
import { Menu, Search, User } from 'lucide-react';
import styles from './Layout.module.css';
import type { LayoutProps } from './types';

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <header className={styles.header}>
        <Menu size={24} />
        <div className={styles.headerActions}>
          <Search size={20} />
          <User size={24} strokeWidth={1.5} className={styles.userAvatar} />
        </div>
      </header>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        <span>©2022 Blogfolio</span>
        <span>All rights reserved</span>
      </footer>
    </>
  );
};