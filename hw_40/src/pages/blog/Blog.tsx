import { type FC, useState, useMemo } from 'react';
import { BlogHeader } from '../../components/BlogHeader';
import { BlogTabs } from '../../components/BlogTabs';
import { BlogGrid } from '../blog/components/BlogGrid';
import { BlogPagination } from '../../components/BlogPagination';
import type { TabType } from './types';
import { ALL_POSTS } from '../../data/posts';
import styles from './Blog.module.css';

export const Blog: FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const displayedPosts = useMemo(() => {
    let filtered = ALL_POSTS;
    
    if (activeTab === 'All') filtered = ALL_POSTS;
    else if (activeTab === 'My favorite') filtered = ALL_POSTS.slice(0, 3);
    else if (activeTab === 'Popular') filtered = ALL_POSTS.slice(-3);
    
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [activeTab, searchQuery]);

  return (
    <div className={styles.container}>
      <BlogHeader
        count={displayedPosts.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <BlogTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <BlogGrid posts={displayedPosts} />
      <BlogPagination />
    </div>
  );
};