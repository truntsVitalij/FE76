import { type FC, useState, useMemo, useEffect } from 'react';
import { Tabs } from '../../components/Tabs';
import { Grid } from '../../components/Grid';
import { Pagination } from '../../components/Pagination';
import type { TabType } from './types';
import { ALL_POSTS } from '../../data/posts';
import styles from './Blog.module.css';
import { useSelector, useDispatch } from 'react-redux';
import type { Post } from '../../pages/blog/types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { 
  addToFavorite,
  removeToFavorite,
  setPosts,
  toggleLike,
  toggleDislike,   
  restoreState,    
} from '../../state/actions/postAction';

interface BlogProps {
  userEmail?: string;
  onLogout?: () => void;
  searchQuery: string;
}

const POSTS_PER_PAGE = 7;

export const Blog: FC<BlogProps> = ({
  searchQuery
}) => {
  const [isRestored, setIsRestored] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.post.favorites);
  const posts = useSelector((state: any) => state.post.posts);
  const likedIds = useSelector((state: any) => state.post.likedIds);
  const dislikedIds = useSelector((state: any) => state.post.dislikedIds);
  const [savedFavorites, setSavedFavorites] = useLocalStorage<Post[]>('favorites', []);
  const [savedLikedIds, setSavedLikedIds] = useLocalStorage<number[]>('likedIds', []);
  const [savedDislikedIds, setSavedDislikedIds] = useLocalStorage<number[]>('dislikedIds', []);

  // useEffect(() => {
  //   if (savedFavorites.length > 0 && favorites.length === 0) {
  //     savedFavorites.forEach((post: Post) => dispatch(addToFavorite(post)));
  //   }
  //   if (savedLikedIds.length > 0 && likedIds.length === 0) {
  //     savedLikedIds.forEach((id: number) => dispatch(toggleLike(id)));
  //   }
  //   if (savedDislikedIds.length > 0 && dislikedIds.length === 0) {
  //     savedDislikedIds.forEach((id: number) => dispatch(toggleDislike(id)));
  //   }
  // }, []); // 

  useEffect(() => {
    if (!isRestored) {
      dispatch(restoreState(savedFavorites, savedLikedIds, savedDislikedIds));
      dispatch(setPosts(ALL_POSTS));
      setIsRestored(true);
    }
  }, [isRestored]);

  useEffect(() => {
    if (isRestored) {
      setSavedFavorites(favorites);
    }
  }, [favorites, isRestored]);

  useEffect(() => {
    if (isRestored) {
      setSavedLikedIds(likedIds);
    }
  }, [likedIds, isRestored]);

  useEffect(() => {
    if (isRestored) {
      setSavedDislikedIds(dislikedIds);
    }
  }, [dislikedIds, isRestored]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleToggleFavorite = (postId: number) => {
    const post = posts.find((p: Post) => p.id === postId);
    if (!post) return;

    const isFavorite = favorites.some((fav: Post) => fav.id === postId);
    if (isFavorite) {
      dispatch(removeToFavorite(postId));
    } else {
      dispatch(addToFavorite(post))
    }
  }

  const handleToggleLike = (postId: number) => {
    dispatch(toggleLike(postId));
  };

  const handleToggleDislike = (postId: number) => {
    dispatch(toggleDislike(postId));
  };

  const displayedPosts = useMemo(() => {
    let filtered = posts;
    
    if (activeTab === 'All') {
      filtered = posts;
    } else if (activeTab === 'My favorite') {
      filtered = favorites;
    } else if (activeTab === 'Popular') {
      filtered = posts.slice(-3);
    }
    
    if (searchQuery) {
      filtered = filtered.filter((post: Post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [activeTab, searchQuery, favorites, posts]);

  const totalPages = Math.ceil(displayedPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return displayedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [displayedPosts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const favoriteIdsFromRedux = favorites.map((fav: Post) => fav.id);

  return (
    <div className={styles.container}>
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
      <Grid 
        posts={paginatedPosts} 
        favoriteIds={favoriteIdsFromRedux}
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