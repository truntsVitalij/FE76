import type { IPost } from '../../types/post';
import { Post } from '../Post/Post';
import styles from './PostList.module.css';

interface Props {
	posts: IPost[];
}

export const PostList = ({ posts }: Props) => {
	const getSize = (index: number): 'large' | 'medium' | 'small' => {
		if (index === 0) return 'large';
		if (index === 1 || index === 2) return 'small';

		// с индекса 3 — группа Medium, Medium, Small, Small
		// смещаем начало отсчёта групп (индексы 3,4,5,6 превращаются в 0,1,2,3)
		const offset = index - 3;
		const positionInGroup = offset % 4;
		return positionInGroup === 0 || positionInGroup === 1 ? 'medium' : 'small';
	};

	return (
		<div className={styles.container}>
			{posts.map((post, index) => (
				<Post key={post.id} post={post} size={getSize(index)} />
			))}
		</div>
	);
};
