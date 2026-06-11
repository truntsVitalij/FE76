import styles from './pizza.module.css';


interface IPizzaProps {
    size?: 'l' | 'm' | 's'
    name?: string
    withCheeseBoards: boolean
}

export const Pizza = ({ size, name, withCheeseBoards = false }: IPizzaProps) => { // props - объект, содержащий параметры компонента

    // if (!name) {
    //     return <div className={styles.notFound}>404 NOT FOUND</div>;
    // }

    // return (
    //     <div className={styles.pizza}>
    //         <div className="size">Размер: {size}</div>
    //         <div className="name">Название: {name}</div>
    //         <div className="withCheeseBoard">Сырный борт {withCheeseBoards ? 'включен' : 'выключен'}</div>
    //     </div>
    // )

    return name ? (
        <div className={styles.pizza}>
            {size && <div className="size">Размер: {size}</div>}
            {/* {size ? <div className="size">Размер: {size}</div> : null} */}
            <div className="name">Название: {name}</div>
            <div className="withCheeseBoard">Сырный борт {withCheeseBoards ? 'включен' : 'выключен'}</div>
        </div>
    ) : <div className={styles.notFound}>404 NOT FOUND</div>
}


// props для пиццы - размер, тесто, с доп наполнителями, с сырным бортом, название
// Сырный борт включен
// Сырный борт выключен

// let x = condition ? trueValue: falseValue

// if(condition) {
//     return trueValue;
// } else {
//     return falseValue;
// }


export const PizzaX = ({ name, ...additionals }) => {

    if (!name) {
        return null;
    }

    const additionalBlock = <div>{additionals.map(additional => <span>{additional.name}</span>)}</div>

    return (
        <div>
            <h2>{name}</h2>
            {additionalBlock}
        </div>
    )
}

{/* <div>
    <h3></h3>
    <ProductDesction />
    <ProductAction />
    <div className='footer'>
        price -> retailPrice
    </div>
</div>


const ProductDesction = <div>
    <p>{product.description}</p>
    <span>map spanov</span>
</div>


const ProductAction = <div class="action">
    <Button><Text /></Button>
    <Button></Button>
    <Button></Button>
</div> */}