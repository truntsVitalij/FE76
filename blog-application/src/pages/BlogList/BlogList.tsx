import styles from './BlogList.module.css';
import { type FC, useEffect, useMemo, useState } from 'react';
import { BlogCard } from '../../components/BlogCard';
import { Pagination } from '../../components/Pagination';
import { useSearchParams } from 'react-router';
// import type { useLoaderData } from 'react-router';

type Post = {
    id: number;
    title: string;
    body: string;
}

const POSTS_PER_PAGE = 6;

export const BlogList: FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [postList, setPostList] = useState<Array<Post>>([]); // useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();

    const displayedPosts = useMemo(() => {

        return postList.slice(POSTS_PER_PAGE * (currentPage - 1), POSTS_PER_PAGE * currentPage);
    }, [currentPage, postList])

    console.log(displayedPosts, 'displayedPosts');
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setSearchParams({ page: page.toString() });

    }
    // const postList = useLoaderData(); 
    const totalPages = useMemo(() => {
        if (!postList.length) return 0;

        return Math.ceil(postList.length / POSTS_PER_PAGE);
    }, [postList])

    const loadPostList = async (): Promise<Post[] | null> => {
        try {
            setIsLoading(true);
            const response = await fetch('https://jsonplaceholder.typicode.com/posts')
            const postList = await response.json();

            setPostList(postList);

            return postList;
        } catch (error) {
            setError('Некорректный путь к серверу');

            return null;
        } finally {
            setIsLoading(false);
        }
    }

    // Когда я перехожу на страницу blogList, я хочу получить список постов из API
    useEffect(() => {
        loadPostList();
    }, [])


    return <>
        <div className={styles.blogList}>
            {isLoading ? <div>Loading...</div> :
                error ? <div>Error: {error}</div> :
                    displayedPosts.map(blog => (
                        <BlogCard id={blog.id} className={styles.blogCard} key={blog.id} title={blog.title} description={blog.body} />
                    ))}
        </div>
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </>;
}

