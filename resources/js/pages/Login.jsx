import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('admin@portal.test');
    const [password, setPassword] = useState('password123');
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password, remember);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="auth-heading text-center mb-4">Log in to Portal</h2>

            {error && <div className="alert alert-danger text-start py-2">{error}</div>}

            <div className="auth-form-container text-start">
                <form className="auth-form login-form" onSubmit={handleSubmit}>
                    <div className="email mb-3">
                        <label className="form-label" htmlFor="signin-email">Email</label>
                        <input 
                            id="signin-email" 
                            name="signin-email" 
                            type="email" 
                            className="form-control signin-email" 
                            placeholder="Email address" 
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="password mb-3">
                        <label className="form-label" htmlFor="signin-password">Password</label>
                        <input 
                            id="signin-password" 
                            name="signin-password" 
                            type="password" 
                            className="form-control signin-password" 
                            placeholder="Password" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="extra mt-3 row justify-content-between">
                            <div className="col-6">
                                <div className="form-check">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        id="RememberPassword" 
                                        checked={remember}
                                        onChange={(e) => setRemember(e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="RememberPassword">
                                        Remember me
                                    </label>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="forgot-password text-end">
                                    <Link to="/reset-password">Forgot password?</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn app-btn-primary w-100 theme-btn mx-auto" disabled={loading}>
                            {loading ? 'Logging in...' : 'Log In'}
                        </button>
                    </div>
                </form>

                <div className="auth-option text-center pt-4">
                    No Account? Sign up <Link className="text-link" to="/signup">here</Link>.
                </div>
            </div>
        </div>
    );
}

