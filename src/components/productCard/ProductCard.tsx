import styles from './productCard.module.css'

type ProductCardProps = {
    name: string;
    price: number;
    category: string;
    retailPrice: number;
}

function ProductCard ({name, price, category, retailPrice}: ProductCardProps) {
    return (
        <>
        <div className={styles.productCard}>
        {/* <div className={`${styles.productCard}`}>
            className={`${styles.productCard} ${isActive ? styles.active : ''}`} */}
        {/* <div style={{border:"1px solid #000", marginBottom:"10px"}}> */}
      <p>{name}</p>
      <p>{price}$</p>
      <p>{category}</p>
      <p>{retailPrice}$</p>
    </div>
        </>
    )
}

export default ProductCard;