import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUsersById, fetchUpdateUser } from "../service/api";
import styles from "./User.update.module.css";

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        age: "",
        email: "",
    });

    useEffect(() => {
        const getUser = async () => {
            const data = await fetchUsersById(id);
            setUser(data.user);
        };
        getUser();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetchUpdateUser(id, user);
        navigate(`/users/${id}`);
    };

    return (
        <div className={styles.editUser}>
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                    placeholder="First Name"
                />
                <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    placeholder="Last Name"
                />
                <input
                    type="number"
                    name="age"
                    value={user.age}
                    onChange={(e) => setUser({ ...user, age: e.target.value })}
                    placeholder="Age"
                />
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => navigate(`/users/${id}`)}>Cancel</button>
            </form>
        </div>
    );
};

export default EditUser;
