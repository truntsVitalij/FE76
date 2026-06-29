import Button from "../Button/Button";
import "./PostDetail.css";

type Post = {
  id: number;
  title: string;
  body: string;
  image?: string;
  likes?: number;
  comments?: number;
  author?: string;
  authorAvatar?: string;
};

type PostDetailProps = {
  post: Post;
  onBack: () => void;
};

function PostDetail({ post, onBack }: PostDetailProps) {
  return (
    <div className="post-detail">
      <Button onClick={onBack} variant="outline" size="small">
        ← Назад к ленте
      </Button>

      {post.image && (
        <div className="post-detail-image">
          <img src={post.image} alt={post.title} />
        </div>
      )}

      <div className="post-detail-header">
        {post.authorAvatar && (
          <img
            src={post.authorAvatar}
            alt={post.author}
            className="post-detail-avatar"
          />
        )}
        <div>
          <div className="post-detail-author">{post.author || "Unknown"}</div>
          <div className="post-detail-date">2 hours ago</div>
        </div>
      </div>

      <h1>{post.title}</h1>
      <p>{post.body}</p>

      <div className="post-detail-stats">
        <span>❤️ {post.likes || 0} likes</span>
        <span>💬 {post.comments || 0} comments</span>
      </div>
    </div>
  );
}

export default PostDetail;
