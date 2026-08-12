import { useState } from "react";
import { Lightbulb, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function Suggest() {
  const [type, setType] = useState<"unit" | "feature" | "bug" | "general">("unit");
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const types = [
    { value: "unit"    as const, label: "Suggest a Unit",  desc: "A unit missing from our database" },
    { value: "feature" as const, label: "Feature Request", desc: "Something you'd like us to build"  },
    { value: "bug"     as const, label: "Report a Bug",    desc: "Something isn't working"           },
    { value: "general" as const, label: "General Feedback",desc: "Anything else"                     },
  ];

  return (
    <div className="min-h-screen bg-background pt-14">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-8">
          <Lightbulb className="w-8 h-8 text-muted-foreground" />
          <div>
            <h1 className="text-2xl font-bold">Suggest &amp; Feedback</h1>
            <p className="text-sm text-muted-foreground">Help us improve ratemyunit_</p>
          </div>
        </div>

        {sent ? (
          <div className="bg-card border border-border rounded-2xl p-10 text-center">
            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
            <h2 className="font-semibold text-lg mb-2">Thank you!</h2>
            <p className="text-sm text-muted-foreground">Your submission has been received. We read every message.</p>
            <button onClick={() => { setSent(false); setTitle(""); setDetail(""); }} className="mt-6 text-sm px-4 py-2 bg-muted rounded-xl hover:bg-gray-300/60 transition-colors">Submit another</button>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="grid grid-cols-2 gap-2 mb-6">
              {types.map(t => (
                <button key={t.value} onClick={() => setType(t.value)} className={`text-left p-3 rounded-xl border transition-all ${type === t.value ? "border-foreground bg-foreground/5" : "border-border hover:bg-muted"}`}>
                  <div className="text-sm font-semibold">{t.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{t.desc}</div>
                </button>
              ))}
            </div>
            <form onSubmit={e => { e.preventDefault(); setSent(true); toast.success("Feedback received!", { description: "We read every submission — thank you." }); }} className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-1.5">{type === "unit" ? "Unit Code & Name" : "Title"}</label>
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder={type === "unit" ? "e.g. FIT3162 – Computer science project part 2" : "Brief summary..."} className="w-full bg-muted rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-1.5">Details</label>
                <textarea value={detail} onChange={e => setDetail(e.target.value)} placeholder="Tell us more..." rows={5} className="w-full bg-muted rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black/10 placeholder:text-muted-foreground" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-1.5">Email <span className="font-normal">(optional)</span></label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="w-full bg-muted rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
              </div>
              <button type="submit" disabled={!title.trim() || !detail.trim()} className="bg-foreground text-background px-6 py-2.5 rounded-xl text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black/80 transition-colors">Submit</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
