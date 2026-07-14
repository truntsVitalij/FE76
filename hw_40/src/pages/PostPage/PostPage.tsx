import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PostCard } from '../../components/PostCard/PostCard';
import type { Post } from '../blog/types';

interface PostPageProps {
  posts: Post[];
  favoriteIds: number[];
  likedIds: number[];
  dislikedIds: number[];
  onToggleFavorite: (postId: number) => void;
  onToggleLike: (postId: number) => void;
  onToggleDislike: (postId: number) => void;
}

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const BackLink = styled(Link)`
  display: inline-block;
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 2rem;
  text-decoration: none;
  &:hover {
    color: #1a237e;
  }
`;

export const PostPage: React.FC<PostPageProps> = ({
  posts,
  favoriteIds,
  likedIds,
  dislikedIds,
  onToggleFavorite,
  onToggleLike,
  onToggleDislike
}) => {
  const { id } = useParams<{ id: string }>();
  const post = posts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <Container>
        <h1>Post not found</h1>
        <BackLink to="/blog">← Back to blog</BackLink>
      </Container>
    );
  }

  return (
    <Container>
      <BackLink to="/blog">← Back to blog</BackLink>
      <PostCard
        post={post}
        size="full"
        isFavorite={favoriteIds.includes(post.id)}
        isLiked={likedIds.includes(post.id)}
        isDisliked={dislikedIds.includes(post.id)}
        onToggleFavorite={onToggleFavorite}
        onToggleLike={onToggleLike}
        onToggleDislike={onToggleDislike}
      />
    </Container>
  );
};