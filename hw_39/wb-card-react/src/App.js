import Card from "./components/card/Card";
import styles from "./components/card/Card.module.css";
import photo1 from "./images/photo1.jpg";
import photo2 from "./images/photo2.jpg";
import photo3 from "./images/photo3.jpg";
import photo4 from "./images/photo4.jpg";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className={styles.cardsContainer}>
        <Card image={photo1} title="Honor" price={14298} />
        <Card image={photo2} title="Xiaomi" price={90043} />
        <Card image={photo3} title="Samsung" price={75225} />
        <Card image={photo4} title="iPhone" price={102493} />
      </div>
    </div>
  );
}

export default App;
