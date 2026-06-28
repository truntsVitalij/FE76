import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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

const Article = styled.article`
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

const Meta = styled.div`
  padding: 1.5rem 1.5rem 0;
  color: #9ca3af;
  font-size: 0.875rem;
`;

const Title = styled.h1`
  padding: 0 1.5rem;
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0.5rem 0 1rem;
`;

const Content = styled.p`
  padding: 0 1.5rem 1.5rem;
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.6;
`;

export const PostPage: React.FC<PostPageProps> = ({ posts }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <Container>
        <h1>Post not found</h1>
        <button onClick={() => navigate(-1)}>Go back</button>
      </Container>
    );
  }

  return (
    <Container>
      <BackLink to="/blog">← Back to blog</BackLink>
      <Article>
        <Image src={post.image} alt={post.title} />
        <Meta>{post.date}</Meta>
        <Title>{post.title}</Title>
        <Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Content>
      </Article>
    </Container>
  );
};