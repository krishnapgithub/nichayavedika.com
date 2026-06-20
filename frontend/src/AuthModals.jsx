import React, { useState } from 'react';
import Register from './Register';

export default function AuthModals({ isLoginOpen, isRegisterOpen, onCloseAll }) {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [errorMsg, setErrorMsg] = useState('');

    if (!isLoginOpen && !isRegisterOpen) return null;

    const handleInputChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Login failed.');
            }
            onCloseAll();
        } catch (err) {
            setErrorMsg(err.message);
        }
    };

    return (
        <div className="modal-overlay" onClick={onCloseAll}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onCloseAll}>&times;</button>

                {/* 1. UNIFIED LOGIN POPUP CONTAINER */}
                {isLoginOpen && (
                    <div className="auth-form-content">
                        <h2 className="modal-title">Welcome Back</h2>
                        <p className="modal-subtitle">Login to your account</p>

                        {errorMsg && <div className="form-msg-error">{errorMsg}</div>}

                        <form onSubmit={handleLoginSubmit} className="modal-form-matrix">
                            <div className="form-group">
                                <label className="modal-field-label">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={loginData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter email"
                                    className="modal-input-field"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="modal-field-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter password"
                                    className="modal-input-field"
                                    required
                                />
                            </div>

                            {/* STYLISH MODERN LIGHT GOLD BUTTON */}
                            <button type="submit" className="btn-modal-gold-action">
                                Login to Account
                            </button>
                        </form>
                    </div>
                )}

                {/* 2. UNIFIED REGISTER POPUP CONTAINER */}
                {isRegisterOpen && (
                    <div className="auth-form-content">
                        <Register onSuccess={onCloseAll} />
                    </div>
                )}
            </div>
        </div>
    );
}
