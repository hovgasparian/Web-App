import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { fetchUsersById } from "../service/api";
import styles from './User.details.module.css';

const UserDetails = () => {
    const {id} = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUserDetails = async () => {
            const data = await fetchUsersById(id);
            setUser(data.user);
        }   
        getUserDetails();
    }, [id]) 

    if (!user) {
        return <div>Loading...</div>;
      }

    return (
        <div className={styles.userDetails}>
            <h1>User details</h1>
            <div className={styles.userInfo}>
                <p><strong>First Name: </strong>{user.firstName}</p>
                <p><strong>Last Name: </strong>{user.lastName}</p>
                <p><strong>Email: </strong>{user.email}</p>
                <p><strong>Age: </strong>{user.age}</p>
                <p>
                    <strong>Roles: </strong>
                    {user.roles && user.roles.length > 0
                        ? user.roles.map(role => role.name).join(', ')
                        : 'No roles'}
                </p>
                <p>
                    <strong>Posts: </strong>
                    {user.posts && user.posts.length > 0
                        ? user.posts.map(post => post.name).join(', ')
                        : 'No posts'}
                </p>
                <button onClick={() => navigate(`/users/${id}/edit`)}>Edit</button>

            </div>
        </div>
    )
}

export default UserDetails;
