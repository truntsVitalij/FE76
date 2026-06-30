import { useNavigate, useParams } from 'react-router';
import styles from './Blog.module.css';

export const Blog = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const handleClick = () => {
        navigate(-1);
    }

    return <div className={styles.blogContainer}>
        <h2>Blog {id}</h2>
        <button onClick={handleClick}> Вернуться назад </button>
    </div>;
};
