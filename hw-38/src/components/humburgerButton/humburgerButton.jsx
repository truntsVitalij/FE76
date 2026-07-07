import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import styles from "./humburgerButton.module.css";

const HamburgerButton = ({ opened, onClick }) => {
    return (
        <button
            className={styles.hamburger}
            onClick={onClick}
        >
            {opened ? (
                <HiOutlineX size={34} />
            ) : (
                <HiOutlineMenu size={34} />
            )}
        </button>
    );
};

export default HamburgerButton;