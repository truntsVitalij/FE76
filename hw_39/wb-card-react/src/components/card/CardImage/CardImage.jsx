import { useState } from "react";
import styles from "../Card.module.css";

const CardImage = ({ image, title }) => {
  const [showBtn, setShowBtn] = useState(false);

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setShowBtn(true)}
      onMouseLeave={() => setShowBtn(false)}
    >
      <img className={styles.img} src={image} alt={title} />
      {showBtn && (
        <button className={styles.quickViewBtn}>Быстрый просмотр</button>
      )}
    </div>
  );
};

export default CardImage;
