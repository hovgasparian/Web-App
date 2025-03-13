import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from '../service/api';
import './Login.module.css';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await login(credentials);
        if (result.user.token) {
            localStorage.setItem('token', result.user.token);
            navigate('/users');
        }
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        value={credentials.email}
                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;
