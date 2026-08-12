import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Review, AuthMode } from "../types.ts";
import { INITIAL_REVIEWS } from "../data.ts";

interface AppContextType {
  reviews: Review[];
  isLoggedIn: boolean;
  authModal: AuthMode;
  isScrolled: boolean;
  setAuthModal: (m: AuthMode) => void;
  setIsLoggedIn: (v: boolean) => void;
  handleUpvote: (id: number) => void;
  handleSubmitReview: (r: Omit<Review, "id" | "hasUpvoted" | "upvotes">) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authModal, setAuthModal] = useState<AuthMode>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleUpvote = (id: number) =>
    setReviews(prev =>
      prev.map(r =>
        r.id === id
          ? { ...r, hasUpvoted: !r.hasUpvoted, upvotes: r.hasUpvoted ? r.upvotes - 1 : r.upvotes + 1 }
          : r
      )
    );

  const handleSubmitReview = (review: Omit<Review, "id" | "hasUpvoted" | "upvotes">) =>
    setReviews(prev => [{ ...review, id: Date.now(), hasUpvoted: false, upvotes: 0 }, ...prev]);

  return (
    <AppContext.Provider value={{ reviews, isLoggedIn, authModal, isScrolled, setAuthModal, setIsLoggedIn, handleUpvote, handleSubmitReview }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
