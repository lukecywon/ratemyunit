import React from "react";
import Logo from "./Logo.tsx";

interface TopbarProps {
}

const Topbar: React.FC<TopbarProps> = ({}) => {
    return (
        <header className="flex flex-row absolute top-0 w-full h-24 border-b bg-card shadow-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-lg">
                            <Logo />
                        </div>
                        <div>
                            <h1 className="text-xl font-medium text-foreground font-serif">Rate My Unit</h1>
                            <p className="text-sm text-muted-foreground font-mono">University Unit Reviews</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
};

export default Topbar;