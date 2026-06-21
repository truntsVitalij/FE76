import type { Post } from '../../types/post';
// import { PostLarge } from '../PostLarge'; -- выдаёт ошибку
import { PostLarge } from '../PostLarge/PostLarge';
import { PostMedium } from '../PostMedium';
import { PostSmall } from '../PostSmall';
import styles from './PostList.module.css';

interface Props {
	posts: Post[];
}

export const PostList = ({ posts }: Props) => {
	const getComponent = (post: Post, index: number) => {
		if (index === 0) return <PostLarge key={post.id} post={post} />;
		if (index === 1 || index === 2) return <PostSmall key={post.id} post={post} />;

		// с индекса 3 — Medium, Medium, Small, Small
		const offset = index - 3;
		const positionInGroup = offset % 4;
		if (positionInGroup === 0 || positionInGroup === 1) {
			return <PostMedium key={post.id} post={post} />;
		} else {
			return <PostSmall key={post.id} post={post} />;
		}
	};

	return <div className={styles.container}>{posts.map(getComponent)}</div>;
};
