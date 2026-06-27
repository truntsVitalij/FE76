import Button from "../Button/Button";
import "./Success.module.css";

type SuccessProps = {
  user: { name: string; email: string };
  onSignOut: () => void;
  onViewPosts: () => void;
};

function Success({ user, onSignOut, onViewPosts }: SuccessProps) {
  const profiles = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com" },
  ];

  return (
    <div className="success-container">
      <h1>Success</h1>

      <div className="profile-list">
        <h2>Список профилей</h2>
        <ul>
          {profiles.map((profile) => (
            <li key={profile.id} className="profile-item">
              <span className="profile-name">{profile.name}</span>
              <span className="profile-email">{profile.email}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="current-user">
        <h2>Текущий пользователь:</h2>
        <p>
          {user.name} ({user.email})
        </p>

        <div className="success-actions">
          <Button onClick={onViewPosts} variant="primary">
            Посмотреть все посты
          </Button>
          <Button onClick={onSignOut} variant="secondary">
            Sign In
          </Button>
        </div>
      </div>

      <footer className="success-footer">© 2026 SignIn</footer>
    </div>
  );
}

export default Success;
