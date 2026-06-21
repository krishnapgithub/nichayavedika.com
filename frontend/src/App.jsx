import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import AuthModals from './components/AuthModals';
import Register from './components/Register';
import InactivityTracker from './components/InactivityTracker';
import ResetPasswordPage from './components/ResetPasswordPage'; // Added Reset Page Import

export default function App() {
    const [user, setUser] = useState(null);
    const [bannerMessage, setBannerMessage] = useState('');
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    // Initialize your profile deck with exactly 4 stable placeholder items
    const [profiles, setProfiles] = useState([
        { _id: 'temp1', fullName: 'Meera Hegde', gender: 'Female', age: 25, location: 'Bangalore', isPlaceholder: true },
        { _id: 'temp2', fullName: 'Aditya Verma', gender: 'Male', age: 28, location: 'Mumbai', isPlaceholder: true },
        { _id: 'temp3', fullName: 'Ananya Iyer', gender: 'Female', age: 26, location: 'Chennai', isPlaceholder: true },
        { _id: 'temp4', fullName: 'Rohan Sharma', gender: 'Male', age: 29, location: 'Delhi', isPlaceholder: true }
    ]);

    const [loading, setLoading] = useState(false);

useEffect(() => {
  const loadProfiles = async () => {
    setLoading(true);
    try {
      // 🌟 Double check this endpoint matches your backend exactly!
      const response = await fetch('http://localhost:5000/api/auth/profiles'); 
      const data = await response.json();
      
      // Only overwrite the placeholder array if the backend actually sent valid data
      if (response.ok && Array.isArray(data) && data.length > 0) {
        setProfiles(data);
      } else {
        console.warn("Backend didn't return data, keeping placeholder profiles.");
      }
    } catch (error) {
      console.error("Failed to connect to backend server. Keeping placeholders:", error);
    } finally {
      // 🌟 Crucial: This turns off the "loading..." text no matter what happens
      setLoading(false); 
    }
  };

  loadProfiles();
}, []);

    // Detect active logins and restore sessions on page load 
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
            const flashBanner = sessionStorage.getItem('showWelcomeBanner');
            if (flashBanner === 'true') {
                setBannerMessage(`✨ Welcome back, ${parsedUser.fullName}! Login successful.`);
                sessionStorage.removeItem('showWelcomeBanner');
                setTimeout(() => {
                    setBannerMessage('');
                }, 5000);
            }
        }
    }, []);

    const closeModals = () => {
        setIsLoginOpen(false);
        setIsRegisterOpen(false);
    };

    // Hydrates the templates over the network pipeline while locking length to 4
    useEffect(() => {
        const fetchCloudProfiles = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/auth/profiles');
                const data = await response.json();

                if (response.ok && data.length > 0) {
                    const latestFourData = data.slice(0, 4);
                    setProfiles(prev => {
                        return prev.map((placeholder, index) => {
                            if (latestFourData[index]) {
                                return { ...latestFourData[index], isPlaceholder: false };
                            }
                            return placeholder;
                        });
                    });
                }
            } catch (err) {
                console.error("Error connecting with MERN database profile feeds:", err);
            }
        };
        fetchCloudProfiles();
    }, []);

    // Checks if the browser URL path currently holds a security token link
    const isResetView = window.location.pathname.includes('/reset-password');
    return (
        <div className="app-viewport-container" style={{ position: 'relative' }}>

            {/* 1. DYNAMIC TOP FLOATING BANNER */}
            {bannerMessage && (
                <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#800000', color: '#ffffff', border: '2px solid #d4af37', padding: '12px 30px', borderRadius: '30px', fontWeight: 'bold', fontSize: '15px', zIndex: 10000, boxShadow: '0 4px 15px rgba(0,0,0,0.3)', textAlign: 'center' }}>
                    {bannerMessage}
                </div>
            )}

            {/* 2. GLOBAL NAVBAR HEADER (Always visible on all pages) */}
            <Navbar
                user={user}
                setUser={setUser}
                onOpenLogin={() => { setIsLoginOpen(true); setIsRegisterOpen(false); }}
                onOpenRegister={() => { setIsRegisterOpen(true); setIsLoginOpen(false); }}
            />

            {isResetView ? (
                /* ========================================================================= */
                /* VIEW A: RENDER ONLY PASSWORD OVERWRITE CARD IF IN RESET LINK MODE         */
                /* ========================================================================= */
                <ResetPasswordPage />
            ) : (
                /* ========================================================================= */
                /* VIEW B: STANDARD HOMEPAGE CORE LANDING SYSTEM CONTENTS                   */
                /* ========================================================================= */
                <>
                    {/* 3. HERO AND CARDS CONTENT GRID */}
                    <section className="horizontal-hero-matrix structural-realignment">
                        <div className="left-branded-image-stack">
                            <div className="hero-banner-right-media-column">
                                <div className="hero-banner-main-artwork-wrapper">
                                    <img src="nvlogo.jpg" alt="Sita Rama Blessings" />
                                </div>
                            </div>
                        </div>
                        <div className="right-content-management-stack">
                            <div className="nav-actions-auth">
                                {user ? (
                                    <span style={{ color: '#800000', fontWeight: '600', fontStyle: 'italic' }}> ✓ You are logged in as an active member. </span>
                                ) : (
                                    <>
                                        <button className="btn-action-login" onClick={() => { setIsLoginOpen(true); setIsRegisterOpen(false); }}>Create Profile</button>
                                        <button className="btn-action-login" onClick={() => { setIsRegisterOpen(true); setIsLoginOpen(false); }}>Browse Profile(s)</button>
                                    </>
                                )}
                            </div>

                            <div className="profile-cards-grid-row-four">
                                {profiles.map((item) => (
                                    <div
                                        className={`member-profile-card-four ${item.isPlaceholder ? 'skeleton-loading-pulse' : ''}`}
                                        key={item._id}
                                        style={{ opacity: item.isPlaceholder ? 0.75 : 1, transition: 'opacity 0.4s ease, transform 0.3s' }}
                                    >
                                        <span className={`member-tag-label ${item.gender === 'Female' ? 'new-female' : 'new-male'}`}>
                                            {item.isPlaceholder ? 'Preview' : `New ${item.gender}`}
                                        </span>
                                        <div className="member-avatar-circle">
                                            <span className="avatar-placeholder">
                                                {item.fullName ? item.fullName.charAt(0).toUpperCase() : 'U'}
                                            </span>
                                        </div>
                                        <h4 className="member-display-name">{item.fullName}</h4>
                                        <p className="member-meta-details">{item.age} Yrs • {item.location}</p>
                                        <button className="btn-view-profile-card" disabled={item.isPlaceholder}>
                                            {item.isPlaceholder ? 'Loading...' : 'View Profile'}
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="platform-info-highlights-strip">
                                <div className="info-highlight-item">
                                    <span className="info-metric-number">10,000+</span>
                                    <span className="info-metric-label">🛡️ Verified Profiles</span>
                                </div>
                                <div className="info-highlight-divider"></div>
                                <div className="info-highlight-item">
                                    <span className="info-metric-number">5,000+</span>
                                    <span className="info-metric-label">❤️ Happy Marriages</span>
                                </div>
                                <div className="info-highlight-divider"></div>
                                <div className="info-highlight-item">
                                    <span className="info-metric-number">100%</span>
                                    <span className="info-metric-label">🔒 Privacy Protected</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 4. SEARCH FILTER ROW SYSTEM */}
                    <section className="global-full-width-search-bar-system">
                        <div className="search-panel-container">
                            <div className="search-panel-header-row">
                                <h3 className="search-panel-title">⚜️ Find Your Ideal Connection</h3>
                            </div>
                            <form className="search-filter-horizontal-form" onSubmit={(e) => e.preventDefault()}>
                                <div className="form-field-group-block">
                                    <label htmlFor="search-religion">Religion</label>
                                    <div className="custom-select-wrapper">
                                        <select id="search-religion">
                                            <option value="any">Any</option>
                                            <option value="hindu">Hindu</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-field-group-block">
                                    <label htmlFor="search-community">Community</label>
                                    <div className="custom-select-wrapper">
                                        <select id="search-community">
                                            <option value="any">Any</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-field-group-block">
                                    <label htmlFor="search-age">Age Scale</label>
                                    <div className="custom-select-wrapper">
                                        <select id="search-age">
                                            <option value="18-60">18 - 60 Years</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-field-group-block">
                                    <label htmlFor="search-country">Country</label>
                                    <div className="custom-select-wrapper">
                                        <select id="search-country">
                                            <option value="us">United States</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-field-group-block">
                                    <label htmlFor="search-state">State</label>
                                    <div className="custom-select-wrapper">
                                        <select id="search-state">
                                            <option value="any">Telangana</option>
                                            <option value="any">Andhra Pradesh</option>
                                            <option value="any">Karnataka</option>
                                            <option value="any">Tamil Nadu</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-submit-action-block">
                                    <button type="submit" className="btn-action-login"> <span>Search Profiles</span> </button>
                                </div>
                            </form>
                        </div>
                    </section>

                    {/* 5. FOOTER LEGAL LINKS */}
                    <footer className="global-site-footer">
                        <div className="footer-divider-line"></div>
                        <div className="footer-content-wrapper">
                            <div className="footer-left-legal">
                                <p>&copy; 2026 NichayaVedika. All Rights Reserved.</p>
                            </div>
                            <div className="footer-right-links">
                                <a href="#" className="footer-link">Privacy Policy</a>
                                <span className="link-separator">•</span>
                                <a href="#" className="footer-link">Terms of Use</a>
                                <span className="link-separator">•</span>
                                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-link facebook-brand-link">
                                    <span>Facebook</span>
                                </a>
                            </div>
                        </div>
                    </footer>
                </>
            )}

            {/* 6. GLOBAL CONTROLLERS AND SYSTEM OVERLAYS */}
            <AuthModals
                isLoginOpen={isLoginOpen}
                isRegisterOpen={isRegisterOpen}
                onCloseAll={closeModals}
                onLoginSuccess={setUser}
            />

            <InactivityTracker />
        </div>
    );
}
