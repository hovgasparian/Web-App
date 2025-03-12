import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

const HomePage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Welcome to Home Page</h1>
            <p className={styles.description}>This is the main page of your application.</p>
            <Link to='/registration' className={styles.link}>Go to Registration Page</Link>
        </div>
    );
};

export default HomePage;
