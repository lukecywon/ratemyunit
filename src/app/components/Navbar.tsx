import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { LogoMark } from "./Shared.tsx";
import { useApp } from "../context/AppContext.tsx";

const NAV_LINKS = [
  { label: "About",         to: "/about"   },
  { label: "Support",       to: "/support" },
  { label: "Suggest a Unit",to: "/suggest" },
];

export default function Navbar() {
  const { isLoggedIn, isScrolled, setIsLoggedIn, setAuthModal } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const showBg = !isHome || isScrolled;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${showBg ? "bg-background/95 backdrop-blur border-b border-border shadow-sm" : ""}`}>
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <LogoMark size="sm" />
            <span className="font-mono text-sm font-bold hidden sm:block" style={{ fontFamily: "'Space Mono',monospace" }}>
              ratemyunit_
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1 ml-4">
            {NAV_LINKS.map(({ label, to }) => (
              <Link key={to} to={to} className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${pathname === to ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {isLoggedIn ? (
              <button onClick={() => setIsLoggedIn(false)} className="text-sm px-4 py-1.5 bg-card border border-border rounded-lg hover:bg-muted transition-colors shadow-sm">
                Log out
              </button>
            ) : (
              <>
                <button onClick={() => setAuthModal("signup")} className="hidden sm:block text-sm px-4 py-1.5 bg-card border border-border rounded-lg hover:bg-muted transition-colors shadow-sm">
                  Sign up
                </button>
                <button onClick={() => setAuthModal("login")} className="text-sm px-4 py-1.5 bg-foreground text-background rounded-lg hover:bg-black/80 transition-colors shadow-sm">
                  Log in
                </button>
              </>
            )}
            <button onClick={() => setMobileOpen(true)} className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 right-0 bottom-0 w-72 bg-card border-l border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono font-bold text-sm">ratemyunit_</span>
              <button onClick={() => setMobileOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-1">
              {NAV_LINKS.map(({ label, to }) => (
                <Link key={to} to={to} onClick={() => setMobileOpen(false)} className="block text-sm px-3 py-2.5 rounded-xl hover:bg-muted transition-colors">
                  {label}
                </Link>
              ))}
            </div>
            {!isLoggedIn && (
              <div className="mt-6 space-y-2">
                <button onClick={() => { setAuthModal("signup"); setMobileOpen(false); }} className="w-full text-sm py-2.5 border border-border rounded-xl hover:bg-muted transition-colors">Sign up</button>
                <button onClick={() => { setAuthModal("login"); setMobileOpen(false); }} className="w-full text-sm py-2.5 bg-foreground text-background rounded-xl hover:bg-black/80 transition-colors">Log in</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
