// import React from "react";
import styles from './Title.module.css';

type TitleProps = {
    text: string;
}

const Title = ({text}: TitleProps) => {
    return <h2 className={styles.title}> {text} </h2>
};

export default Title;