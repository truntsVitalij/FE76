import styled from 'styled-components';
import type { Post } from '../../types';

interface PostArticleProps {
  post: Post;
}

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

export const PostArticle: React.FC<PostArticleProps> = ({ post }) => {
  return (
    <Article>
      <Image src={post.image} alt={post.title} />
      <Meta>{post.date}</Meta>
      <Title>{post.title}</Title>
      <Content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Content>
    </Article>
  );
};