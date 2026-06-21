import React, { useState, useEffect } from 'react';
import './AnnouncementPopup.css'; // We will create this file next for styling

export default function AnnouncementPopup() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Automatically close the popup after 15000 milliseconds (15 seconds)
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 15000);

        // Clean up the timer if the user closes it manually before 15 seconds
        return () => clearTimeout(timer);
    }, []);

    // If the state is false, render nothing
    if (!isVisible) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h3>Important Announcement</h3>
                <p>Welcome to Nichayavedika! This message will automatically close in 15 seconds.</p>

                {/* Manual Close Button */}
                <button className="popup-close-btn" onClick={() => setIsVisible(false)}>
                    Close
                </button>
            </div>
        </div>
    );
}
