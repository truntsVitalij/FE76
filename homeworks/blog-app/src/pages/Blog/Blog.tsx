import { useState, type FC } from 'react';
import { useProcessedPosts } from '../../hooks/useProcessedPosts';
import { usePagination } from '../../hooks/usePagination';
import PostGrid from '../../components/PostGrid';
import PostList from '../../components/PostList';
import Pagination from '../../shared/ui/Pagination';
import Tabs from '../../shared/ui/Tabs';
import Title from '../../shared/ui/Title';
import styles from './Blog.module.css';

type TabType = 'All' | 'My favorites' | 'Popular';

const BLOG_TABS: readonly { id: TabType; label: string }[] = [
  { id: 'All', label: 'All' },
  { id: 'My favorites', label: 'My favorites' },
  { id: 'Popular', label: 'Popular' },
] as const;
interface IBlogProps {
  title: string;
}

const Blog: FC<IBlogProps> = ({ title }) => {
  const [activeTab, setActiveTab] = useState<TabType>('All');

  const processedPosts = useProcessedPosts(activeTab);
  const { currentPage, totalPages, currentItems, goToPage } = usePagination(processedPosts, 10);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    goToPage(1);
  };

  const useList = activeTab === 'My favorites' || activeTab === 'Popular';

  return (
    <section className={styles.blogContainer}>
      <Title level={2} className={styles.title}>{title}</Title>
      <Tabs items={BLOG_TABS} activeTab={activeTab} onChange={handleTabChange} />

      {useList ? (
        <PostList posts={currentItems} variant="large" />
      ) : (
        <PostGrid posts={currentItems} />
      )}

      {totalPages > 1 && (
        <div className={styles.paginationWrapper}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        </div>
      )}
    </section>
  );
};

export default Blog;