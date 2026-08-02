import { type FC, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../../shared/ui/Button";
import { useSearch } from "../../hooks/useSearch";
import UserSidebar from "../../components/UserSidebar";
import styles from "./Header.module.css";
import UserAvatar from "../../components/UserAvatar";
import { Search } from "lucide-react";

const Header: FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const showSearch = pathname === "/blog" || pathname === "/search";

  const showBurger = !["/signin", "/signup", "/success"].includes(pathname);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const { isSearchOpen, searchTerm, handleSearch, clearSearch, toggleSearch } =
    useSearch();

  return (
    <header className={styles.header}>
      {showBurger && (
        <>
          <Button
            variant="icon"
            onClick={toggleMenu}
            className={styles.burgerBtn}
          >
            {isMenuOpen ? "✕" : "☰"}
          </Button>
          <UserSidebar
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
          />
        </>
      )}

      <div className={styles.headerCenter}>
        {showSearch && isSearchOpen && (
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className={styles.searchInput}
            />
            <Button
              variant="icon"
              className={styles.clearIcon}
              onClick={clearSearch}
            >
              ✕
            </Button>
          </div>
        )}
      </div>

      <div className={styles.rightIcons}>
        {showSearch && (
          <Button
            variant="icon"
            className={styles.searchIcon}
            onClick={toggleSearch}
          >
            <Search className={styles.icon} size={18} />
          </Button>
        )}
        <UserAvatar />
      </div>
    </header>
  );
};

export default Header;
