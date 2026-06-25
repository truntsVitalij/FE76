import type { FC, PropsWithChildren } from "react"

import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"

import styles from './MainLayout.module.css';

// interface IMainLayoutProps extends PropsWithChildren {}

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={styles.layoutContainer}>
            <Header />
            <div className={styles.contentWrapper}>
                <div className={styles.content}>
                    {children}
                </div>
                <Footer className={styles.footer} />
            </div>
        </div>
    )
}
