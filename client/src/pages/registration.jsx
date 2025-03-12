import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRoles, registration } from '../service/api';
import styles from './Registration.module.css';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        email: '',
        password: '',
        roles: []
    });

    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getRoles = async () => {
            try {
                const data = await fetchRoles();
                console.log("Fetched Roles:", data);
                setRoles(data.roles);
            } catch (error) {
                console.error("Failed to fetch roles:", error);
            }
        };
        getRoles();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await registration(formData);
            console.log('Registration successful:', user);
            alert('Registration successful!');
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error.response?.data || error.message);
            alert('Registration failed: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className={styles["form-container"]}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        placeholder='Firstname'
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className={styles.input}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder='Lastname'
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Age:</label>
                    <input
                        type="number"
                        className={styles.input}
                        placeholder='Age'
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        className={styles.input}
                        placeholder='Email'
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        className={styles.input}
                        placeholder='Password'
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label>Roles:</label>
                    <select
                        multiple
                        value={formData.roles}
                        className={styles.input}
                        onChange={(e) => {
                            const selectedRoles = Array.from(e.target.selectedOptions, (option) => option.value);
                            setFormData({ ...formData, roles: selectedRoles });
                        }}
                    >
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className={styles.button}>Register</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
