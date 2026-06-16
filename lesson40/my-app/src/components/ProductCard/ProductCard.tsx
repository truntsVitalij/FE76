import { ProductCard as ProductCardUI } from "../ui/ProductCard";

export const ProductCard = () => {
    let name = "Женские духи"
    let description = 'В самых ранних примерах React иногда использовали сокращение React.DOM для HTML-тегов:'

    const handleClick = () => console.log('click');

    return <ProductCardUI name={name} description={description} onClick={handleClick} />
}