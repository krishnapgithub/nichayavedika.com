import React, { useState } from 'react';

export default function LoginPopup({ isOpen, onClose, onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // NEW STATES: Tracks if the modal should display the Forgot Password form instead
    const [isForgotView, setIsForgotView] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotSuccess, setForgotSuccess] = useState('');

    if (!isOpen) return null;

    // Handler for regular standard login form
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                sessionStorage.setItem('showWelcomeBanner', 'true');

                setEmail('');
                setPassword('');
                setIsForgotView(false); // Reset view flag default
                onClose();
                window.location.reload();
            } else {
                setErrorMessage(data.message || 'Invalid credentials');
            }
        } catch (error) {
            setErrorMessage('Network error: Unable to connect to the server.');
        } finally {
            setIsLoading(false);
        }
    };

    // NEW HANDLER: Triggers when user requests a password reset token
    const handleForgotSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setForgotSuccess('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: forgotEmail }),
            });

            const data = await response.json();

            if (response.ok) {
                setForgotSuccess("Instructions initialized! Please check your email (and spam folder) for your secure recovery reset link.");
                setForgotEmail('');
            } else {
                setErrorMessage(data.message || 'Email lookup failed.');
            }
        } catch (error) {
            setErrorMessage('Network error: Unable to contact password system.');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="popup-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
            <div className="popup-content" style={{ backgroundColor: '#ffffff', color: '#1a1a1a', padding: '30px', borderRadius: '12px', width: '90%', maxWidth: '400px', position: 'relative', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', border: '1px solid #d4af37' }}>

                {/* Universal Modal Close Button */}
                <button onClick={() => { setIsForgotView(false); setErrorMessage(''); setForgotSuccess(''); onClose(); }} className="close-btn" style={{ position: 'absolute', right: '15px', top: '15px', background: 'none', border: 'none', fontSize: '20px', fontWeight: 'bold', color: '#888888', cursor: 'pointer' }}>&times;</button>

                {isForgotView ? (
                    /* ======================================================== */
                    /* VIEW A: FORGOT PASSWORD FORM CONTENT LAYOUT BOX         */
                    /* ======================================================== */
                    <div>
                        <h2 className="modal-title" style={{ color: '#800000', margin: '0 0 5px 0', fontSize: '22px', textAlign: 'center' }}>Reset Password</h2>
                        <p className="modal-subtitle" style={{ color: '#d4af37', margin: '0 0 20px 0', fontSize: '13px', textAlign: 'center' }}>Recover Your Matrimony Account</p>

                        {errorMessage && <p style={{ color: 'red', fontSize: '14px', textAlign: 'center', marginBottom: '15px' }}>{errorMessage}</p>}
                        {forgotSuccess && <p style={{ color: 'green', fontSize: '14px', textAlign: 'center', marginBottom: '15px', fontWeight: '500', lineHeight: '1.4' }}>{forgotSuccess}</p>}

                        <form onSubmit={handleForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div>
                                <label style={{ display: 'block', color: '#333333', marginBottom: '5px', fontSize: '13px', fontWeight: '500' }}>Registered Email Address</label>
                                <input type="email" placeholder="Enter your email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} required style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #cccccc', borderRadius: '4px', color: '#000000', backgroundColor: '#ffffff' }} />
                            </div>

                            <button type="submit" disabled={isLoading} className="btn-modal-gold-action" style={{ width: '100%', padding: '12px', marginTop: '5px', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', backgroundColor: '#800000', color: '#fff' }}>
                                {isLoading ? 'Sending Link...' : 'Send Reset Link'}
                            </button>

                            {/* Back to regular login switcher option */}
                            <p style={{ textAlign: 'center', margin: '15px 0 0 0', fontSize: '13px', color: '#666666' }}>
                                Remember your credentials?{' '}
                                <span onClick={() => { setIsForgotView(false); setErrorMessage(''); }} style={{ color: '#800000', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}>
                                    Back to Login
                                </span>
                            </p>
                        </form>
                    </div>
                ) : (
                    /* ======================================================== */
                    /* VIEW B: TRADITIONAL STANDARD LOGIN INPUT FIELDS CONTAINER */
                    /* ======================================================== */
                    <div>
                        <h2 className="modal-title" style={{ color: '#800000', margin: '0 0 5px 0', fontSize: '22px', textAlign: 'center' }}>Login to Account</h2>
                        <p className="modal-subtitle" style={{ color: '#d4af37', margin: '0 0 20px 0', fontSize: '13px', textAlign: 'center' }}>Access Your Matrimony Profile</p>

                        {errorMessage && <p style={{ color: 'red', fontSize: '14px', textAlign: 'center', marginBottom: '15px' }}>{errorMessage}</p>}

                        <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div>
                                <label style={{ display: 'block', color: '#333333', marginBottom: '5px', fontSize: '13px', fontWeight: '500' }}>Email Address</label>
                                <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #cccccc', borderRadius: '4px', color: '#000000', backgroundColor: '#ffffff' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', color: '#333333', marginBottom: '5px', fontSize: '13px', fontWeight: '500' }}>Password</label>
                                <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #cccccc', borderRadius: '4px', color: '#000000', backgroundColor: '#ffffff' }} />
                            </div>

                            {/* TRIGGER ELEMENT LINK: Switches inside the same card box seamlessly */}
                            <div style={{ textAlign: 'right', marginTop: '-5px' }}>
                                <span onClick={() => { setIsForgotView(true); setErrorMessage(''); }} style={{ color: '#800000', fontSize: '12px', fontWeight: '500', cursor: 'pointer', textDecoration: 'underline' }}>
                                    Forgot Password?
                                </span>
                            </div>

                            <button type="submit" disabled={isLoading} className="btn-modal-gold-action" style={{ width: '100%', padding: '12px', marginTop: '5px', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', backgroundColor: '#800000', color: '#fff' }}>
                                {isLoading ? 'Verifying Account...' : 'Log In'}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
