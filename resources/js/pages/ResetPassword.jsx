import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            const res = await api.post('/reset-password', { email });
            setMessage(res.data.message || 'Password reset link sent to your email.');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to request reset link.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="auth-heading text-center mb-4">Password Reset</h2>

            {message && <div className="alert alert-success text-start py-2">{message}</div>}
            {error && <div className="alert alert-danger text-start py-2">{error}</div>}

            <div className="auth-intro text-start mb-4 text-muted">
                Enter your email address below. We'll email you a secure link to reset your password.
            </div>

            <div className="auth-form-container text-start">
                <form className="auth-form resetpass-form" onSubmit={handleSubmit}>
                    <div className="email mb-3">
                        <label className="form-label" htmlFor="reg-email">Your Email</label>
                        <input 
                            id="reg-email" 
                            name="reg-email" 
                            type="email" 
                            className="form-control login-email" 
                            placeholder="Your Email" 
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn app-btn-primary w-100 theme-btn mx-auto" disabled={loading}>
                            {loading ? 'Sending...' : 'Reset Password'}
                        </button>
                    </div>
                </form>

                <div className="auth-option text-center pt-4">
                    <Link className="app-link" to="/login">Log in</Link>
                    <span className="px-2">|</span>
                    <Link className="app-link" to="/signup">Sign up</Link>
                </div>
            </div>
        </div>
    );
}

