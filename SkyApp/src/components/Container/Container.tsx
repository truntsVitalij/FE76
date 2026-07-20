import type { FC , PropsWithChildren} from 'react';
import styles from "./Container.module.css"

export const Container: FC<PropsWithChildren> = ({
    children,
}) => {

    return (
        <section className={styles.container}>
            {children}
        </section>
    )
}