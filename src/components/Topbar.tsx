// Added and changed a few things
import React, { useState } from "react";
import Logo from "./Logo.tsx";
import SmallSearchBar from "./SmallSearchBar.tsx";
import Login from "./Login.tsx";

const handleSearch = (query: string) => {
    console.log('Searching for units or reviews:', query);
};

const Topbar: React.FC = () => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

    const handleAuthClick = (mode: 'login' | 'signup') => {
        setAuthMode(mode);
        setShowAuthModal(true);
    };

    return (
        <>
            <header className="flex flex-row absolute top-0 w-full h-22 border-b bg-card shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center md:w-12 md:h-12 bg-primary rounded-lg">
                                <Logo />
                            </div>
                            <div>
                                <h1 className="hidden md:block md:text-xl font-medium text-foreground font-serif">ratemyunit</h1>
                                <p className="hidden md:block md:text-sm text-muted-foreground font-mono">University Unit Reviews</p>
                            </div>
                        </div>

                        <div className="flex sm:min-w-md md:min-w-lg mx-8">
                            <div className="relative w-full">
                                <SmallSearchBar onSearch={handleSearch} className="rounded-lg h-10 sm:h-12 text-md sm:text-lg"/>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => handleAuthClick('signup')}
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                {/* Changes in the new few lines */}
                                Sign up
                            </button>
                            <button
                                onClick={() => handleAuthClick('login')}
                                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors flex items-center gap-2"
                            >
                                <span className="material-icons">account_circle</span>
                                <span className="hidden md:block">Log in</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <Login
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                initialMode={authMode}
            />
        </>
    );
};

export default Topbar;