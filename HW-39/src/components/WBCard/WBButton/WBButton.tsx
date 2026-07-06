import type { Product } from "../WBCard";
import styles from "./button.module.css"

type Props = {
    product: Product;
};

const WBButton = ({product}:  Props) => {
    return (
        <div className={styles.buttonAdd}>
            <button onClick={() => console.log("Add to cart", product.id)}> Add </button>
        </div>    
        );
};

export default WBButton;