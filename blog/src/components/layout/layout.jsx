import { Outlet } from "react-router-dom";
import styles from "./layout.module.css";

function Layout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1>My Blog</h1>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;