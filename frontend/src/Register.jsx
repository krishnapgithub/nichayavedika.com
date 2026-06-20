import React, { useState } from 'react';

export default function Register() {
    const [formData, setFormData] = useState({
        fullName: '', // 1. Swapped from name to fullName
        email: '',
        password: '',
        gender: '',
        age: '',
        religion: '',
        location: '', // 2. Added location tracker
        profession: ''
    });
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSuccessMsg('');
        setErrorMsg('');

        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration request failed.');
            }

            setSuccessMsg(data.message);
            // Reset state properties completely upon cloud save
            setFormData({ fullName: '', email: '', password: '', gender: '', age: '', religion: '', location: '', profession: '' });
        } catch (err) {
            setErrorMsg(err.message);
        }
    };

    const styles = {
        wrapper: { maxWidth: '480px', margin: '40px auto', padding: '30px', border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', backgroundColor: '#ffffff', fontFamily: 'sans-serif' },
        heading: { textAlign: 'center', marginBottom: '24px', fontSize: '24px', fontWeight: '700', color: '#111827' },
        group: { marginBottom: '16px' },
        row: { display: 'flex', gap: '15px', marginBottom: '16px' },
        flexGroup: { flex: 1 },
        label: { display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' },
        input: { width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '15px', boxSizing: 'border-box', outline: 'none' },
        select: { width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '15px', boxSizing: 'border-box', outline: 'none', backgroundColor: '#fff' },
        button: { width: '100%', padding: '12px', background: 'linear-gradient(45deg, #FFD700, #D4AF37)', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: '600', marginTop: '10px' },
        error: { padding: '10px', backgroundColor: '#fef2f2', color: '#dc2626', borderRadius: '6px', fontSize: '14px', marginBottom: '16px', border: '1px solid #fee2e2' },
        success: { padding: '10px', backgroundColor: '#f0fdf4', color: '#16a34a', borderRadius: '6px', fontSize: '14px', marginBottom: '16px', border: '1px solid #dcfce7' }
    };

    return (
        <div style={styles.wrapper}>
            <h2 style={styles.heading}>Create Profile Account</h2>

            {successMsg && <div style={styles.success}>{successMsg}</div>}
            {errorMsg && <div style={styles.error}>{errorMsg}</div>}

            <form onSubmit={handleFormSubmit}>
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

                {/* Gender & Age Row */}
                <div style={styles.row}>
                    <div style={styles.flexGroup}>
                        <label style={styles.label}>Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleInputChange} required style={styles.select}>
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div style={styles.flexGroup}>
                        <label style={styles.label}>Age</label>
                        <input type="number" name="age" min="18" max="70" value={formData.age} onChange={handleInputChange} required style={styles.input} />
                    </div>
                </div>

                {/* Religion & Location Row */}
                <div style={styles.row}>
                    <div style={styles.flexGroup}>
                        <label style={styles.label}>Religion / Community</label>
                        <input type="text" name="religion" placeholder="e.g. Hindu" value={formData.religion} onChange={handleInputChange} required style={styles.input} />
                    </div>
                    <div style={styles.flexGroup}>
                        <label style={styles.label}>Location / City</label>
                        <input type="text" name="location" placeholder="e.g. Hyderabad" value={formData.location} onChange={handleInputChange} required style={styles.input} />
                    </div>
                </div>

                {/* Profession Full Field Layout */}
                <div style={styles.group}>
                    <label style={styles.label}>Profession</label>
                    <input type="text" name="profession" placeholder="e.g. Software Engineer" value={formData.profession} onChange={handleInputChange} required style={styles.input} />
                </div>

                <button type="submit" style={styles.button}>Register Profile</button>
            </form>
        </div>
    );
}
