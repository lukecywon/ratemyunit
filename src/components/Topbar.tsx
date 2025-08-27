// Added and changed a few things
import React, { useState } from "react";
import Logo from "./Logo.tsx";
import SmallSearchBar from "./SmallSearchBar.tsx";
import Login from "./Login.tsx";
import Button from "./Button.tsx";

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
            <header className="absolute top-0 left-0 w-full h-24 border-b bg-card shadow-sm overflow-hidden">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 flex-shrink-0 bg-primary rounded-lg">
                                <Logo />
                            </div>
                            <div className="hidden md:block ml-3">
                                <h1 className="md:text-xl font-medium text-foreground">RateMyUnit</h1>
                                <p className="md:text-sm text-muted-foreground">University Unit Reviews</p>
                            </div>
                        </div>

                        <div className="flex sm:min-w-sm md:min-w-md mx-8">
                            <div className="relative w-full">
                                <SmallSearchBar onSearch={handleSearch} className="font-sans rounded-lg h-10 sm:h-12 text-md sm:text-lg"/>
                            </div>
                        </div>

                        <div className="flex ml-auto gap-4">
                            <Button
                                onClick={() => handleAuthClick('signup')}
                                className="px-4 py-2 text-secondary-foreground rounded-lg transition-colors flex items-center gap-2"
                            >
                                {/* Changes in the new few lines */}
                                <span className="material-icons">manage_accounts</span>
                                <span className="hidden md:block">Sign up</span>
                            </Button>
                            <Button
                                onClick={() => handleAuthClick('login')}
                                className="px-4 py-2 text-secondary-foreground rounded-lg transition-colors flex items-center gap-2"
                            >
                                <span className="material-icons">account_circle</span>
                                <span className="hidden md:block">Log in</span>
                            </Button>
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