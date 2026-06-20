import React, { useState } from 'react';

export default function AuthModals({ isLoginOpen, isRegisterOpen, onCloseAll }) {
    // 1. Manage state fields for the registration layout block
    const [formData, setFormData] = useState({
        fullName: '', email: '', password: '',
        gender: '', age: '', religion: '', location: '', profession: ''
    });
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    if (!isLoginOpen && !isRegisterOpen) return null;

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 2. Form execution logic talking to route /api/register
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setSuccessMsg('');
        setErrorMsg('');

        // Explicit trigger validation test
        alert('Register validation triggered! Sending to network...');



        // Replace the old hardcoded line with this:
        const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

        // Then update your fetch/axios request line to use the variable:
        

        try {
            // NOTE: Make sure your server endpoint matches this path context
            const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
            const response = await fetch('${API_BASE_URL}/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration request failed.');
            }

            setSuccessMsg(data.message);
            // Clear form inputs locally on cloud save confirmation
            setFormData({ fullName: '', email: '', password: '', gender: '', age: '', religion: '', location: '', profession: '' });

            // Auto close modal panel after a short delay on success
            setTimeout(() => {
                onCloseAll();
                setSuccessMsg('');
            }, 2000);

        } catch (err) {
            setErrorMsg(err.message);
        }
    };

    // Consistent Theme Profile Inline Style Sheet Declaration 
    const styles = {
        overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100000, fontFamily: 'sans-serif' },
        modalBox: { backgroundColor: '#ffffff', width: '90%', maxWidth: '460px', padding: '30px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', position: 'relative', maxHeight: '90vh', overflowY: 'auto' },
        closeBtn: { position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#9ca3af' },
        title: { fontSize: '22px', fontWeight: '700', marginBottom: '20px', textAlign: 'center', color: '#800020' }, // Maroon accent header
        group: { marginBottom: '14px' },
        label: { display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: '500', color: '#4b5563' },
        input: { width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', boxSizing: 'border-box', outline: 'none', fontSize: '14px' },
        select: { width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', boxSizing: 'border-box', outline: 'none', backgroundColor: '#fff', fontSize: '14px' },
        row: { display: 'flex', gap: '12px' },
        flexChild: { flex: 1 },
        submitBtn: { width: '100%', padding: '12px', background: 'linear-gradient(45deg, #FFD700, #D4AF37)', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: '600', marginTop: '10px' },
        error: { padding: '10px', backgroundColor: '#fef2f2', color: '#dc2626', borderRadius: '6px', fontSize: '13px', marginBottom: '14px', border: '1px solid #fee2e2' },
        success: { padding: '10px', backgroundColor: '#f0fdf4', color: '#16a34a', borderRadius: '6px', fontSize: '13px', marginBottom: '14px', border: '1px solid #dcfce7' }
    };

    return (
        <div style={styles.overlay} onClick={onCloseAll}>
            <div style={styles.modalBox} onClick={(e) => e.stopPropagation()}>
                <button style={styles.closeBtn} onClick={onCloseAll}>&times;</button>

                {/* CONDITION 1: DISPLAY LOGIN WINDOW */}
                {isLoginOpen && (
                    <div>
                        <h3 style={styles.title}>Account Login</h3>
                        <form onSubmit={(e) => { e.preventDefault(); alert('Login functionality coming next!'); }}>
                            <div style={styles.group}>
                                <label style={styles.label}>Email Address</label>
                                <input type="email" required style={styles.input} />
                            </div>
                            <div style={styles.group}>
                                <label style={styles.label}>Password</label>
                                <input type="password" required style={styles.input} />
                            </div>
                            <button type="submit" style={styles.submitBtn}>Sign In</button>
                        </form>
                    </div>
                )}

                {/* CONDITION 2: DISPLAY REGISTRATION WINDOW WITH CLOUD FIELDS */}
                {isRegisterOpen && (
                    <div>
                        <h3 style={styles.title}>Create Profile Account</h3>

                        {successMsg && <div style={styles.success}>{successMsg}</div>}
                        {errorMsg && <div style={styles.error}>{errorMsg}</div>}

                        <form onSubmit={handleRegisterSubmit}>
                            <div style={styles.group}>
                                <label style={styles.label}>Full Name</label>
                                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required style={styles.input} />
                            </div>

                            <div style={styles.group}>
                                <label style={styles.label}>Email Address</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required style={styles.input} />
                            </div>

                            <div style={styles.group}>
                                <label style={styles.label}>Password</label>
                                <input type="password" name="password" value={formData.password} onChange={handleInputChange} required style={styles.input} />
                            </div>

                            <div style={styles.row}>
                                <div style={styles.flexChild}>
                                    <label style={styles.label}>Gender</label>
                                    <select name="gender" value={formData.gender} onChange={handleInputChange} required style={styles.select}>
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div style={styles.flexChild}>
                                    <label style={styles.label}>Age</label>
                                    <input type="number" name="age" min="18" max="70" value={formData.age} onChange={handleInputChange} required style={styles.input} />
                                </div>
                            </div>

                            <div style={styles.row}>
                                <div style={styles.flexChild}>
                                    <label style={styles.label}>Religion</label>
                                    <input type="text" name="religion" placeholder="e.g. Hindu" value={formData.religion} onChange={handleInputChange} required style={styles.input} />
                                </div>
                                <div style={styles.flexChild}>
                                    <label style={styles.label}>Location / City</label>
                                    <input type="text" name="location" placeholder="e.g. Hyderabad" value={formData.location} onChange={handleInputChange} required style={styles.input} />
                                </div>
                            </div>

                            <div style={styles.group}>
                                <label style={styles.label}>Profession</label>
                                <input type="text" name="profession" placeholder="e.g. Software Engineer" value={formData.profession} onChange={handleInputChange} required style={styles.input} />
                            </div>

                            <button type="submit" style={styles.submitBtn}>Register Profile</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
