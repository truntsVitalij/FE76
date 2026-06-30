import { FC } from "react"
import { Tab } from "../Tab/Tab"

interface ITabListProps {
    list: string[]; // ['All', 'My favorite', 'Popular']
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export const TabList: FC<ITabListProps> = ({ list, activeTab, onTabChange }) => {
    return (
        <div className={styles.tabList}>
            {
                list.map(tab => <Tab key={tab} isActive={activeTab === tab} onClick={() => onTabChange(tab)}>{tab}</Tab>)
            }
        </div>
    )
}