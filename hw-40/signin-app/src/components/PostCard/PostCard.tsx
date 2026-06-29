import "./PostCard.css";

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

type PostCardProps = {
  post: Post;
  onClick: () => void;
};

function PostCard({ post, onClick }: PostCardProps) {
  return (
    <div className="post-card" onClick={onClick}>
      {post.image && (
        <div className="post-card-image">
          <img src={post.image} alt={post.title} />
        </div>
      )}
      <div className="post-card-content">
        <div className="post-card-header">
          {post.authorAvatar && (
            <img
              src={post.authorAvatar}
              alt={post.author}
              className="post-card-avatar"
            />
          )}
          <span className="post-card-author">{post.author || "Unknown"}</span>
        </div>
        <h3 className="post-card-title">{post.title}</h3>
        <p className="post-card-body">{post.body.slice(0, 80)}...</p>
        <div className="post-card-footer">
          <span className="post-card-likes">❤️ {post.likes || 0}</span>
          <span className="post-card-comments">💬 {post.comments || 0}</span>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
