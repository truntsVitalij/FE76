import styles from './ProductImage.module.css';

type Props = {
  image: string;
};

const ProductImage = ({ image }: Props) => {
  return <img src={image} alt="" className={styles.img} />;
};

export {ProductImage};