import React, { useState, useEffect } from 'react';
import './ConstructionBanner.css';

const ConstructionBanner = () => {
    const [isFading, setIsFading] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        // 1. Start fading out at 9 seconds (9000ms)
        const fadeTimer = setTimeout(() => {
            setIsFading(true);
        }, 9000);

        // 2. Completely hidden at exactly 10 seconds (10000ms) to reveal home page
        const hideTimer = setTimeout(() => {
            setIsHidden(true);
        }, 10000);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    if (isHidden) return null;

    return (
        <div id="construction-banner" className={isFading ? 'fade-out' : ''}>
            <div className="banner-content">
                <div className="banner-icon">🚧</div>
                <h1>Under Construction</h1>
                <p>We are polishing up nichayavedika.com to give you the best experience possible.</p>
                <div className="loading-bar"><div className="progress"></div></div>
            </div>
        </div>
    );
};

export default ConstructionBanner;
