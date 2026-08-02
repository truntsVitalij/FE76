import { type FC, type PropsWithChildren } from "react";
import Header from "../Header";
import Footer from "../Footer";
import styles from "./Layout.module.css";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>{children}</div>
      </main>
      <Footer>
        <span className={styles.footerLeft}>© 2026 Blogfolio</span>
        <span className={styles.footerRight}>All rights reserved</span>
      </Footer>
    </div>
  );
};

export default Layout;
