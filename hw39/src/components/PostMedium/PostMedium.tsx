import type { Post } from '../../types/post';
import styles from './PostMedium.module.css';

interface Props {
	post: Post;
}

export const PostMedium = ({ post }: Props) => (
	<div className={styles.card}>
		{post.image && <img src={post.image} className={styles.image} alt="post" />}
		<div className={styles.content}>
			<span className={styles.date}>{post.date}</span>
			<h3 className={styles.title}>{post.title}</h3>
			<div className={styles.footer}>👍 20 👎</div>
		</div>
	</div>
);
