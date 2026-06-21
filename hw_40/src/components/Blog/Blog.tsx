import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Bookmark, MoreHorizontal, ArrowLeft, ArrowRight } from 'lucide-react';
import styles from './Blog.module.css';
import type { Post, TabType, BlogProps } from './types';

const ALL_POSTS: Post[] = Array.from({ length: 9 }).map((_, i) => ({
  id: i,
  image: `https://picsum.photos/seed/${i + 10}/400/250`,
  date: 'April 25, 2021',
  title: 'Astronauts prep for new solar arrays on nearly seven-hour spacewalk'
}));

export const Blog: React.FC<BlogProps> = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>(ALL_POSTS);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) navigate('/login');
  }, [navigate]);

  useEffect(() => {
    if (activeTab === 'All') {
      setDisplayedPosts(ALL_POSTS);
    } else if (activeTab === 'My favorite') {
      setDisplayedPosts(ALL_POSTS.slice(0, 3));
    } else if (activeTab === 'Popular') {
      setDisplayedPosts(ALL_POSTS.slice(-3));
    }
  }, [activeTab]);

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Blog</h1>
        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          Показано: {displayedPosts.length} постов
        </span>
      </div>

      <div className={styles.tabs}>
        {(['All', 'My favorite', 'Popular'] as TabType[]).map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {displayedPosts.length > 0 ? (
          displayedPosts.map((post) => (
            <article key={post.id} className={styles.card}>
              <img src={post.image} alt="Blog post" className={styles.image} />
              <div className={styles.content}>
                <div className={styles.meta}>{post.date}</div>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <div className={styles.actions}>
                  <div className={styles.actionIcons}>
                    <ThumbsUp size={16} />
                    <ThumbsDown size={16} />
                  </div>
                  <div className={styles.rightIcons}>
                    <Bookmark />
                    <MoreHorizontal />
                  </div>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
            Нет постов для отображения
          </div>
        )}
      </div>

      <div className={styles.pagination}>
        <button className={styles.navBtn}>
          <ArrowLeft size={14} /> Prev
        </button>
        <div className={styles.paginationNumbers}>
          <span className={styles.active}>1</span>
          <span>2</span>
          <span>3</span>
          <span>...</span>
          <span>8</span>
        </div>
        <button className={styles.navBtn}>
          Next <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};