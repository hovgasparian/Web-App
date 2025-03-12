import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCreatePosts } from "../service/api";
import styles from './Post.create.module.css';

const PostCreate = () => {
    const [data, setData] = useState({
        name: '',
        description: '',
        userId: ''
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await fetchCreatePosts(data);
            navigate('/posts');
        } catch (err) {
            setError(err.message || "Something went wrong");
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <h2>Create Post</h2>
                
                {error && <p className={styles.error}>{error}</p>}

                <div>
                    <label>Name</label>
                    <input 
                        type="text"
                        placeholder="Post Name"
                        value={data.name}
                        onChange={(e) => setData({...data, name: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <input 
                        type='text'
                        placeholder="Description"
                        value={data.description}
                        onChange={(e) => setData({...data, description: e.target.value})}
                    />
                </div>
                <div>
                    <label>Post Owner</label>
                    <input 
                        type="number"
                        placeholder="User ID"
                        value={data.userId}
                        onChange={(e) => setData({ ...data, userId: e.target.value })}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default PostCreate;
