import { useEffect, useState } from "react";
import { fetchUserProfile } from "../service/api";
import styles from "./Profile.module.css"; 

const Profile = () => {
    const [profileInfo, setProfileInfo] = useState(null);

    useEffect(() => {
        const getProfile = async () => {
            const data = await fetchUserProfile();
            setProfileInfo(data.profile);
        };
        getProfile();
    }, []);

    if (!profileInfo) return <p>Loading...</p>;

    return (
        <div className={styles['user-profile']}>
            <h1>User Profile</h1>
            <div className={styles['user-info']}>
                <p><strong>First Name:</strong> {profileInfo.firstName}</p>
                <p><strong>Last Name:</strong> {profileInfo.lastName}</p>
                <p><strong>Age: </strong> {profileInfo.age || 'Adult'}</p>
                <p><strong>Email:</strong> {profileInfo.email}</p>
                <p><strong>Roles:</strong> {profileInfo.roles?.join(", ") || "No roles"}</p>
            </div>
        </div>
    );
};

export default Profile;
