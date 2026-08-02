import { type FC } from "react";
import { useAppSelector } from "../../store";
import styles from "./UserAvatar.module.css";
import { User } from "lucide-react";

interface IUserAvatarProps {
  showName?: boolean;
  className?: string;
}

const getInitials = (name: string) => {
  const parts = name.trim().split(" ");
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const UserAvatar: FC<IUserAvatarProps> = ({
  showName = true,
  className = "",
}) => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return (
      <span className={`${styles.icon} ${className}`}>
        <User size={20} className={styles.icon} />
      </span>
    );
  }

  const initials = getInitials(user.name);

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.avatarBadge}>{initials}</div>
      {showName && <span className={styles.name}>{user.name}</span>}
    </div>
  );
};

export default UserAvatar;