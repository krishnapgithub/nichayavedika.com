import React from 'react';

export default function Navbar({ onOpenLogin, onOpenRegister }) {
  return (
    <header className="global-site-navbar">
      <div className="nav-brand-container">
        <div className="brand-logo-circle">
          <span className="logo-text">
            <span className="maroon-letter">N</span>
            <span className="gold-letter">V</span>
          </span>
        </div>
        <div className="brand-text-stack">
          <h1 className="brand-main-title">
            <span className="text-maroon">Nichaya</span>
            <span className="text-gold">Vedika</span>
          </h1>
          <span className="brand-caption-text">✧ Sita Rama blessing ✧</span>
        </div>
      </div>
      <nav className="nav-links-menu">
        <a href="#" className="menu-item active">Home</a>
        <a href="#" className="menu-item">Membership</a>
        <a href="#" className="menu-item">Events</a>
        <a href="#" className="menu-item">Contact us</a>
      </nav>
      <div className="nav-actions-auth">
        <button className="btn-action-login" onClick={onOpenLogin}>LOGIN</button>
        <button className="btn-action-register" onClick={onOpenRegister}>REGISTER</button>
      </div>
    </header>
  );
}
