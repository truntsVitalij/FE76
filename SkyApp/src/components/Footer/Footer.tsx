import type { FC } from "react"

import styles from "./Footer.module.css"

interface IFooterProps {
    className?: string;
}

export const Footer: FC<IFooterProps>= ({className}) => {
    return (
        <footer className={'${styles.footer} ${className}'}>
            <span>
                (c) CopyRights
            </span>
            <span>
                2026, Poland
            </span>
        </footer>
    )
} 