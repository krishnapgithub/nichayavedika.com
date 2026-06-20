import React, { useState } from 'react';

export default function Register({ onSuccess }) {
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
            setFormData({ fullName: '', email: '', password: '', gender: '', age: '', religion: '', location: '', profession: '' });

            if (onSuccess) {
                setTimeout(() => {
                    onSuccess();
                }, 1500);
            }
        } catch (err) {
            setErrorMsg(err.message);
        }
    };

    return (
        <>
            <h2 className="modal-title">Create Profile Account</h2>
            <p className="modal-subtitle">Join NichayaVedika Matrimony</p>

            {successMsg && <div className="form-msg-success">{successMsg}</div>}
            {errorMsg && <div className="form-msg-error">{errorMsg}</div>}

            <form onSubmit={handleFormSubmit} className="modal-form-matrix">
                <div className="form-group">
                    <label className="modal-field-label">Full Name</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="modal-input-field" />
                </div>

                <div className="form-group">
                    <label className="modal-field-label">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="modal-input-field" />
                </div>

                <div className="form-group">
                    <label className="modal-field-label">Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} required className="modal-input-field" />
                </div>

                {/* Gender & Age Row */}
                <div className="modal-form-row">
                    <div className="modal-row-flex-item">
                        <label className="modal-field-label">Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleInputChange} required className="modal-input-field modal-select-field">
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className="modal-row-flex-item">
                        <label className="modal-field-label">Age</label>
                        <input type="number" name="age" min="18" max="70" value={formData.age} onChange={handleInputChange} required className="modal-input-field" />
                    </div>
                </div>

                {/* Religion & Location Row */}
                <div className="modal-form-row">
                    <div className="modal-row-flex-item">
                        <label className="modal-field-label">Religion / Community</label>
                        <input type="text" name="religion" placeholder="e.g. Hindu" value={formData.religion} onChange={handleInputChange} required className="modal-input-field" />
                    </div>
                    <div className="modal-row-flex-item">
                        <label className="modal-field-label">Location / City</label>
                        <input type="text" name="location" placeholder="e.g. Hyderabad" value={formData.location} onChange={handleInputChange} required className="modal-input-field" />
                    </div>
                </div>

                <div className="form-group">
                    <label className="modal-field-label">Profession</label>
                    <input type="text" name="profession" placeholder="e.g. Software Engineer" value={formData.profession} onChange={handleInputChange} required className="modal-input-field" />
                </div>

                {/* STYLISH GOLD BUTTON */}
                <button type="submit" className="btn-modal-gold-action">Register Profile</button>
            </form>
        </>
    );
}
