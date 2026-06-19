import { useState } from "react";
import styles from "./HamburgerMenu.module.css";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button className={styles.btn} onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? "x" : "="}
    </button>
  );
};

export default HamburgerMenu;
