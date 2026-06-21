import React, { useState, useEffect, useRef } from 'react';

export default function InactivityTracker() {
    const [showWarning, setShowWarning] = useState(false);
    const [countdown, setCountdown] = useState(10); // 10-second countdown inside the card

    const inactivityTimerRef = useRef(null);
    const countdownIntervalRef = useRef(null);

    useEffect(() => {
        // 1. Check if a user session exists in local storage
        const savedUser = localStorage.getItem('user');
        if (!savedUser) return; // If nobody is logged in, do absolutely nothing

        const resetTimer = () => {
            // If the warning card is already on screen, don't reset the timer on mouse movement
            if (showWarning) return;

            if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);

            // Set logout countdown threshold for 5 minutes (5 * 60 * 1000)
            // Tip: Leave it at 10 * 1000 for your quick 10-second test!
            inactivityTimerRef.current = setTimeout(() => {
                setShowWarning(true);
            }, 10 * 1000);
        };

        // Listen for any active user movement on the page
        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('click', resetTimer);
        window.addEventListener('keydown', resetTimer);
        window.addEventListener('touchstart', resetTimer);

        // Start the tracking timer when the website loads
        resetTimer();

        // Cleanup event listeners when component unmounts
        return () => {
            if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('click', resetTimer);
            window.removeEventListener('keydown', resetTimer);
            window.removeEventListener('touchstart', resetTimer);
        };
    }, [showWarning]);

    // Handle the active ticking countdown once the warning card shows up
    useEffect(() => {
        if (showWarning) {
            setCountdown(10); // Reset clock to 10 seconds

            countdownIntervalRef.current = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(countdownIntervalRef.current);
                        handleForceLogout(); // Time's up! Force immediate logout
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
        };
    }, [showWarning]);

    const handleExtendSession = () => {
        if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
        setShowWarning(false); // Hide the card and resume normal monitoring
    };

    const handleForceLogout = () => {
        if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

        // Clear data from browser memory cache
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        setShowWarning(false);
        window.location.reload(); // Refresh the page to show the logged-out state
    };

    return (
        <>
            {showWarning && (
                <div className="inactivity-overlay" style={{
                    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.75)', display: 'flex', justifyContent: 'center',
                    alignItems: 'center', zIndex: 10005
                }}>
                    {/* FIXED MAXWIDTH TYPO VALUE BELOW TO PREVENT COMPILE CRASHES */}
                    <div className="inactivity-card" style={{
                        backgroundColor: '#ffffff', color: '#1a1a1a', padding: '35px 30px',
                        borderRadius: '12px', width: '90%', maxWidth: '400px', textAlign: 'center',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.5)', border: '2px solid #d4af37', position: 'relative'
                    }}>
                        {/* Top Decorative Icon */}
                        <div style={{ fontSize: '45px', color: '#800000', marginBottom: '10px' }}>⏳</div>

                        <h2 style={{ color: '#800000', margin: '0 0 10px 0', fontSize: '22px', fontWeight: 'bold' }}>
                            Session Expiry Warning
                        </h2>

                        <p style={{ color: '#444444', fontSize: '15px', lineHeight: '1.5', margin: '0 0 20px 0' }}>
                            You have been inactive for a while. For your privacy, your profile session will automatically disconnect in:
                        </p>

                        {/* Large Animated Timer */}
                        <div style={{
                            fontSize: '32px', fontWeight: 'bold', color: '#800000',
                            backgroundColor: '#fcf8e3', border: '1px dashed #d4af37',
                            padding: '10px', borderRadius: '8px', width: '100px', margin: '0 auto 25px auto'
                        }}>
                            {countdown}s
                        </div>

                        {/* ACTION BUTTONS */}
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button
                                onClick={handleForceLogout}
                                style={{
                                    flex: 1, backgroundColor: '#f5f5f5', color: '#333333', border: '1px solid #cccccc',
                                    padding: '12px', borderRadius: '6px', fontWeight: '600', fontSize: '14px', cursor: 'pointer'
                                }}
                            >
                                Logout Now
                            </button>

                            <button
                                onClick={handleExtendSession}
                                style={{
                                    flex: 1, backgroundColor: '#800000', color: '#ffffff', border: 'none',
                                    padding: '12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '14px',
                                    cursor: 'pointer', boxShadow: '0 4px 10px rgba(128,0,0,0.2)'
                                }}
                            >
                                Stay Logged In
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
