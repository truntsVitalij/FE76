import { type FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogHeader } from '../../components/BlogHeader';
import { BlogTabs } from '../../components/BlogTabs';
import { BlogGrid } from '../../components/BlogGrid';
import { BlogPagination } from '../../components/BlogPagination';
import type { Post, TabType } from './types';

const ALL_POSTS: Post[] = Array.from({ length: 9 }).map((_, i) => ({
  id: i,
  image: `https://placehold.co/400x250/1a237e/ffffff?text=Post+${i + 1}`,
  date: 'April 25, 2021',
  title: 'Astronauts prep for new solar arrays on nearly seven-hour spacewalk'
}));

export const Blog: FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>(ALL_POSTS);

  useEffect(() => {
    if (!localStorage.getItem('isLoggedIn')) navigate('/login');
  }, [navigate]);

  useEffect(() => {
    if (activeTab === 'All') setDisplayedPosts(ALL_POSTS);
    else if (activeTab === 'My favorite') setDisplayedPosts(ALL_POSTS.slice(0, 3));
    else if (activeTab === 'Popular') setDisplayedPosts(ALL_POSTS.slice(-3));
  }, [activeTab]);

  return (
    <>
      <BlogHeader count={displayedPosts.length} />
      <BlogTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <BlogGrid posts={displayedPosts} />
      <BlogPagination />
    </>
  );
};