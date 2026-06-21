import React, { useState } from 'react';

export default function Register({ isOpen, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        gender: '',
        age: '',
        religion: '',
        location: '',
        profession: ''
    });
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSuccessMsg('');
        setErrorMsg('');

        const submissionData = { ...formData, age: Number(formData.age) };

        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration request failed.');
            }

            setSuccessMsg(data.message);
            setFormData({
                fullName: '', email: '', password: '', gender: '',
                age: '', religion: '', location: '', profession: ''
            });
        } catch (err) {
            setErrorMsg(err.message);
        }
    };
    return (
        /* 1. OUTER WRAPPER: Fixed positioning holds it on screen as a proper popup */
        <div className="popup-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Single dark mask overlay
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 99999 // Keeps it resting above all main screen assets
        }}>

            {successMsg ? (
                /* SCREEN A: SUCCESS VERIFICATION HOLD SCREEN */
                <div className="popup-content" style={{ backgroundColor: '#ffffff', color: '#1a1a1a', padding: '35px 30px', borderRadius: '12px', width: '90%', maxWidth: '450px', textAlign: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', position: 'relative', border: '1px solid #d4af37' }}>
                    <div style={{ fontSize: '50px', color: '#d4af37', marginBottom: '15px' }}>⏳</div>
                    <h2 style={{ color: '#800000', margin: '0 0 12px 0', fontSize: '24px' }}>Submission Received!</h2>
                    <p style={{ color: '#444444', fontSize: '15px', lineHeight: '1.6', margin: '0 0 25px 0' }}>
                        Your details have been submitted successfully. Our backend verification team will review your profile credentials shortly. Please hold tight until then!
                    </p>
                    <button
                        onClick={() => {
                            setSuccessMsg('');
                            if (onClose) onClose();
                        }}
                        style={{ backgroundColor: '#800000', color: '#ffffff', border: 'none', padding: '12px 35px', borderRadius: '6px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', width: '100%' }}
                    >
                        OK
                    </button>
                </div>
            ) : (
                /* SCREEN B: STANDARD REGISTRATION REGULAR FIELDS FORM GRID */
                <div className="popup-content" style={{
                    backgroundColor: '#ffffff',
                    color: '#1a1a1a',
                    padding: '20px 25px 25px 25px',
                    borderRadius: '12px',
                    width: '90%',
                    maxWidth: '600px',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    border: '1px solid #d4af37'
                }}>
                    <button onClick={onClose} className="close-btn" style={{ position: 'absolute', right: '15px', top: '15px', background: 'none', border: 'none', fontSize: '20px', fontWeight: 'bold', color: '#888888', cursor: 'pointer' }}>&times;</button>

                    <h2 className="modal-title" style={{ color: '#800000', margin: '0 0 2px 0', fontSize: '22px', textAlign: 'center' }}>Create Profile Account</h2>
                    <p className="modal-subtitle" style={{ color: '#d4af37', margin: '0 0 15px 0', fontSize: '13px', textAlign: 'center' }}>Join NichayaVedika Matrimony</p>

                    {errorMsg && <div className="form-msg-error" style={{ color: 'red', marginBottom: '10px', fontSize: '14px', textAlign: 'center' }}>{errorMsg}</div>}

                    <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {/* ROW 1: Name & Email */}
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', color: '#333333', marginBottom: '4px', fontSize: '13px', fontWeight: '500' }}>Full Name</label>
                                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required style={{ width: '100%', padding: '8px 10px', boxSizing: 'border-box', border: '1px solid #cccccc', borderRadius: '4px', color: '#000000', backgroundColor: '#ffffff' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', color: '#333333', marginBottom: '4px', fontSize: '13px', fontWeight: '500' }}>Email Address</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required style={{ width: '100%', padding: '8px 10px', boxSizing: 'border-box', border: '1px solid #cccccc', borderRadius: '4px', color: '#000000', backgroundColor: '#ffffff' }} />
                            </div>
                        </div>

                        {/* ROW 2: Password & Gender */}
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', color: '#333333', marginBottom: '4px', fontSize: '13px', fontWeight: '500' }}>Password</label>
                                <input type="password" name="password" value={formData.password} onChange={handleInputChange} required style={{ width: '100%', padding: '8px 10px', boxSizing: 'border-box', border: '1px solid #cccccc', borderRadius: '4px', color: '#000000', backgroundColor: '#ffffff' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', color: '#333333', marginBottom: '4px', fontSize: '13px', fontWeight: '500' }}>Gender</label>
                                <select name="gender" value={formData.gender} onChange={handleInputChange} required style={{ width: '100%', padding: '8px 10px', boxSizing: 'border-box', border: '1px solid #cccccc', borderRadius: '4px', color: '#000000', backgroundColor: '#ffffff' }}>
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>

                        {/* ROW 3: Age & Religion */}
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', color: '#333333', marginBottom: '4px', fontSize: '13px', fontWeight: '500' }}>Age</label>
                                <input type="number" name="age" min="18" max="70" value={formData.age} onChange={handleInputChange} required style={{ width: '100%', padding: '8px 10px', boxSizing: 'border-box', border: '1px solid #cccccc', borderRadius: '4px', color: '#000000', backgroundColor: '#ffffff' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', color: '#333333', marginBottom: '4px', fontSize: '13px', fontWeight: '500' }}>Religion / Community</label>
                                <input type="text" name="religion" placeholder="e.g. Hindu" value={formData.religion} onChange={handleInputChange} required style={{ width: '100%', padding: '8px 10px', boxSizing: 'border-box', border: '1px solid #cccccc', borderRadius: '4px', color: '#000000', backgroundColor: '#ffffff' }} />
                            </div>
                        </div>

                        {/* ROW 4: Location & Profession */}
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', color: '#333333', marginBottom: '4px', fontSize: '13px', fontWeight: '500' }}>Location / City</label>
                                <input type="text" name="location" placeholder="e.g. Hyderabad" value={formData.location} onChange={handleInputChange} required style={{ width: '100%', padding: '8px 10px', boxSizing: 'border-box', border: '1px solid #cccccc', borderRadius: '4px', color: '#000000', backgroundColor: '#ffffff' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', color: '#333333', marginBottom: '4px', fontSize: '13px', fontWeight: '500' }}>Profession</label>
                                <input type="text" name="profession" placeholder="e.g. Software Engineer" value={formData.profession} onChange={handleInputChange} required style={{ width: '100%', padding: '8px 10px', boxSizing: 'border-box', border: '1px solid #cccccc', borderRadius: '4px', color: '#000000', backgroundColor: '#ffffff' }} />
                            </div>
                        </div>
                        <button type="submit" className="btn-modal-gold-action" style={{ width: '100%', padding: '10px', marginTop: '8px', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', backgroundColor: '#800000', color: '#ffffff' }}>Register Profile</button>
                    </form>
                </div>
            )}
        </div>
    );
}
