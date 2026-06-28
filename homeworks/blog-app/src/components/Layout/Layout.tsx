import React from 'react';
import type { ReactNode } from 'react';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
     
      <header className={styles.header}>
        <div className={styles.menuIcon}>☰</div>
        <div className={styles.rightIcons}>
          <span>🔍</span>
          <span>👤</span>
        </div>
      </header>

    
      <main className={styles.main}>
        <div className={styles.container}>
          {children}
        </div>
      </main>

     
      <footer className={styles.footer}>
        <span>© 2026 Blogfolio</span>
        <span>All rights reserved</span>
      </footer>
    </div>
  );
};

export default Layout;