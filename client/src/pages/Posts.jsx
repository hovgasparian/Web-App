import { useEffect, useState } from "react";
import { fetchPosts } from "../service/api";
import styles from "./Posts.module.css";
import { useNavigate } from "react-router-dom";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [searchterm, setSearchTerm] = useState('');
    const [query, setQuery] = useState('');
    
    const [sortOrderBy, setSortOrderBy] = useState('ASC');
    const [sortBy, setSortBy] = useState('id');


    const navigate = useNavigate();

    useEffect(() => {
        const getPosts = async () => {
            const data = await fetchPosts(query, sortBy, sortOrderBy);
            setPosts(data.posts);
        };
        getPosts();
    }, [query, sortBy, sortOrderBy]);

    const handlePostClick = (id) => {
        navigate(`/posts/${id}`);
    };

    const handleCreatePost = () => {
        navigate('/posts/create');
    }

    const handleSearchPosts = () => {
        setQuery(searchterm);
    }

    const handleSortOrderChange = (e) => {
        setSortOrderBy(e.target.value);
    }

    const handleSortByChange = (e) => {
        setSortBy(e.target.value);
    }


    return (
        <div className={styles.postList}>
            <h1>Posts List</h1>
            <div>
                <input 
                type="text" 
                placeholder="Search"
                value={searchterm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" onClick={handleSearchPosts}>Search</button>
            </div>
            <div className={styles.postSortContainer}>
                <label>Sort By</label>
                <select value={sortBy} onChange={handleSortByChange}>
                    <option value="id">ID</option>
                    <option value="name">Name</option>
                    <option value="description">Description</option>
                </select>

                <label>Sort Order</label>
                <select value={sortOrderBy} onChange={handleSortOrderChange}>
                    <option value="ASC">Ascending</option>
                    <option value="DESC">Descending</option>
                </select>
            </div>


            <button className={styles.createButton} onClick={handleCreatePost}>Create Post</button>
            <div>
                {posts.map((post) => (
                    <div className={styles.postItem} key={post.id}
                    onClick={() => handlePostClick(post.id)}>
                        <span>{post.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Posts;
