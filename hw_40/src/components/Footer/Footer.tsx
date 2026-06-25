import { type FC } from 'react';
import styles from './Footer.module.css';

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <span>©2022 Blogfolio</span>
      <span>All rights reserved</span>
    </footer>
  );
};