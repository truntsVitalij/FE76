import styles from './Tabs.module.css';

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
      {items.map(item => (
        <button
          key={item.id}
          className={`${styles.tabButton} ${activeTab === item.id ? styles.activeTab : ''}`}
          onClick={() => onChange(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default Tabs;