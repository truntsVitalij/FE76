import { type FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostCard from '../../components/PostCard';
import Button from '../../shared/ui/Button';
import styles from './PostDetails.module.css'; 
import Title from '../../shared/ui/Title'
import {  useAppSelector } from '../../store';


const PostDetails: FC = () => {
  const posts = useAppSelector((state) => state.posts.items);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <div className={styles.notFound}>
        <Title className={styles.title} level={2}>Post not found</Title>
         <Button
          variant="secondary"
          className={styles.backBtn}
          onClick={() => navigate('/blog')}
        >
          ← Back to blog
        </Button>
      </div>
    );
  }

 
  return (
    <>
     <Button
          variant="primary"
          className={styles.backBtn}
          onClick={() => navigate('/blog')}
        >
          ← Back to blog
        </Button>
    <PostCard post={post} variant="full">
      <span onClick={() => navigate('/blog')} className={styles.backLink}>
        Home
      </span>
      <span className={styles.separator}> / </span>
      <span className={styles.currentBreadcrumb}>Post {post.id}</span>
    </PostCard>
    </>
  );
};

export default PostDetails;