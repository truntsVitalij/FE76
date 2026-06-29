//Создаем карточку блога

type BlogCardProps = {
    title: string;
    text: string;
}

export const BlogCard = ({title, text}: BlogCardProps) => { //Деструктуризация const title = props.title;
    return ( //JSX-разметка
        <div>
        <h3> {title} </h3>
        <p> {text} </p>
        </div>
    );
}