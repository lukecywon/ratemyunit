import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "../context/AppContext.tsx";
import { LogoMark } from "./Shared.tsx";

export default function AuthModal() {
  const { authModal, setAuthModal, setIsLoggedIn } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  if (!authModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setAuthModal(null);
    toast.success(authModal === "login" ? "Logged in!" : "Account created!", {
      description: "You can now submit reviews.",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setAuthModal(null)} />
      <div className="relative bg-card border border-border rounded-2xl p-8 w-full max-w-sm shadow-2xl">
        <button onClick={() => setAuthModal(null)} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted transition-colors">
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-3 mb-6">
          <LogoMark size="sm" />
          <div>
            <h2 className="font-semibold text-base">{authModal === "login" ? "Welcome back" : "Join ratemyunit_"}</h2>
            <p className="text-xs text-muted-foreground">Monash University students only</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {authModal === "signup" && (
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-1.5">Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="w-full bg-muted rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/15" />
            </div>
          )}
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-1.5">Monash Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="student@student.monash.edu" className="w-full bg-muted rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/15" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-1.5">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-muted rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/15" />
          </div>
          <button type="submit" className="w-full bg-foreground text-background py-2.5 rounded-xl text-sm font-medium hover:bg-black/80 transition-colors">
            {authModal === "login" ? "Log In" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
