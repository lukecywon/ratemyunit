import React from "react";
import Logo from "./Logo.tsx";
import SmallSearchBar from "./SmallSearchBar.tsx";
import Button from "./Button.tsx";

interface TopbarProps {
}

const Topbar: React.FC<TopbarProps> = ({}) => {
    return (
        <header className="flex flex-row absolute top-0 w-full h-20 border-b bg-card shadow-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
                            <Logo />
                        </div>
                        <div>
                            <h1 className="text-xl font-medium text-foreground font-serif">Rate My Unit</h1>
                            <p className="text-sm text-muted-foreground font-mono">University Unit Reviews</p>
                        </div>
                    </div>

                    <div className="flex max-w-md mx-8">
                        <div className="relative">
                            <SmallSearchBar className="rounded-lg h-10 sm:h-12 text-md sm:text-lg"/>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button onClick={() => {}}>
                            Log in
                        </Button>
                    </div>

                </div>
            </div>
        </header>
    )
};

export default Topbar;