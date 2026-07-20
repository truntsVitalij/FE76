import { type FC, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./Header.module.css";
import { Search, Menu, X } from "lucide-react";
import { ToggleTheme } from "../Toggle/Toggle";

export const Header: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('skyAppTheme') === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('skyAppTheme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
      localStorage.setItem('skyAppTheme', 'light');
    }
  }, [isDark]);

  // Search
  const [query, setQuery] = useState("");
const navigate = useNavigate();

const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();

  const value = query.trim();
  if (value) {
    navigate(`/search?q=${encodeURIComponent(value)}`);
    setSearchOpen(false);
  }
};


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

      <form className={`${styles.searchBox} ${searchOpen ? styles.active : ""}`}
      onSubmit={handleSearch}>
        <input
          className={styles.search}
          type="search"
          name="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery (e.target.value)}
        />

      <button
      type="submit"
        className={styles.iconButton}
        onClick={() => setSearchOpen((prev) => !prev)}
        aria-label="Search"
      >
        <Search size={20} /> {/* //lucide-react */}
      </button>
      </form>

      <ToggleTheme isDark={isDark} onToggle={() => setIsDark(!isDark)} />

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

