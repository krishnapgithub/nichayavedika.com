
import React, { useState } from 'react';

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Grab the unique token string out of the browser address window path bar
    const token = window.location.pathname.split('/').pop();

    const handleResetSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');

        // 1. Password confirmation validation safety check
        if (password !== confirmPassword) {
            return setErrorMsg("Passwords do not match. Please verify your typing.");
        }

        if (password.length < 6) {
            return setErrorMsg("Security rule: Password must contain at least 6 characters.");
        }

        setIsLoading(true);

        try {
            // 2. Transmit the new password string to your backend overwrite route
            const response = await fetch(`http://localhost:5000/api/reset-password/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMsg("Password updated successfully! Redirecting you back to the home page...");
                setPassword('');
                setConfirmPassword('');

                // 3. Clear sessions and send them back to the landing screen after 3 seconds
                setTimeout(() => {
                    window.location.href = '/';
                }, 3000);
            } else {
                setErrorMsg(data.message || 'Reset execution failed.');
            }
        } catch (error) {
            setErrorMsg('Network error: Unable to contact the security server.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            minHeight: '80vh', backgroundColor: '#f9f9f9', padding: '20px'
        }}>
            <div style={{
                backgroundColor: '#ffffff', color: '#1a1a1a', padding: '40px 30px',
                borderRadius: '12px', width: '90%', maxWidth: '400px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)', border: '1px solid #d4af37'
            }}>
                <h2 style={{ color: '#800000', margin: '0 0 5px 0', fontSize: '24px', textAlign: 'center' }}>
                    Choose New Password
                </h2>
                <p style={{ color: '#d4af37', margin: '0 0 25px 0', fontSize: '13px', textAlign: 'center' }}>
                    Update Your NichayaVedika Matrimony Credentials
                </p>

                {errorMsg && <p style={{ color: 'red', fontSize: '14px', textAlign: 'center', marginBottom: '15px' }}>{errorMsg}</p>}
                {successMsg && <p style={{ color: 'green', fontSize: '14px', textAlign: 'center', marginBottom: '15px', fontWeight: '500' }}>{successMsg}</p>}

                <form onSubmit={handleResetSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', color: '#333333', marginBottom: '6px', fontSize: '13px', fontWeight: '500' }}>New Password</label>
                        <input type="password" placeholder="Enter at least 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #cccccc', borderRadius: '4px', color: '#000000', backgroundColor: '#ffffff' }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', color: '#333333', marginBottom: '6px', fontSize: '13px', fontWeight: '500' }}>Confirm Password</label>
                        <input type="password" placeholder="Re-type new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #cccccc', borderRadius: '4px', color: '#000000', backgroundColor: '#ffffff' }} />
                    </div>

                    <button type="submit" disabled={isLoading} style={{ width: '100%', padding: '12px', marginTop: '10px', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', backgroundColor: '#800000', color: '#fff' }}>
                        {isLoading ? 'Updating Security...' : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}
