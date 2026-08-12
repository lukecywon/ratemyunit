import { ThumbsUp, User } from "lucide-react";
import type { Review } from "../types.ts";
import { diffLabel, ratingColor } from "../data.ts";
import { StarDisplay } from "./Shared.tsx";

export default function ReviewCard({ review, onUpvote }: { review: Review; onUpvote: (id: number) => void }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <span className="font-mono text-sm font-medium">{review.author}</span>
            <div className="text-xs text-muted-foreground">{review.semester} {review.year}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <StarDisplay value={review.overallRating} />
          <span className="font-mono text-sm font-bold" style={{ color: ratingColor(review.overallRating) }}>
            {review.overallRating}.0
          </span>
        </div>
      </div>
      <p className="text-sm leading-relaxed mb-4">{review.comment}</p>
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-3 text-xs text-muted-foreground flex-wrap">
          <span>Difficulty: <strong className="text-foreground">{diffLabel(review.difficulty)}</strong></span>
          <span>Workload: <strong className="text-foreground">{review.workload}</strong></span>
          <span>Teaching: <strong className="text-foreground">{review.teachingQuality}/5</strong></span>
        </div>
        <button
          onClick={() => onUpvote(review.id)}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all shrink-0 ${review.hasUpvoted ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:border-gray-400 hover:text-foreground"}`}
        >
          <ThumbsUp className="w-3 h-3" />{review.upvotes}
        </button>
      </div>
    </div>
  );
}
