import styles from "./title.module.css";

const Title = ({ children }) => {
    return (
        <h1 className={styles.title}>
            {children}
        </h1>
    );
};

export default Title;