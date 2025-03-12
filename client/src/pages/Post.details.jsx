import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostsById } from "../service/api";
import styles from './Post.details.module.css';

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const getPostDetails = async () => {
            try {
                const data = await fetchPostsById(id);
                setPost(data.post);
            } catch (error) {
                console.error("Error fetching post details:", error);
            } 
        };
        getPostDetails();
    }, [id]);

    if (!post) return <div>Loading....</div>;

    return (
        <div className={styles.postDetails}>
            <h1>Post Details</h1>
            <div className={styles.postInfo}>
                <p><strong>Post Name: </strong>{post.name}</p>
                <p><strong>Post Description: </strong>{post.description}</p>
                <p>
                    <strong>Post Owner: </strong>
                    {post.user ? `${post.user.firstName} ${post.user.lastName}` : "Unknown"}
                </p>
            </div>
        </div>
    );
};

export default PostDetails;
