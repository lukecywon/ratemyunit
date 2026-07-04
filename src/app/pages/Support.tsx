import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const FAQS = [
  { q: "How do I submit a review?", a: "Create an account with your Monash email, search for the unit, and click 'Write a Review'. Rate overall experience, teaching, difficulty, and workload, then leave a comment." },
  { q: "Are reviews anonymous?", a: "Yes. Reviews are posted under a randomly generated ID (e.g. anon_4521). Your real name or student ID is never shown publicly." },
  { q: "What do the campus badges mean?", a: "AUS (blue) = available at Clayton campus in Melbourne. MY (red) = also available at Monash Malaysia in Sunway. Units with both badges are offered at both campuses." },
  { q: "What does Summer availability mean?", a: "Some units are offered during the Summer semester (approximately November–February). Check the official Monash Handbook for exact enrolment dates." },
  { q: "What do the workload ratings mean?", a: "Light: under 6 hrs/week outside class. Moderate: 6–10 hrs/week. Heavy: 10+ hrs/week. These are student estimates based on personal experience." },
  { q: "How is the rating calculated?", a: "The displayed rating is the mean of all submitted overall ratings for that unit. Sub-ratings (teaching, difficulty) are shown separately." },
  { q: "Why can't I find my unit?", a: "We list the most commonly enrolled units across 6 faculties. If yours is missing, use the 'Suggest a Unit' page and we'll add it within a few days." },
];

export default function Support() {
  const [open, setOpen] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background pt-14">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-8">
          <HelpCircle className="w-8 h-8 text-muted-foreground" />
          <div>
            <h1 className="text-2xl font-bold">Support</h1>
            <p className="text-sm text-muted-foreground">Get help or contact the team</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-border"><h2 className="font-semibold">Frequently Asked Questions</h2></div>
          {FAQS.map((faq, i) => (
            <div key={i} className="border-b border-border last:border-0">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted/50 transition-colors">
                <span className="text-sm font-medium pr-4">{faq.q}</span>
                {open === i ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
              </button>
              {open === i && <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">{faq.a}</div>}
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-semibold mb-1">Contact Us</h2>
          <p className="text-sm text-muted-foreground mb-5">Can't find what you're looking for?</p>
          {sent ? (
            <div className="flex items-center gap-3 py-6 justify-center text-emerald-600">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Message sent — we'll be in touch soon!</span>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); toast.success("Message sent!", { description: "We'll get back to you within 48 hours." }); }} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div><label className="text-xs text-muted-foreground uppercase tracking-wide block mb-1.5">Name</label><input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="w-full bg-muted rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" /></div>
                <div><label className="text-xs text-muted-foreground uppercase tracking-wide block mb-1.5">Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="w-full bg-muted rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" /></div>
              </div>
              <div><label className="text-xs text-muted-foreground uppercase tracking-wide block mb-1.5">Message</label><textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Describe your issue..." rows={4} className="w-full bg-muted rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black/10 placeholder:text-muted-foreground" /></div>
              <button type="submit" className="bg-foreground text-background px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-black/80 transition-colors">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
