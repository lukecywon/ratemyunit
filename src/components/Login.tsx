import React, { useState, useEffect } from "react";
import Logo from "./Logo.tsx";


interface LoginProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: 'login' | 'signup';
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
    const [authMode, setAuthMode] = useState<'login' | 'signup'>(initialMode);

    useEffect(() => {
        setAuthMode(initialMode);
    }, [initialMode]);

    const toggleAuthMode = () => {
        setAuthMode(authMode === 'login' ? 'signup' : 'login');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <div className ="flex items-center gap-3">
                        <div className="flex items-center justify--center w-8 h-8 bg-primary rounded-lg">
                            <Logo />
                        </div>
                        <h2 className="text-xl font-semibold">
                            {authMode === 'login' ? 'Log in' : 'Sign up'}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>
                <form className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                        type="submit"
                        className="w-full bg-primary text-white p-3 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        {authMode === 'login' ? 'Log in' : 'Sign up'}
                    </button>
                </form>
                <p className="text-center mt-4 text-sm text-gray-600">
                    {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={toggleAuthMode}
                        className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                    >
                        {authMode === 'login' ? 'Sign up' : 'Log in'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;