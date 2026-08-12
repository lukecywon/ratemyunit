import { useMemo } from "react";
import { useNavigate } from "react-router";
import { Flame, BookMarked, TrendingUp } from "lucide-react";
import { UNITS, FACULTY_MAP } from "../data.ts";
import { WaveBackground, LogoMark } from "../components/Shared.tsx";
import UnitCard from "../components/UnitCard.tsx";
import SearchAutocomplete from "../components/SearchAutocomplete.tsx";

export default function Home() {
  const navigate = useNavigate();
  const trending = useMemo(() => [...UNITS].sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount).slice(0, 4), []);
  const topRated = useMemo(() => [...UNITS].sort((a, b) => b.rating - a.rating).slice(0, 3), []);

  const faculties = [
    { name: "Faculty of Information Technology", icon: "💻" },
    { name: "Faculty of Science",                icon: "🔬" },
    { name: "Faculty of Business & Economics",   icon: "📊" },
    { name: "Faculty of Engineering",            icon: "⚙️" },
    { name: "Faculty of Arts",                   icon: "🎭" },
    { name: "Faculty of Law",                    icon: "⚖️" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[520px] md:h-[580px]">
        <WaveBackground />
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 pt-14">
          <div className="flex flex-col md:flex-row items-center gap-5 mb-8 text-center md:text-left">
            <LogoMark size="lg" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ fontFamily: "'Space Mono',monospace" }}>
                ratemyunit_
              </h1>
              <p className="text-sm text-muted-foreground mt-2 max-w-sm leading-relaxed">
                Honest, student-written reviews for Monash University units. Plan smarter — read real experiences before you enrol.
              </p>
            </div>
          </div>
          <SearchAutocomplete />
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {["FIT2004", "PSY1011", "ECF1100", "FIT3170", "PHI1010", "MTH1030"].map(code => (
              <button key={code} onClick={() => navigate(`/unit/${code}`)} className="text-xs bg-white/70 backdrop-blur px-3 py-1.5 rounded-full border border-white/40 hover:bg-white/90 transition-colors font-mono">
                {code}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Stats */}
        <div className="grid grid-cols-3 bg-card border border-border rounded-2xl divide-x divide-border mb-12">
          {[{ label: "Units Listed", value: `${UNITS.length}+` }, { label: "Student Reviews", value: "3,200+" }, { label: "Faculties", value: 6 }].map(({ label, value }) => (
            <div key={label} className="text-center py-5 px-4">
              <div className="font-mono text-2xl font-bold">{value}</div>
              <div className="text-xs text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Trending */}
        <div className="flex items-center gap-2 mb-5">
          <Flame className="w-5 h-5 text-orange-500" />
          <h2 className="text-lg font-semibold">Trending Units</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {trending.map(u => <UnitCard key={u.code} unit={u} />)}
        </div>

        {/* Browse by faculty */}
        <div className="flex items-center gap-2 mb-5">
          <BookMarked className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Browse by Faculty</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {faculties.map(({ name, icon }) => {
            const meta = FACULTY_MAP[name] ?? { color: "text-gray-600" };
            const count = UNITS.filter(u => u.faculty === name).length;
            return (
              <button key={name} onClick={() => navigate(`/search?faculty=${encodeURIComponent(name)}`)} className="bg-card border border-border rounded-2xl p-4 text-left hover:shadow-md hover:border-gray-300 hover:-translate-y-0.5 transition-all">
                <div className="text-2xl mb-2">{icon}</div>
                <div className={`text-xs font-bold mb-1 leading-tight ${meta.color}`}>{name.replace("Faculty of ", "")}</div>
                <div className="text-xs text-muted-foreground font-mono">{count} units</div>
              </button>
            );
          })}
        </div>

        {/* Top rated */}
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Highest Rated</h2>
          <button onClick={() => navigate("/search")} className="ml-auto text-sm text-muted-foreground hover:text-foreground transition-colors">View all →</button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {topRated.map(u => <UnitCard key={u.code} unit={u} />)}
        </div>
      </div>

      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2"><LogoMark size="sm" /><span className="font-mono text-sm font-bold">ratemyunit_</span></div>
          <p className="text-xs text-muted-foreground text-center">An unofficial student-built resource. Not affiliated with Monash University.</p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <button className="hover:text-foreground transition-colors">Privacy</button>
            <button className="hover:text-foreground transition-colors">Terms</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
