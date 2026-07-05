import { type FC, useState, useMemo, useEffect } from 'react';
import { Header } from '../../components/Header';
import { Tabs } from '../../components/Tabs';
import { Grid } from '../../components/Grid';
import { Pagination } from '../../components/Pagination';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { TabType } from './types';
import { ALL_POSTS } from '../../data/posts';
import styles from './Blog.module.css';

interface BlogProps {
  userEmail?: string;
  onLogout?: () => void;
}

const POSTS_PER_PAGE = 6;

export const Blog: FC<BlogProps> = ({ userEmail = '', onLogout }) => {
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [favoriteIds, setFavoriteIds] = useLocalStorage<number[]>('favoriteIds', []);
  const [likedIds, setLikedIds] = useLocalStorage<number[]>('likedIds', []);
  const [dislikedIds, setDislikedIds] = useLocalStorage<number[]>('dislikedIds', []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  const handleToggleFavorite = (postId: number) => {
    setFavoriteIds(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleToggleLike = (postId: number) => {
    setLikedIds(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
    setDislikedIds(prev => prev.filter(id => id !== postId));
  };

  const handleToggleDislike = (postId: number) => {
    setDislikedIds(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
    setLikedIds(prev => prev.filter(id => id !== postId));
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
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
      <Header
        isLoggedIn={true}
        userEmail={userEmail}
        onLogout={onLogout}
        count={displayedPosts.length}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
      <Grid 
        posts={paginatedPosts} 
        favoriteIds={favoriteIds}
        likedIds={likedIds}
        dislikedIds={dislikedIds}
        onToggleFavorite={handleToggleFavorite}
        onToggleLike={handleToggleLike}
        onToggleDislike={handleToggleDislike}
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