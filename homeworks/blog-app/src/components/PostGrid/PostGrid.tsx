import { type FC } from 'react';
import PostCard from '../PostCard';
import type { IPost } from '../../types/post';
import styles from './PostGrid.module.css';

interface IPostGridProps {
  posts: IPost[];
}

const PostGrid: FC<IPostGridProps> = ({ posts }) => {
  const firstPost = posts[0];
  const nextFour = posts.slice(1, 5);
  const rest = posts.slice(5);

  return (
    <div className={styles.mainLayout}>
      <div className={styles.leftColumn}>
        {firstPost && <PostCard post={firstPost} variant="large" />}
        {nextFour.map((post) => (
          <PostCard key={post.id} post={post} variant="medium" />
        ))}
      </div>
      {rest.length > 0 && (
        <div className={styles.rightColumn}>
          {rest.map((post) => (
            <PostCard key={post.id} post={post} variant="small" />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostGrid;