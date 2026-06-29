import {useState} from 'react';
import styles from './WBCard.module.css';

import {ProductImage} from './WBProductImage/ProductImage';
import {ProductInfo} from './WBProductInfo/ProductInfo';

export type Product = {
    id: number;
    title: string;
    image:string;
    price: number;
}

type Props = {
    product: Product
};

const WBCard = ({product}: Props) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
        className={styles.card}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        >
            <ProductImage image = {product.image} />
            {hovered && (
                <button
                    onClick={() =>
                        console.log('More', product)
                    }
                >
                    More
                </button>
            )}
            <ProductInfo product = {product} />
                      

               {hovered && (
                <button
                    className={styles.quickView}
                    onClick={() => console.log('Add to cart', product.title)}
                >
                    Add to cart
                </button>
            )}

        </div>
    )
}

export {WBCard}

