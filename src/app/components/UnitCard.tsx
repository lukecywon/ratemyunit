import { useNavigate } from "react-router";
import type { Unit } from "../types.ts";
import { ratingColor } from "../data.ts";
import { FacultyBadge, CampusPill, SemesterPill, StarDisplay } from "./Shared.tsx";

export default function UnitCard({ unit }: { unit: Unit }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/unit/${unit.code}`)}
      className="w-full text-left bg-card border border-border rounded-2xl p-4 hover:shadow-lg hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 group"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
            <FacultyBadge faculty={unit.faculty} />
            <span className="font-mono text-[11px] font-bold tracking-widest text-muted-foreground uppercase">{unit.code}</span>
            <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full">L{unit.level}</span>
          </div>
          <h3 className="font-semibold text-[13px] leading-snug group-hover:text-black transition-colors line-clamp-2 capitalize">{unit.name}</h3>
        </div>
        <div className="shrink-0 text-right">
          <div className="font-mono font-bold text-xl leading-none" style={{ color: ratingColor(unit.rating) }}>
            {unit.rating > 0 ? unit.rating.toFixed(1) : "—"}
          </div>
          {unit.rating > 0 && <StarDisplay value={unit.rating} />}
        </div>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">{unit.description}</p>
      <div className="flex items-center gap-1.5 flex-wrap">
        {unit.campuses.map(c => <CampusPill key={c} campus={c} />)}
        {unit.semesters.map(s => <SemesterPill key={s} sem={s} />)}
        <span className="ml-auto text-xs text-muted-foreground">{unit.reviewCount} reviews</span>
      </div>
    </button>
  );
}
