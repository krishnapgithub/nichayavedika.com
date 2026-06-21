import React from 'react';

// Ensure 'user' and 'setUser' are explicitly declared inside the brackets here:
export default function Navbar({ user, setUser, onOpenLogin, onOpenRegister }) {

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        if (setUser) setUser(null);
        window.location.reload();
    };

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
                {/* Changed href to match the ID of the rates section */}
                <a href="#pricing-section" className="menu-item">Membership</a>
                <a href="#" className="menu-item">Events</a>
                <a href="#" className="menu-item">Contact us</a>
            </nav>
            {/* This section requires the 'user' prop declared above to render correctly */}
            <div className="nav-actions-auth">
                {user ? (
                    <>
                        <span className="nav-user-welcome" style={{ marginRight: '15px', color: '#d4af37', fontWeight: 'bold' }}>
                            Welcome, {user.fullName}!
                        </span>
                        <button className="btn-action-login" onClick={handleLogout}>LOGOUT</button>
                    </>
                ) : (
                    <>
                        <button className="btn-action-login" onClick={onOpenLogin}>LOGIN</button>
                        <button className="btn-action-login" onClick={onOpenRegister}>REGISTER</button>
                    </>
                )}
            </div>
        </header>
    );
}
