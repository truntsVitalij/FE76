import styles from './ProductList.module.css'

import products  from '../data/products';
import { WBCard } from '../components/WBCard';




const ProductList = () => {
    return (
        <div className={styles.productList}>
            {products.map((product) => (
        <WBCard key = {product.id} product = {product} 
                />
            ))}
        </div>
    )
}

export {ProductList};