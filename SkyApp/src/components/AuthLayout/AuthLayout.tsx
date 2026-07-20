import type { FC, PropsWithChildren, ReactNode } from "react";

import styles from "./AuthLayout.module.css"
import { Link} from "react-router-dom";

type AuthLayoutProps = PropsWithChildren <{
    title?: string;
    description?: ReactNode;   //чтобы стилизовать email в PRNP
    footerText?: string;
    footerLinkText?: string;
    footerLinkTo?: string;
    dark?: boolean;
    backTo?: string;
    exstra?: ReactNode;
}>

export const AuthLayout: FC<AuthLayoutProps> = ({
    title,
    description,
    footerText,
    footerLinkText,
    footerLinkTo,
    dark = false,
    backTo = "/blog",
    exstra,
    children,
}) => {

    return(
        <section 
        className={`${styles.page} ${dark ? styles.dark : ""}`}>
            <div className={styles.wrapper}>
                <Link to={backTo} className={styles.back}> Back to home </Link>
                <h1 className={styles.title}> {title} </h1>

                <div className={styles.card}> 
                {description && (
                    <p className={styles.description}> {description} </p>
                )}

                <div className={styles.card}> {children} </div>
                </div>

                {exstra}

                {footerText && footerLinkText && footerLinkTo && (
                    <p className={styles.footer}> {footerText} 
                    <Link to={footerLinkTo} className={styles.link}> {footerLinkText} </Link> </p>
                )}
            </div>
        </section>
    )
}