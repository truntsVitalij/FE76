import { type FC, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.css";
import { Search, Menu, X } from "lucide-react";

export const Header: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        SkyApp
      </Link>

      <button
        className={styles.iconButton}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Menu"
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />} {/* //lucide-react */}
      </button>

      <div className={`${styles.searchBox} ${searchOpen ? styles.active : ""}`}>
        <input
          className={styles.search}
          type="search"
          placeholder="Search..."
        />

      <button
        className={styles.iconButton}
        onClick={() => setSearchOpen((prev) => !prev)}
        aria-label="Search"
      >
        <Search size={20} /> {/* //lucide-react */}
      </button>
      </div>

      <div className={styles.actions}>
        <Link to="sign-in" className={styles.authBtn}>
          Sign In
        </Link>
      </div>

      {menuOpen && (
        <nav className={styles.dropdown}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/add-post" onClick={() => setMenuOpen(false)}>
            Add Post
          </Link>
        </nav>
      )}
    </header>
  );
};
