import styles from "../Card.module.css";

const CardTitle = ({ title }) => {
  return <h3 className={styles.title}>{title}</h3>;
};

export default CardTitle;
