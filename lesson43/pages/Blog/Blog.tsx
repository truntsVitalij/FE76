import { type FC, useState, useMemo } from 'react';
import { BlogHeader } from '../../components/BlogHeader';
import { BlogTabs } from '../../components/BlogTabs';
import { BlogGrid } from '../../components/BlogGrid';
import { BlogPagination } from '../../components/BlogPagination';
import type { Post, TabType } from './types';
import styles from './Blog.module.css';
import { TabList } from '../../shared/ui/TabList';

const ALL_POSTS: Post[] = Array.from({ length: 9 }).map((_, i) => ({
    id: i,
    image: `https://placehold.co/400x250/1a237e/ffffff?text=Post+${i + 1}`,
    date: 'April 25, 2021',
    title: 'Astronauts prep for new solar arrays on nearly seven-hour spacewalk'
}));

export const Blog: FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('All');
    return (
        <div className={styles.container}>
            <BlogHeader count={displayedPosts.length} />
            {/* <TabList list={['All', 'My favorite', 'Popular']} activeTab={activeTab} onTabChange={setActiveTab} /> */}
            <BlogTabs />
            <BlogGrid posts={displayedPosts} />
            <BlogPagination />
        </div>
    );
};
