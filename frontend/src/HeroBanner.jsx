import React from 'react';

export default function HeroBanner({ onOpenLogin, onOpenRegister }) {
    return (
        <div className="global-hero-banner-outer-wrapper">
            <div className="global-hero-banner-section">
                <div className="hero-banner-inner-container">
                    <div className="hero-banner-left-content">
                        <div className="hero-mini-emblem-badge">
                            <img src="nvlogov1.png" alt="Sita Rama" />
                            <span className="hero-emblem-subtext">॥ श्री सीतारामार्पणमस्तु ॥</span>
                        </div>
                        <h2 className="hero-banner-main-headline">Find Your Perfect Partner</h2>
                        <p className="hero-banner-supporting-subline">The Place Where Marriage Decisions Are Finalized</p>
                        <div className="hero-banner-actions-group">
                            <button className="hero-btn-solid" onClick={onOpenRegister}>Create Profile</button>
                            <button className="hero-btn-outline" onClick={onOpenLogin}>Search Profiles</button>
                        </div>
                    </div>
                    <div className="hero-banner-right-media-column">
                        <div className="hero-banner-main-artwork-wrapper">
                            <img src="rama-site.png" alt="Traditional Marriage" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
