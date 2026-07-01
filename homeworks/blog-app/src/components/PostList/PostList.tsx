import PostCard from '../PostCard';
import type { IPost } from '../../types/post';
import styles from './PostList.module.css';

interface IPostListProps {
  posts: IPost[];
}

const PostList: React.FC<IPostListProps> = ({ posts }) => {
  return (
    <div className={styles.mainLayout}>
      <div className={styles.leftColumn}>
        {posts.map((post, index) => index < 5 && (
          <PostCard key={post.id} post={post} variant={index === 0 ? 'large' : 'medium'} />
        ))}
      </div>
      {posts.length > 5 && (
        <div className={styles.rightColumn}>
          {posts.map((post, index) => index >= 5 && (
            <PostCard key={post.id} post={post} variant="small" />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;