import React, { useState, useEffect } from 'react';
import './App.css';
import AuthModals from './AuthModals';

// 1. Import the component (Make sure the file path matches where you saved it)
//import ConstructionBanner from './ConstructionBanner';

import Register from './Register'; // Import the new registration component

export default function App() {


    
  // State handles for smooth backdrop login/register popups
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  
  // Database store array for active cloud documents
  const [profiles, setProfiles] = useState([]);

  const closeModals = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };



  // Queries your live cloud collection across network port 5000
  useEffect(() => {
    const fetchCloudProfiles = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/profiles');
        const data = await response.json();
        if (response.ok) {
          setProfiles(data);
        }
      } catch (err) {
        console.error("Error connecting with MERN database profile feeds:", err);
      }
    };
    fetchCloudProfiles();
  }, [isRegisterOpen]); // Refreshes profiles instantly if a user registers successfully

  return (
    <div className="app-viewport-container">
      
      {/* 1. GLOBAL SITE HEADER NAVBAR */}
      <header className="global-site-navbar">
        <div className="nav-brand-container">
          <div className="brand-logo-circle">
            <span className="logo-text">
              <span className="maroon-letter">N</span><span className="gold-letter">V</span>
            </span>
          </div>
          <div className="brand-text-stack">
            <h1 className="brand-main-title">
              <span className="text-maroon">Nichaya</span><span className="text-gold">Vedika</span>
            </h1>
            <span className="brand-caption-text">✧ Sita Rama blessing ✧</span>
          </div>
        </div>

        <input type="checkbox" id="mobile-menu-toggle-checkbox" className="nav-toggle-checkbox" />
        <label htmlFor="mobile-menu-toggle-checkbox" className="mobile-hamburger-btn">
          <span></span><span></span><span></span>
        </label>

        <nav className="nav-links-menu">
          <a href="#" className="menu-item active">Home</a>
          <a href="#" className="menu-item">Membership</a>
          <a href="#" className="menu-item">Events</a>
          <a href="#" className="menu-item">Contact us</a>
          <a href="#" className="menu-item">About us</a>
        </nav>

        <div className="nav-actions-auth">
          <button className="btn-action-login" onClick={() => { setIsLoginOpen(true); setIsRegisterOpen(false); }}>LOGIN</button>
                  <button className="btn-action-login" onClick={() => { setIsRegisterOpen(true); setIsLoginOpen(false); }}>REGISTER</button>
        </div>
      </header>

      {/* 2. MAIN HERO REALIGNMENT BODY CONTAINER */}
      <section className="horizontal-hero-matrix structural-realignment">
        
        {/* LEFT COLUMN: FIXED IMAGE CARD (Arch fully removed, clean bento-radius instead) */}
        <div className="left-branded-image-stack">
          <div className="hero-banner-right-media-column">
            <div className="hero-banner-main-artwork-wrapper">
              <img src="nvlogo.jpg" alt="Sita Rama Blessings" />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CONTROLS & 4 LATEST USER PROFILE CARDS */}
        <div className="right-content-management-stack">
<div className="nav-actions-auth">
  {/* Added active onClick handlers to toggle your registration modals instantly */}
  <button className="btn-action-login" onClick={() => { setIsLoginOpen(true); setIsRegisterOpen(false); }}>Create Profile</button>
                      <button className="btn-action-login" onClick={() => { setIsRegisterOpen(true); setIsLoginOpen(false); }}>Browse Profile(s)</button>
</div>

          <div className="profile-cards-grid-row-four">
            {profiles.length > 0 ? (
              // Loops your custom HTML over real MongoDB Atlas data profiles dynamically
              profiles.map((user) => (
                <div className="member-profile-card-four" key={user._id}>
                  <span className={`member-tag-label ${user.gender === 'Female' ? 'new-female' : 'new-male'}`}>
                    New {user.gender || 'Female'}
                  </span>
                  <div className="member-avatar-circle">
                    <span className="avatar-placeholder">{user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}</span>
                  </div>
                  <h4 className="member-display-name">{user.fullName}</h4>
                  <p className="member-meta-details">{user.age || 25} Yrs • {user.location || 'Any'}</p>
                  <button className="btn-view-profile-card">View Profile</button>
                </div>
              ))
            ) : (
              // Your native HTML cards serve as a smart fallback if the database has 0 user documents
              <>
                <div className="member-profile-card-four">
                  <span className="member-tag-label new-female">New Female</span>
                  <div className="member-avatar-circle"><span className="avatar-placeholder">F</span></div>
                  <h4 className="member-display-name">Meera Hegde</h4>
                  <p className="member-meta-details">25 Yrs • Bangalore</p>
                                      <button className="btn-view-profile-card">View Profile</button>
                </div>
                <div className="member-profile-card-four">
                  <span className="member-tag-label new-male">New Male</span>
                  <div className="member-avatar-circle"><span className="avatar-placeholder">M</span></div>
                  <h4 className="member-display-name">Aditya Verma</h4>
                  <p className="member-meta-details">28 Yrs • Mumbai</p>
                  <button className="btn-view-profile-card">View Profile</button>
                </div>
                <div className="member-profile-card-four">
                  <span className="member-tag-label new-female">New Female</span>
                  <div className="member-avatar-circle"><span className="avatar-placeholder">F</span></div>
                  <h4 className="member-display-name">Ananya Iyer</h4>
                  <p className="member-meta-details">26 Yrs • Chennai</p>
                  <button className="btn-view-profile-card">View Profile</button>
                </div>
                <div className="member-profile-card-four">
                  <span className="member-tag-label new-male">New Male</span>
                  <div className="member-avatar-circle"><span className="avatar-placeholder">M</span></div>
                  <h4 className="member-display-name">Rohan Sharma</h4>
                  <p className="member-meta-details">29 Yrs • Delhi</p>
                  <button className="btn-view-profile-card">View Profile</button>
                </div>
              </>
            )}
          </div>
          {/* PLATFORM TRUST NUMBERS METRIC ROW */}
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

      {/* STEP 3: HORIZONTAL FILTER ROW SEARCH MATRIX */}
      <section className="global-full-width-search-bar-system">
        <div className="search-panel-container">
          <div className="search-panel-header-row">
            <h3 className="search-panel-title">⚜ Find Your Ideal Connection</h3>
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
                                  <option value="any">Andra Pradesh</option>
                                  <option value="any">Karnataka</option>
                                  <option value="any">Tamilanadu</option>
                </select>
              </div>
            </div>
            <div className="form-submit-action-block">
                          <button type="submit" className="btn-action-login">
                <span>Search</span> <span> Profiles</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 4. BRAND FOOTER SYSTEM */}
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
              <svg className="facebook-icon-svg" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z" />
              </svg>
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </footer>

      {/* ACTIVE AUTHORIZATION WINDOW POPUP OVERLAYS CONTROLLER */}
         

          {/* ACTIVE AUTHORIZATION WINDOW POPUP OVERLAYS CONTROLLER */}
          <AuthModals
              isLoginOpen={isLoginOpen}
              isRegisterOpen={isRegisterOpen}
              onCloseAll={closeModals}
          />

          {/* POPUP OVERLAY MOUNT FOR REGISTRATION COMPONENT */}
          {isRegisterOpen && (
              <div className="modal-overlay">
                  <div className="modal-box">
                      <button className="close-btn" onClick={closeModals}>&times;</button>
                      <Register onSuccess={closeModals} />
                  </div>
              </div>
          )}


    </div>
  );
}
