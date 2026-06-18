import React, { useState } from 'react';

export default function AuthModals({ isLoginOpen, isRegisterOpen, onCloseAll }) {
  // 1. Core input trackers state hooks
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isLoginOpen && !isRegisterOpen) return null;

  // 2. Clear out state fields when closed safely
  const handleClose = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    onCloseAll();
  };

  // 3. Submits new registration documents directly to your Node.js server
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password })
      });
      const data = await response.json();
      
      if (response.ok) {
        alert("Registration cleared! Please log in now.");
        handleClose();
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      alert("Cannot reach backend server. Make sure node server.js is running in your other terminal!");
    }
  };

  // 4. Submits user logins directly to your backend authentication router
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (response.ok) {
        alert(`Welcome back, ${data.user.fullName}!`);
        localStorage.setItem('userToken', data.token); // Securely saves session access tokens
        handleClose();
      } else {
        alert(data.message || "Login verification failed");
      }
    } catch (err) {
      alert("Cannot reach backend server. Make sure node server.js is running in your other terminal!");
    }
  };

  return (
    <>
      {/* LOGIN MODAL FORM OVERLAY */}
      {isLoginOpen && (
        <div className="auth-modal-overlay">
          <div className="auth-modal-card">
            <button className="modal-close-btn" onClick={handleClose}>&times;</button>
            <div className="auth-modal-header">
              <h3>Welcome Back</h3>
              <p>Login to your account</p>
            </div>
            {/* FIXED: Form points directly to handleLoginSubmit handler */}
            <form onSubmit={handleLoginSubmit}>
              <div className="auth-input-group">
                <label>Email Address</label>
                <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="auth-input-group">
                <label>Password</label>
                <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="auth-submit-btn">Login to Account</button>
            </form>
          </div>
        </div>
      )}

      {/* REGISTRATION MODAL FORM OVERLAY */}
      {isRegisterOpen && (
        <div className="auth-modal-overlay">
          <div className="auth-modal-card">
            <button className="modal-close-btn" onClick={handleClose}>&times;</button>
            <div className="auth-modal-header">
              <h3>Create Free Account</h3>
              <p>Join thousands of verified families</p>
            </div>
            {/* FIXED: Form points directly to handleRegisterSubmit handler */}
            <form onSubmit={handleRegisterSubmit}>
              <div className="auth-input-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </div>
              <div className="auth-input-group">
                <label>Email Address</label>
                <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="auth-input-group">
                <label>Password</label>
                <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="auth-submit-btn" style={{ background: '#b45309' }}>Register Free</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
