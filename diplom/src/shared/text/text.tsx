import type { FC, PropsWithChildren } from "react"
import styles from './text.module.css'

interface ITextProps extends PropsWithChildren {
    type: 'title1' | 'title2' | 'title3' | 'title4' | 'title5' | 'title6' | 'labelM' | 'labelS';
}

export const Text: FC<ITextProps> = ({ children, type }) => {

    return (
        <h1 className={`${styles.text} ${styles[type]}`}>
            {children}
        </h1>
    )
}