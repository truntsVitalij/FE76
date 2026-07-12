import type { LucideIcon } from 'lucide-react';
import styles from './NavButton.module.css';

interface NavButtonProps {
  icon: LucideIcon;
  active?: boolean;
  onClick?: () => void;
}

export const NavButton: React.FC<NavButtonProps> = ({ icon: Icon, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`${styles.navBtn} ${active ? styles.navBtnActive : ''}`}
  >
    <Icon className={styles.icon} />
  </button>
);