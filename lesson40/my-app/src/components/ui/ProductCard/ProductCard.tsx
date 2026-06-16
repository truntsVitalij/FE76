import type { FC } from "react";
import { Card } from "../Card";

import styles from './/ProductCard.module.css';

interface IProductCardProps {
    name: string;
    description: string;
    onClick: () => void;
}

export const ProductCard: FC<IProductCardProps> = ({ name, description, onClick }) => {
    return <Card className={styles.productCard} title={name} description={description} btnLabel="Детали" onClick={onClick} />
}

