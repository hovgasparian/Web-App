import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import LogoutButton from "../components/Logout.button";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <Link to='/' className={styles.link}>Home Page</Link>
            <Link to='/profile' className={styles.link}>Profile</Link>
            <Link to='/users' className={styles.link}>Users</Link>
            <Link to='/posts' className={styles.link}>Posts</Link>
            <Link to='/registration' className={styles.link}>Registration</Link>
            <Link to='/login' className={styles.link}>Login</Link>
            <LogoutButton />
        </nav>
    );
};

export default Navbar;
