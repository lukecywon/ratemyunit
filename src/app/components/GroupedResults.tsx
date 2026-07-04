import { useMemo } from "react";
import { Search } from "lucide-react";
import type { Unit } from "../types.ts";
import { FACULTY_MAP } from "../data.ts";
import UnitCard from "./UnitCard.tsx";
import { FacultyBadge } from "./Shared.tsx";

export default function GroupedResults({ units }: { units: Unit[] }) {
  const grouped = useMemo(() => {
    const map = new Map<string, { faculty: string; levels: Map<number, Unit[]> }>();
    units.forEach(u => {
      if (!map.has(u.school)) map.set(u.school, { faculty: u.faculty, levels: new Map() });
      const s = map.get(u.school)!;
      if (!s.levels.has(u.level)) s.levels.set(u.level, []);
      s.levels.get(u.level)!.push(u);
    });
    return map;
  }, [units]);

  if (grouped.size === 0) {
    return (
      <div className="text-center py-24">
        <div className="w-14 h-14 bg-muted rounded-2xl mx-auto mb-4 flex items-center justify-center">
          <Search className="w-6 h-6 text-muted-foreground" />
        </div>
        <p className="font-semibold">No units found</p>
        <p className="text-sm text-muted-foreground mt-1">Try clearing filters or a different search term</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {[...grouped.entries()].map(([school, { faculty, levels }]) => (
        <div key={school}>
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
            <FacultyBadge faculty={faculty} />
            <div>
              <h3 className="font-semibold text-base">{school}</h3>
              <p className="text-xs text-muted-foreground">{faculty}</p>
            </div>
            <span className="ml-auto text-xs text-muted-foreground font-mono">
              {[...levels.values()].reduce((s, a) => s + a.length, 0)} units
            </span>
          </div>

          {[...levels.entries()].sort(([a], [b]) => a - b).map(([level, levelUnits]) => (
            <div key={level} className="mb-6 last:mb-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Level {level}</span>
                <span className="text-xs text-muted-foreground">· {levelUnits.length} unit{levelUnits.length !== 1 ? "s" : ""}</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {levelUnits.map(u => <UnitCard key={u.code} unit={u} />)}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
