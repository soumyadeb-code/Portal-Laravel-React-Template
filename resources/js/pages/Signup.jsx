import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
    const { signup } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agree, setAgree] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!agree) {
            setError('Please agree to terms and conditions to proceed.');
            return;
        }

        setLoading(true);

        try {
            await signup(name, email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please check inputs.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="auth-heading text-center mb-4">Sign up to Portal</h2>

            {error && <div className="alert alert-danger text-start py-2">{error}</div>}

            <div className="auth-form-container text-start">
                <form className="auth-form auth-signup-form" onSubmit={handleSubmit}>
                    <div className="name mb-3">
                        <label className="form-label" htmlFor="signup-name">Full Name</label>
                        <input 
                            id="signup-name" 
                            name="signup-name" 
                            type="text" 
                            className="form-control signup-name" 
                            placeholder="Full name" 
                            required 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="email mb-3">
                        <label className="form-label" htmlFor="signup-email">Email</label>
                        <input 
                            id="signup-email" 
                            name="signup-email" 
                            type="email" 
                            className="form-control signup-email" 
                            placeholder="Email address" 
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="password mb-3">
                        <label className="form-label" htmlFor="signup-password">Password</label>
                        <input 
                            id="signup-password" 
                            name="signup-password" 
                            type="password" 
                            className="form-control signup-password" 
                            placeholder="Create a password" 
                            required 
                            minLength={6}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="extra mb-3">
                        <div className="form-check">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id="AgreeTerms" 
                                checked={agree}
                                onChange={(e) => setAgree(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="AgreeTerms">
                                I agree to Portal's <a href="#" className="app-link" onClick={e => e.preventDefault()}>Terms of Service</a> and <a href="#" className="app-link" onClick={e => e.preventDefault()}>Privacy Policy</a>.
                            </label>
                        </div>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn app-btn-primary w-100 theme-btn mx-auto" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </div>
                </form>

                <div className="auth-option text-center pt-4">
                    Already have an account? <Link className="text-link" to="/login">Log in</Link>.
                </div>
            </div>
        </div>
    );
}

