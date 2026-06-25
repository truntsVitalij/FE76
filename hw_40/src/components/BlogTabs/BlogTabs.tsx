import { type FC } from 'react';
import styles from './BlogTabs.module.css';
import type { TabType } from '../../pages/blog/types';

interface BlogTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TABS: TabType[] = ['All', 'My favorite', 'Popular'];

export const BlogTabs: FC<BlogTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className={styles.tabs}>
      {TABS.map((tab) => (
        <button
          key={tab}
          className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};