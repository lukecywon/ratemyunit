import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { Search, ArrowLeft, Filter } from "lucide-react";
import { UNITS } from "../data.ts";
import GroupedResults from "../components/GroupedResults.tsx";

const ALL_FACULTIES = [...new Set(UNITS.map(u => u.faculty))];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialQuery   = searchParams.get("q") ?? "";
  const initialFaculty = searchParams.get("faculty") ?? "All";
  const initialCampus  = searchParams.get("campus") ?? "All";

  const [query,  setQuery]  = useState(initialQuery);
  const [faculty, setFaculty] = useState(initialFaculty);
  const [campus,  setCampus]  = useState(initialCampus);
  const [showFilters, setShowFilters] = useState(false);

  // Keep URL in sync
  useEffect(() => {
    const p: Record<string, string> = {};
    if (query.trim())    p.q       = query.trim();
    if (faculty !== "All") p.faculty = faculty;
    if (campus !== "All")  p.campus  = campus;
    setSearchParams(p, { replace: true });
  }, [query, faculty, campus]);

  const filtered = useMemo(() => {
    let units = UNITS;
    if (query.trim()) {
      const q = query.toLowerCase();
      units = units.filter(u =>
        u.code.toLowerCase().includes(q) || u.name.toLowerCase().includes(q) ||
        u.faculty.toLowerCase().includes(q) || u.school.toLowerCase().includes(q) ||
        u.description.toLowerCase().includes(q) || u.tags.some(t => t.includes(q))
      );
    }
    if (faculty !== "All") units = units.filter(u => u.faculty === faculty);
    if (campus  !== "All") units = units.filter(u => u.campuses.includes(campus));
    return units;
  }, [query, faculty, campus]);

  return (
    <div className="min-h-screen bg-background pt-14">
      {/* Sticky search bar */}
      <div className="sticky top-14 z-30 bg-background/95 backdrop-blur border-b border-border px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <button onClick={() => navigate("/")} className="p-1.5 rounded-xl hover:bg-muted transition-colors shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by name, code, tag..."
              className="w-full bg-muted border border-transparent rounded-xl pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
          <button
            onClick={() => setShowFilters(v => !v)}
            className={`flex items-center gap-1.5 text-sm px-3 py-2 rounded-xl border transition-colors shrink-0 ${showFilters ? "bg-foreground text-background border-foreground" : "border-border hover:bg-muted"}`}
          >
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Faculty tabs */}
        <div className="flex flex-wrap gap-2 mb-5">
          {["All", ...ALL_FACULTIES].map(f => (
            <button
              key={f}
              onClick={() => setFaculty(f)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${faculty === f ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-gray-300/60"}`}
            >
              {f === "All" ? "All Faculties" : f.replace("Faculty of ", "")}
            </button>
          ))}
        </div>

        {showFilters && (
          <div className="bg-card border border-border rounded-2xl p-5 mb-5 flex flex-wrap gap-6">
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">Campus</label>
              <div className="flex gap-2">
                {["All", "Clayton", "Malaysia"].map(c => (
                  <button key={c} onClick={() => setCampus(c)} className={`text-xs px-3 py-1.5 rounded-full transition-all ${campus === c ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-gray-300/60"}`}>
                    {c === "All" ? "All Campuses" : c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <p className="text-sm text-muted-foreground mb-6">
          {filtered.length} unit{filtered.length !== 1 ? "s" : ""}
          {faculty !== "All" && <span> in <strong className="text-foreground">{faculty.replace("Faculty of ", "")}</strong></span>}
          {query.trim() && <span> matching <strong className="text-foreground">&ldquo;{query}&rdquo;</strong></span>}
        </p>

        <GroupedResults units={filtered} />
      </div>
    </div>
  );
}
