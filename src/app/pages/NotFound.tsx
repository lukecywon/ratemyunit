import { Link } from "react-router";
import { LogoMark } from "../components/Shared.tsx";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center">
        <LogoMark size="md" />
        <div className="font-mono text-6xl font-bold mt-6 mb-2">404</div>
        <p className="text-muted-foreground mb-6">This page doesn't exist.</p>
        <Link to="/" className="bg-foreground text-background px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-black/80 transition-colors">
          Go home
        </Link>
      </div>
    </div>
  );
}
