import type { IPost } from '../../types/post';
import styles from './Post.module.css';

interface Props {
	post: IPost;
	size?: 'large' | 'medium' | 'small';
}

export const Post = ({ post, size = 'medium' }: Props) => {
	return (
		<div className={`${styles.card} ${styles[size]}`}>
			<div className={styles.content}>
				<span className={styles.date}>{post.date}</span>
				<h2 className={styles.title}>{post.title}</h2>
				{size === 'large' && post.text && <p className={styles.text}>{post.text}</p>}
				<div className={styles.footer}>👍 20 👎</div>
			</div>

			{post.image && <img src={post.image} className={styles.image} alt="post" />}
		</div>
	);
};
