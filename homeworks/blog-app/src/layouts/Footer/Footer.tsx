import type { FC, PropsWithChildren } from "react";
import styles from "./Footer.module.css";

const Footer: FC<PropsWithChildren> = ({ children }) => {
  return <footer className={styles.footer}>{children}</footer>;
};

export default Footer;
