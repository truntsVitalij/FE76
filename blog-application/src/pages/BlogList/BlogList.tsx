import { Link } from 'react-router';
import styles from './BlogList.module.css';

const blogList = [
    {
        id: 1,
        title: 'Blog 1',
        description: 'Description 1',
    },

    {
        id: 2,
        title: 'Blog 2',
        description: 'Description 2',
    },

    {
        id: 3,
        title: 'Blog 3',
        description: 'Description 3',
    },
]

export const BlogList = () => {
    return <div className={styles.blogList}>BlogList

        {blogList.map(blog => (
            <p key={blog.id}>
                <h3> {blog.title} </h3>
                <Link to={`/blog/${blog.id}/123`}>Открыть блог</Link>
            </p>
        ))}
    </div>;
}