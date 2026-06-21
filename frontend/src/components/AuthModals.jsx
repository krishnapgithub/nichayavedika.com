import React from 'react';
import Register from './Register';
import LoginPopup from './LoginPopup';

export default function AuthModals({ isLoginOpen, isRegisterOpen, onCloseAll, onLoginSuccess }) {

    if (!isLoginOpen && !isRegisterOpen) return null;

    return (
        <>
            {/* 1. SEPARATE OPTIMIZED LOGIN POPUP OVERLAY */}
            <LoginPopup
                isOpen={isLoginOpen}
                onClose={onCloseAll}
                onLoginSuccess={onLoginSuccess}
            />

            {/* 2. REGISTRATION POPUP OVERLAY - DOUBLE WRAPPERS REMOVED */}
            <Register
                isOpen={isRegisterOpen}
                onClose={onCloseAll}
                onSuccess={() => {
                    onCloseAll();
                }}
            />
        </>
    );
}
