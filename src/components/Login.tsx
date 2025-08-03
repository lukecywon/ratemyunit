import React, { useState } from "react";

interface LoginProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: 'login' | 'signup';
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
    const [authMode, setAuthMode] = useState<'login' | 'signup'>(initialMode);

    const toggleAuthMode = () => {
        setAuthMode(authMode === 'login' ? 'signup' : 'login');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        {authMode === 'login' ? 'Log in' : 'Sign up'}
                    </h2>
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
                        className="text-primary hover:underline"
                    >
                        {authMode === 'login' ? 'Sign up' : 'Log in'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;