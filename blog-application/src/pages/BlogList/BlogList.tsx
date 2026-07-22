import styles from './BlogList.module.css';
import { type FC, useEffect, useMemo, useState } from 'react';
import { BlogCard } from '../../components/BlogCard';
import { Pagination } from '../../components/Pagination';
import { useAppSelector } from '../../store';
import { useDispatch } from 'react-redux';
import { fetchBlogList, updateBlogList } from '../../store/actions/blogs/blogsActions';
import { useNavigate } from 'react-router';
import { useIsLogin } from '../../hooks/use-is-login';
// import type { useLoaderData } from 'react-router';


const POSTS_PER_PAGE = 6;
const IS_LOGIN_KEY = 'isLogin';

export const BlogList: FC = () => {
    const navigate = useNavigate();
    const isLogin = useIsLogin();
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState<string | null>(null);
    // const [postList, setPostList] = useState<Array<Post>>([]); // useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const blogList = useAppSelector((state) => state.blogs.list);
    const isLoading = useAppSelector((state) => state.blogs.isLoading);
    const dispatch = useDispatch();
    // const isLoading = useAppSelector((state) => state.blogs.isLoading);
    // const [searchParams, setSearchParams] = useSearchParams();

    const displayedPosts = useMemo(() => {

        return blogList.slice(POSTS_PER_PAGE * (currentPage - 1), POSTS_PER_PAGE * currentPage);
    }, [currentPage, blogList])

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // setSearchParams({ page: page.toString() });

    }
    // const postList = useLoaderData(); 
    const totalPages = useMemo(() => {
        if (!blogList.length) return 0;

        return Math.ceil(blogList.length / POSTS_PER_PAGE);
    }, [blogList])

    // const loadPostList = async (): Promise<Post[] | null> => {
    //     try {
    //         setIsLoading(true);
    //         const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    //         const postList = await response.json();

    //         setPostList(postList);

    //         return postList;
    //     } catch (error) {
    //         setError('Некорректный путь к серверу');

    //         return null;
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }

    // // Когда я перехожу на страницу blogList, я хочу получить список постов из API
    useEffect(() => {
        if (!isLogin) {
            navigate('/sign-in');
        } else {
            dispatch(fetchBlogList(10));
        }
    }, [])


    return <>
        <div className={styles.blogList}>
            {isLoading && <div>Loading...</div>}

            {displayedPosts.map(blog => (
                <BlogCard id={blog.id} className={styles.blogCard} key={blog.id} title={blog.title} description={blog.content} />
            ))}
        </div>
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </>;
}

