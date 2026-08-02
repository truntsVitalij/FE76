import { useMemo, type FC } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {  useAppSelector } from '../../store';
import { usePagination } from '../../hooks/usePagination';
import PostList from '../../components/PostList';
import Pagination from '../../shared/ui/Pagination';
import Title from '../../shared/ui/Title';
import Button from '../../shared/ui/Button';
import styles from './SearchResults.module.css';

const SearchResults: FC = () => {
  const posts = useAppSelector((state) => state.posts.items);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q') || '';
  const navigate = useNavigate();

  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const lower = searchTerm.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lower) ||
        post.text.toLowerCase().includes(lower)
    );
  }, [posts, searchTerm]);

  const { currentPage, totalPages, currentItems, goToPage } = usePagination(filteredPosts, 6);

  if (filteredPosts.length === 0) {
    return (
      <div className={styles.container}>
        <Title level={2} className={styles.title}>
          Search results '{searchTerm}'
        </Title>
        <div className={styles.noResults}>
          <p>No posts found matching your search.</p>
          <Button variant="secondary" className={styles.backBtn} onClick={() => navigate('/blog')}>
            Back to blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Title level={2} className={styles.title}>
        Search results '{searchTerm}' ({filteredPosts.length} posts)
      </Title>

      <PostList posts={currentItems} variant="small" />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      )}
    </div>
  );
};

export default SearchResults;