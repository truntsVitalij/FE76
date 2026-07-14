import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PostArticle } from '../../pages/blog/components/PostArticle';
import type { Post } from '../blog/types';

interface PostPageProps {
  posts: Post[];
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

const NotFound = styled.div`
  text-align: center;
  padding: 3rem;
`;

export const PostPage: React.FC<PostPageProps> = ({ posts }) => {
  const { id } = useParams<{ id: string }>();
  const post = posts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <Container>
        <NotFound>
          <h1>Post not found</h1>
          <BackLink to="/blog">← Back to blog</BackLink>
        </NotFound>
      </Container>
    );
  }

  return (
    <Container>
      <BackLink to="/blog">← Back to blog</BackLink>
      <PostArticle post={post} />
    </Container>
  );
};