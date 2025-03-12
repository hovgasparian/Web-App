import { useEffect, useState } from "react";
import { fetchUsers } from "../service/api";
import styles from "./Users.module.css";
import { useNavigate } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [query, setQuery] = useState('');

    const [sortBy, setSortBy] = useState('id');
    const [sortOrder, setSortOrder] = useState('ASC');

    const navigate = useNavigate();

    useEffect(() => {
        const getUsers = async () => {
            const data = await fetchUsers(query, sortBy, sortOrder);
            setUsers(data.users);
        };
        getUsers();
    }, [query, sortBy, sortOrder]); 

    const handleUserClick = (id) => {
        navigate(`/users/${id}`);
    };

    const handleRegistration = () => {
        navigate('/registration');
    };

    const handleSearch = () => {
        setQuery(searchTerm);
    };

    const handleSortByChange = (e) => {
        setSortBy(e.target.value)
    };

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value)
    }

    return (
        <div className={styles.userList}>
            <h1>User List</h1>
            <div>
                <input 
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="button" onClick={handleSearch}>Search</button>
            </div>
                <div className={styles.postSortContainer}>
                    <label>Sort By: </label>
                    <select value={sortBy} onChange={handleSortByChange}>
                        <option value="id">ID</option>
                        <option value="firstName">First Name</option>
                        <option value="lastName">Last Name</option>
                        <option value="age">Age</option>
                        <option value="email">Email</option>
                    </select>

                    <label>Sort Order: </label>
                    <select value={sortOrder} onChange={handleSortOrderChange}>
                        <option value="ASC">Ascending</option>
                        <option value="DESC">Descending</option>
                    </select>
                </div>

            <div>
                {users.length > 0 ? (
                    users.map((user) => (
                        <div className={styles.userItem} key={user.id} 
                            onClick={() => handleUserClick(user.id)}>
                            <span>{user.firstName}</span>
                        </div>
                    ))
                ) : (
                    <p>No users found</p>
                )}
            </div>
            <button className={styles.createButton} onClick={handleRegistration}>Registration</button>
        </div>
    );
};

export default Users;
