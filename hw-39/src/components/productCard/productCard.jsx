import styles from "./productCard.module.css";

import ProductImage from "../productImage/productImage";
import ProductPrice from "../productPrice/productPrice";
import ProductRating from "../productRating/productRating";
import ProductInfo from "../productInfo/productInfo";
import ProductActions from "../productActions/productActions";
import QuickViewButton from "../quickViewButton/quickViewButton";

export default function ProductCard({ product }) {
    return (
        <div className={styles.card}>
            <ProductImage
                image={product.image}
                title={product.title}
            />

            <QuickViewButton />

            <div className={styles.content}>
                <ProductPrice
                    price={product.price}
                    oldPrice={product.oldPrice}
                    discount={product.discount}
                />

                <ProductRating
                    rating={product.rating}
                    reviews={product.reviews}
                />

                <ProductInfo
                    brand={product.brand}
                    title={product.title}
                />

                <ProductActions />
            </div>
        </div>
    );
}