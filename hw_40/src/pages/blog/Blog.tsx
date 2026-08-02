import { type FC, useState, useMemo, useRef, useEffect } from 'react';
import { Tabs } from '../../components/Tabs';
import { Grid } from '../../components/Grid';
import { Pagination } from '../../components/Pagination';
import type { TabType } from './types';
import { ALL_POSTS } from '../../data/posts';
import styles from './Blog.module.css';
import { useDispatch } from 'react-redux';
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
import { useAppSelector } from '../../hooks/useAppSelector';

interface BlogProps {
  userEmail?: string;
  onLogout?: () => void;
  searchQuery: string;
}

const POSTS_PER_PAGE = 7;

export const Blog: FC<BlogProps> = ({ searchQuery }) => {
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const restoredRef = useRef(false);

  const favorites = useAppSelector((state) => state.post.favorites);
  const posts = useAppSelector((state) => state.post.posts);
  const likedIds = useAppSelector((state) => state.post.likedIds);
  const dislikedIds = useAppSelector((state) => state.post.dislikedIds);

  const [savedFavorites, setSavedFavorites] = useLocalStorage<Post[]>('favorites', []);
  const [savedLikedIds, setSavedLikedIds] = useLocalStorage<number[]>('likedIds', []);
  const [savedDislikedIds, setSavedDislikedIds] = useLocalStorage<number[]>('dislikedIds', []);

  useEffect(() => {
    if (!restoredRef.current) {
      dispatch(restoreState(savedFavorites, savedLikedIds, savedDislikedIds));
      dispatch(setPosts(ALL_POSTS));
      restoredRef.current = true;
    }
  }, [dispatch, savedFavorites, savedLikedIds, savedDislikedIds]);

  useEffect(() => {
    if (restoredRef.current) {
      setSavedFavorites(favorites);
    }
  }, [favorites, setSavedFavorites]);

  useEffect(() => {
    if (restoredRef.current) {
      setSavedLikedIds(likedIds);
    }
  }, [likedIds, setSavedLikedIds]);

  useEffect(() => {
    if (restoredRef.current) {
      setSavedDislikedIds(dislikedIds);
    }
  }, [dislikedIds, setSavedDislikedIds]);

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
      dispatch(addToFavorite(post));
    }
  };

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