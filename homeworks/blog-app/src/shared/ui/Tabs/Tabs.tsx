import styles from './Tabs.module.css';
import Button from '../Button'; 

export interface ITabItem<T extends string> {
  id: T;
  label: string;
}

interface ITabsProps<T extends string> {
  items: readonly ITabItem<T>[];
  activeTab: T;
  onChange: (tabId: T) => void;
}

const Tabs = <T extends string>({ items, activeTab, onChange }: ITabsProps<T>) => {
  return (
    <div className={styles.tabsContainer}>
      {items.map((item) => (
        <Button
          key={item.id}
          variant="text"
          className={`${styles.tabButton} ${activeTab === item.id ? styles.activeTab : ''}`}
          onClick={() => onChange(item.id)}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
};

export default Tabs;