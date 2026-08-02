import { useMemo } from 'react';
import { useAppSelector } from '../store';

type TabType = 'All' | 'My favorites' | 'Popular';

export const useProcessedPosts = (activeTab: TabType) => {
  const posts = useAppSelector((state) => state.posts.items);
  const favoriteIds = useAppSelector((state) => state.favorites.ids);
  const likes = useAppSelector((state) => state.likes);
  return useMemo(() => {
    let result = posts;

    
    if (activeTab === 'My favorites') {
      result = result.filter((post) => favoriteIds.includes(post.id));
    }

    if (activeTab === 'Popular') {
      result = [...result].sort((a, b) => {
        const likesA = likes[a.id]?.likes || 0;
        const likesB = likes[b.id]?.likes || 0;
        return likesB - likesA;
      });
    }

    return result;
  }, [posts, activeTab, favoriteIds, likes]);
};