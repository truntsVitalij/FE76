import { type FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { logout, setTheme } from "../../store/actions";
import Button from "../../shared/ui/Button";
import UserAvatar from "../UserAvatar";
import ProfileModal from "../ProfileModal";
import styles from "./UserSidebar.module.css";
import { Sun, Moon } from "lucide-react";

interface IUserSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserSidebar: FC<IUserSidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

const currentTheme = useAppSelector((state) => state.theme.theme);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
    onClose();
  };

  const handleSetTheme = (theme: "light" | "dark") => {
    dispatch(setTheme(theme));
  };

  const openProfile = () => {
    setIsProfileOpen(true);
  };

  return (
    <>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <UserAvatar className={styles.userAvatar} />
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <Button
              variant="text"
              className={styles.menuButton}
              onClick={() => handleNavigate("/blog")}
            >
              Home
            </Button>
          </li>
          <li className={styles.menuItem}>
            <Button variant="text" className={styles.menuButton} disabled>
              Add post
            </Button>
          </li>
          <li className={styles.menuItem}>
            <Button
              variant="text"
              className={styles.menuButton}
              onClick={openProfile}
            >
              Profile
            </Button>
          </li>
        </ul>

        <div className={styles.themesWrapper}>
            <Button
            variant="icon"
            className={`${styles.themeButton} ${currentTheme === "light" ? styles.activeTheme : ""}`}
            onClick={() => handleSetTheme("light")}
          >
            <Sun className={styles.icon} size={24} />
          </Button>
          <Button
            variant="icon"
            className={`${styles.themeButton} ${currentTheme === "dark" ? styles.activeTheme : ""}`}
            onClick={() => handleSetTheme("dark")}
          >
            <Moon className={styles.icon} size={20} />
          </Button>
        </div>

        <Button
          variant="text"
          className={styles.logoutButton}
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </div>
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </>
  );
};

export default UserSidebar;
