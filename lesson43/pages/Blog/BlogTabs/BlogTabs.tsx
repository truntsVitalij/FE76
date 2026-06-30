import { useState } from "react";
import { TabList } from "../../../shared/ui/TabList"

type TabType = 'All' | 'My favorite' | 'Popular';

const BLOG_TABS: TabType[] = ['All', 'My favorite', 'Popular']

export const BlogTabs = () => {
    const [activeTab, setActiveTab] = useState<TabType>('All');

    return <TabList className={styles.blogTabs} list={BLOG_TABS} activeTab={activeTab} onTabChange={setActiveTab} />
}
