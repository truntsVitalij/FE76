import { type FC, useState, useMemo, useEffect } from 'react';
import { Tabs } from '../../components/Tabs';
import { Grid } from '../../components/Grid';
import { Pagination } from '../../components/Pagination';
import type { TabType } from './types';
import { ALL_POSTS } from '../../data/posts';
import styles from './Blog.module.css';

interface BlogProps {
  userEmail?: string;
  onLogout?: () => void;
  favoriteIds: number[];
  likedIds: number[];
  dislikedIds: number[];
  onToggleFavorite: (postId: number) => void;
  onToggleLike: (postId: number) => void;
  onToggleDislike: (postId: number) => void;
  searchQuery: string;
}

const POSTS_PER_PAGE = 7;

export const Blog: FC<BlogProps> = ({
  favoriteIds,
  likedIds,
  dislikedIds,
  onToggleFavorite,
  onToggleLike,
  onToggleDislike,
  searchQuery
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const displayedPosts = useMemo(() => {
    let filtered = ALL_POSTS;
    
    if (activeTab === 'All') {
      filtered = ALL_POSTS;
    } else if (activeTab === 'My favorite') {
      filtered = ALL_POSTS.filter(post => favoriteIds.includes(post.id));
    } else if (activeTab === 'Popular') {
      filtered = ALL_POSTS.slice(-3);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [activeTab, searchQuery, favoriteIds]);

  const totalPages = Math.ceil(displayedPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return displayedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [displayedPosts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.container}>
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
      <Grid 
        posts={paginatedPosts} 
        favoriteIds={favoriteIds}
        likedIds={likedIds}
        dislikedIds={dislikedIds}
        onToggleFavorite={onToggleFavorite}
        onToggleLike={onToggleLike}
        onToggleDislike={onToggleDislike}
      />
      {totalPages > 1 && (
        <Pagination 
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};