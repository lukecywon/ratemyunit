import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, MapPin, Calendar, ExternalLink, Star } from "lucide-react";
import { toast } from "sonner";
import { UNITS, diffLabel, ratingColor } from "../data.ts";
import { useApp } from "../context/AppContext.tsx";
import { FacultyBadge, CampusPill, SemesterPill, StarDisplay, StarInput } from "../components/Shared.tsx";
import ReviewCard from "../components/ReviewCard.tsx";
import UnitCard from "../components/UnitCard.tsx";
import type { WorkloadLevel } from "../types.ts";

export default function UnitPage() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const { reviews, isLoggedIn, setAuthModal, handleUpvote, handleSubmitReview } = useApp();

  const unit = UNITS.find(u => u.code === code?.toUpperCase());

  const [showForm,     setShowForm]     = useState(false);
  const [formRating,   setFormRating]   = useState(0);
  const [formDiff,     setFormDiff]     = useState(3);
  const [formWorkload, setFormWorkload] = useState<WorkloadLevel>("Moderate");
  const [formTeaching, setFormTeaching] = useState(0);
  const [formComment,  setFormComment]  = useState("");
  const [formSem,      setFormSem]      = useState("S1");
  const [formYear,     setFormYear]     = useState(2024);

  // Reset form when unit changes
  useEffect(() => { setShowForm(false); setFormRating(0); setFormComment(""); setFormTeaching(0); }, [code]);

  if (!unit) {
    return (
      <div className="min-h-screen bg-background pt-14 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-mono font-bold mb-2">{code}</p>
          <p className="text-muted-foreground mb-6">Unit not found in our database.</p>
          <Link to="/search" className="bg-foreground text-background px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-black/80 transition-colors">
            Browse all units
          </Link>
        </div>
      </div>
    );
  }

  const unitReviews = reviews.filter(r => r.unitCode === unit.code);
  const avgRating   = unitReviews.length ? unitReviews.reduce((s, r) => s + r.overallRating, 0) / unitReviews.length : unit.rating;
  const ratingDist  = [5, 4, 3, 2, 1].map(star => ({ star, count: unitReviews.filter(r => Math.round(r.overallRating) === star).length }));
  const maxCount    = Math.max(...ratingDist.map(d => d.count), 1);
  const relatedUnits = UNITS.filter(u => u.school === unit.school && u.code !== unit.code).slice(0, 3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRating || !formComment.trim()) return;
    handleSubmitReview({ unitCode: unit.code, author: `anon_${Math.floor(Math.random() * 9000) + 1000}`, semester: formSem, year: formYear, overallRating: formRating, difficulty: formDiff, workload: formWorkload, teachingQuality: formTeaching || 3, comment: formComment.trim() });
    setShowForm(false); setFormRating(0); setFormComment(""); setFormTeaching(0);
    toast.success("Review submitted!", { description: "Thanks for helping your fellow students." });
  };

  return (
    <div className="min-h-screen bg-background pt-14">
      {/* Breadcrumb */}
      <div className="sticky top-14 z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1.5 rounded-xl hover:bg-muted transition-colors shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <FacultyBadge faculty={unit.faculty} />
              <span className="font-mono text-[11px] font-bold tracking-widest text-muted-foreground uppercase">{unit.code}</span>
            </div>
            <p className="text-sm font-semibold truncate capitalize">{unit.name}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Hero card */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <FacultyBadge faculty={unit.faculty} />
                <span className="font-mono text-xs font-bold tracking-widest text-muted-foreground uppercase">{unit.code}</span>
                <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">Level {unit.level}</span>
                <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{unit.creditPoints} cp</span>
              </div>
              <h2 className="text-2xl font-semibold mb-1 capitalize">{unit.name}</h2>
              <p className="text-sm text-muted-foreground mb-3">{unit.school}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{unit.description}</p>

              <div className="flex flex-wrap items-center gap-3 mb-4 pb-4 border-b border-border">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground mr-1">Campus:</span>
                  {unit.campuses.map(c => <CampusPill key={c} campus={c} />)}
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground mr-1">Offered:</span>
                  {unit.semesters.map(s => <SemesterPill key={s} sem={s} />)}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {unit.tags.map(t => <span key={t} className="text-xs bg-muted px-2.5 py-0.5 rounded-full text-muted-foreground">#{t}</span>)}
              </div>

              <div className="flex flex-wrap gap-5 pt-4 border-t border-border items-end">
                {[{ l: "Difficulty", v: diffLabel(unit.difficulty) }, { l: "Workload", v: unit.workload }, { l: "Reviews", v: String(unitReviews.length || unit.reviewCount) }].map(({ l, v }) => (
                  <div key={l}>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">{l}</div>
                    <div className="text-sm font-semibold">{v}</div>
                  </div>
                ))}
                <a href={`https://handbook.monash.edu/current/units/${unit.code}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors ml-auto">
                  <ExternalLink className="w-3.5 h-3.5" /> Handbook
                </a>
              </div>
            </div>

            {/* Rating panel */}
            <div className="md:w-44 shrink-0">
              <div className="text-center mb-4">
                <div className="font-mono font-bold leading-none mb-2" style={{ fontSize: 52, color: ratingColor(avgRating) }}>
                  {avgRating > 0 ? avgRating.toFixed(1) : "—"}
                </div>
                {avgRating > 0 && <StarDisplay value={avgRating} size="md" />}
                <div className="text-xs text-muted-foreground mt-1.5">out of 5.0</div>
              </div>
              <div className="space-y-1.5">
                {ratingDist.map(({ star, count }) => (
                  <div key={star} className="flex items-center gap-2 text-xs">
                    <span className="w-2.5 text-muted-foreground text-right">{star}</span>
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full transition-all duration-700" style={{ width: `${(count / maxCount) * 100}%` }} />
                    </div>
                    <span className="w-3 text-muted-foreground">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="flex items-center justify-between mb-5 gap-3">
          <h3 className="font-semibold text-lg">Reviews <span className="text-muted-foreground font-normal text-base">({unitReviews.length})</span></h3>
          <button
            onClick={() => { if (!isLoggedIn) { setAuthModal("login"); return; } setShowForm(v => !v); }}
            className={`text-sm px-4 py-2 rounded-xl transition-colors ${showForm ? "bg-muted text-foreground" : "bg-foreground text-background hover:bg-black/80"}`}
          >
            {showForm ? "Cancel" : "Write a Review"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 mb-6">
            <h4 className="font-semibold mb-5">Your Review</h4>
            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <div><label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">Overall Rating *</label><StarInput value={formRating} onChange={setFormRating} /></div>
              <div><label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">Teaching Quality</label><StarInput value={formTeaching} onChange={setFormTeaching} /></div>
              {[
                { label: "Difficulty", value: String(formDiff), onChange: (v: string) => setFormDiff(Number(v)), opts: [1, 2, 3, 4, 5].map(d => ({ v: String(d), l: diffLabel(d) })) },
                { label: "Workload", value: formWorkload, onChange: (v: string) => setFormWorkload(v as WorkloadLevel), opts: ["Light", "Moderate", "Heavy"].map(w => ({ v: w, l: w })) },
                { label: "Semester", value: formSem, onChange: (v: string) => setFormSem(v), opts: ["S1", "S2", "Summer"].map(s => ({ v: s, l: s })) },
                { label: "Year", value: String(formYear), onChange: (v: string) => setFormYear(Number(v)), opts: [2024, 2023, 2022, 2021].map(y => ({ v: String(y), l: String(y) })) },
              ].map(({ label, value, onChange, opts }) => (
                <div key={label}>
                  <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">{label}</label>
                  <select value={value} onChange={e => onChange(e.target.value)} className="bg-muted border border-transparent rounded-xl px-3 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-black/10">
                    {opts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <div className="mb-5">
              <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">Your Comment *</label>
              <textarea value={formComment} onChange={e => setFormComment(e.target.value)} placeholder="Share your honest experience — what worked, what didn't, tips for future students..." rows={4} className="w-full bg-muted border border-transparent rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black/10 placeholder:text-muted-foreground" />
            </div>
            <div className="flex justify-end">
              <button type="submit" disabled={!formRating || !formComment.trim()} className="bg-foreground text-background px-6 py-2.5 rounded-xl text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black/80 transition-colors">
                Submit Review
              </button>
            </div>
          </form>
        )}

        {unitReviews.length > 0 ? (
          <div className="space-y-4">
            {unitReviews.map(r => <ReviewCard key={r.id} review={r} onUpvote={handleUpvote} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-14 h-14 bg-muted rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <Star className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="font-semibold">No reviews yet</p>
            <p className="text-sm text-muted-foreground mt-1">Be the first to review this unit</p>
          </div>
        )}

        {relatedUnits.length > 0 && (
          <div className="mt-10">
            <h3 className="font-semibold mb-4">More from {unit.school}</h3>
            <div className="grid gap-3 md:grid-cols-3">
              {relatedUnits.map(u => <UnitCard key={u.code} unit={u} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
