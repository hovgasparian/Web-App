import { useNavigate } from 'react-router-dom';
import styles from './Logout.button.module.css';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className={ styles['logout-button']}>Logout</button>
  );
};

export default LogoutButton;
