import { useParams } from "react-router-dom";
import blogs from "../../data/blog";

function BlogPage() {

    const { id } = useParams();

    const post = blogs.find(item => item.id === Number(id));

    if (!post) {
        return <h2>Post not found</h2>;
    }

    return (

        <div>

            <h1>{post.title}</h1>

            <h3>{post.category}</h3>

            <p>{post.description}</p>

        </div>

    );

}

export default BlogPage;