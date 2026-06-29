//для себя

import styles from './Pizza.module.css'

interface IPizzaProps {
    name: string;
    size: 's' | 'l' | 'm';
    withCheeseBoards?: boolean
}

const Pizza = ({name, size, withCheeseBoards=false}:IPizzaProps) => {

//     if(!name) {
//   return <div> 404 not found </div>; //null
// }

//     return(
//         <div className={styles.pizza}>
//             <div className={styles.name}>Name: {name}</div>
//             <div className={styles.size}>Size: {size}</div>
//             <div className={styles.withCheeseBoards}>Cheese Boards {withCheeseBoards ? 'yes' : 'no'}</div>
//         </div>
//     )

    return name ? (
        <div className={styles.pizza}>
            <div className={styles.name}>Name: {name}</div>
            <div className={styles.size}>Size: {size}</div>
            <div className={styles.withCheeseBoards}>Cheese Boards: {withCheeseBoards ? 'yes' : 'no'}</div>
        </div>
    ) : <div> 404 not found </div>;
}

export default Pizza;