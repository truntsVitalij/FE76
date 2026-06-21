import type { Post } from '../../types/post';
import styles from './PostLarge.module.css';

interface Props {
	post: Post;
}

export const PostLarge = ({ post }: Props) => (
	<div className={styles.card}>
		<div className={styles.content}>
			<span className={styles.date}>{post.date}</span>
			<h2 className={styles.title}>{post.title}</h2>
			{post.text && <p className={styles.text}>{post.text}</p>}
			<div className={styles.footer}>👍 20 👎</div>
		</div>
		{post.image && <img src={post.image} className={styles.image} alt="post" />}
	</div>
);
