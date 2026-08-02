import type { FC } from "react";

import styles from './Footer.module.css';

interface IFooterProps {
    className?: string;
}

export const Footer: FC<IFooterProps> = ({ className }) => {
    return (
        <footer className={`${styles.footer} ${className}`}>
            <span>
                (c) CopyRigth
            </span>
            <span>
                2026 Minsk, FE76
            </span>
        </footer>
    )
}