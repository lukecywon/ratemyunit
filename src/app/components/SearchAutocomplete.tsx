import { useState, useMemo, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router";
import { UNITS, ratingColor } from "../data.ts";
import { FacultyBadge, CampusPill } from "./Shared.tsx";

export default function SearchAutocomplete({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return UNITS.filter(u =>
      u.code.toLowerCase().includes(q) || u.name.toLowerCase().includes(q) ||
      u.school.toLowerCase().includes(q) || u.tags.some(t => t.includes(q))
    ).slice(0, 7);
  }, [query]);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setOpen(false);
    }
  };

  return (
    <div ref={ref} className="relative w-full max-w-lg">
      <form onSubmit={submit}>
        <div className="relative">
          <input
            value={query}
            onChange={e => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            placeholder="Search units or reviews..."
            className="w-full bg-white/88 backdrop-blur border border-white/50 rounded-2xl pl-5 pr-14 py-4 text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-black/15 placeholder:text-gray-400"
          />
          <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-foreground text-background rounded-xl flex items-center justify-center hover:bg-black/80 transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </form>

      {open && suggestions.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-50">
          {suggestions.map(u => (
            <button
              key={u.code}
              onMouseDown={() => { navigate(`/unit/${u.code}`); setOpen(false); setQuery(""); }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted text-left transition-colors border-b border-border last:border-0"
            >
              <FacultyBadge faculty={u.faculty} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-muted-foreground">{u.code}</span>
                  <span className="text-[11px] text-muted-foreground">L{u.level} · {u.school}</span>
                </div>
                <div className="text-sm font-medium truncate capitalize">{u.name}</div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="font-mono text-sm font-bold" style={{ color: ratingColor(u.rating) }}>
                  {u.rating > 0 ? u.rating.toFixed(1) : "—"}
                </span>
                <div className="flex gap-0.5">{u.campuses.map(c => <CampusPill key={c} campus={c} />)}</div>
              </div>
            </button>
          ))}
          <button
            onMouseDown={() => { navigate(`/search?q=${encodeURIComponent(query)}`); setOpen(false); }}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground hover:bg-muted transition-colors"
          >
            <Search className="w-4 h-4" /> Search for &ldquo;{query}&rdquo;
          </button>
        </div>
      )}
    </div>
  );
}
