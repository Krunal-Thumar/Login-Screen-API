import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/login', { username, password });
            setMessage(response.data.message);
            setIsSuccess(true); // Set success state
            navigate(`/faculty/${username}/courses`);
        } catch (error) {
            setMessage('Sorry! Login Incorrect');
            setIsSuccess(false); // Set error state
        }
    };

    return (
        <div className="wrapper">
            <div className="form-box">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                    {message && (
                        <div className={`message ${isSuccess ? 'success' : 'error'}`}>
                            {message}
                        </div>
                    )}
                </form>
                <div className="need-assistance">
                    <p>Need assistance? Please contact the RIT Service Center at </p>
                    <p>
                        <a href="tel:585-475-5000">585-475-5000</a> or visit <a href="https://help.rit.edu" target="_blank" rel="noopener noreferrer">help.rit.edu</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;