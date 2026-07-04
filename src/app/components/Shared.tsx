import { useState } from "react";
import { Star, BookOpen, MapPin } from "lucide-react";
import { FACULTY_MAP } from "../data.ts";

export function StarDisplay({ value, size = "sm" }: { value: number; size?: "sm" | "md" }) {
  const cls = size === "md" ? "w-4 h-4" : "w-3.5 h-3.5";
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${cls} ${i < Math.round(value) ? "text-amber-400 fill-amber-400" : "text-gray-300 fill-gray-300"}`} />
      ))}
    </div>
  );
}

export function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <button key={i} type="button" onMouseEnter={() => setHover(i + 1)} onMouseLeave={() => setHover(0)} onClick={() => onChange(i + 1)} className="transition-transform hover:scale-110">
          <Star className={`w-6 h-6 transition-colors ${i < (hover || value) ? "text-amber-400 fill-amber-400" : "text-gray-300 fill-gray-300"}`} />
        </button>
      ))}
    </div>
  );
}

export function LogoMark({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const d = { sm: "w-9 h-9", md: "w-16 h-16", lg: "w-20 h-20" }[size];
  const ic = { sm: "w-4 h-4", md: "w-7 h-7", lg: "w-9 h-9" }[size];
  return (
    <div className={`${d} bg-[#0a0a0a] rounded-2xl flex items-center justify-center relative shadow-md shrink-0`}>
      <BookOpen className={`${ic} text-white`} strokeWidth={1.5} />
      <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-white rounded-full" />
      <span className="absolute top-3 right-3 w-1 h-1 bg-white/50 rounded-full" />
    </div>
  );
}

export function FacultyBadge({ faculty }: { faculty: string }) {
  const m = FACULTY_MAP[faculty] ?? { color: "text-gray-600", bg: "bg-gray-100", short: "UNI" };
  return <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${m.color} ${m.bg}`}>{m.short}</span>;
}

export function CampusPill({ campus }: { campus: string }) {
  const isMY = campus === "Malaysia";
  return (
    <span className={`inline-flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${isMY ? "bg-rose-50 text-rose-700" : "bg-sky-50 text-sky-700"}`}>
      <MapPin className="w-2.5 h-2.5" />{isMY ? "MY" : "AUS"}
    </span>
  );
}

export function SemesterPill({ sem }: { sem: string }) {
  const isSummer = sem.toLowerCase().includes("summer");
  return (
    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${isSummer ? "bg-orange-50 text-orange-700" : "bg-muted text-muted-foreground"}`}>
      {sem}
    </span>
  );
}

export function WaveBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#dedede]">
      <svg viewBox="0 0 1440 580" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
        <path d="M-60,350 C140,285 350,400 620,328 C890,256 1100,380 1380,310 C1440,293 1500,320 1500,310 L1500,580 L-60,580 Z" fill="#b4b4b4" />
        <path d="M-60,400 C180,350 400,445 670,378 C940,311 1130,420 1390,358 C1440,342 1490,374 1500,368 L1500,580 L-60,580 Z" fill="#787878" />
        <path d="M-60,448 C200,420 440,476 700,442 C960,408 1160,464 1390,428 C1440,418 1490,438 1500,434 L1500,580 L-60,580 Z" fill="#323232" />
        <path d="M-60,498 C220,480 460,516 720,492 C980,468 1170,508 1390,482 C1440,474 1490,494 1500,490 L1500,580 L-60,580 Z" fill="#111111" />
      </svg>
    </div>
  );
}
