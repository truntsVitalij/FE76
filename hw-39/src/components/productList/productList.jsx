import styles from "./productList.module.css";

import ProductCard from "../productCard/productCard";
import products from "../../data/products";

export default function ProductList() {
    return (
        <section className={styles.productList}>
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </section>
    );
}