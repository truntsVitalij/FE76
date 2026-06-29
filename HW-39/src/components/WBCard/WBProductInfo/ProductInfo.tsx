import type { Product } from "../WBCard"

type Props = {
    product: Product
}

const ProductInfo = ({ product }:Props) => {
    return(
        <div>
            <h3> {product.title}</h3>
            <p> ${product.price}</p>    
        </div>
    )
}

export {ProductInfo}