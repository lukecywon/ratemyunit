import { Search, Star, Send, CheckCircle, AlertCircle } from "lucide-react";
import { LogoMark } from "../components/Shared.tsx";

export default function About() {
  const steps = [
    { icon: <Search className="w-5 h-5" />, title: "Search", desc: "Find any Monash unit by code, name, faculty, school, or tag." },
    { icon: <Star className="w-5 h-5" />, title: "Read Reviews", desc: "Honest, anonymous ratings covering experience, teaching, difficulty, and workload." },
    { icon: <Send className="w-5 h-5" />, title: "Share", desc: "Rate units you've completed and help future students plan smarter." },
  ];
  const guidelines = [
    "Be honest and constructive — focus on the unit, not individuals.",
    "No hate speech, harassment, or discriminatory content.",
    "Stay relevant — reviews should reflect your actual unit experience.",
    "Think about what you'd want to know before enrolling.",
    "One review per unit per account.",
  ];

  return (
    <div className="min-h-screen bg-background pt-14">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-8">
          <LogoMark size="md" />
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: "'Space Mono',monospace" }}>About ratemyunit_</h1>
            <p className="text-muted-foreground text-sm">Built by Monash students, for Monash students</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <h2 className="font-semibold text-lg mb-3">Our Mission</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">Enrolment decisions shouldn't be made in the dark. ratemyunit_ gives Monash students access to transparent, peer-written reviews so you can make informed decisions — choosing electives, managing workload, or knowing what to expect before semester starts.</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <h2 className="font-semibold text-lg mb-5">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {steps.map(({ icon, title, desc }, i) => (
              <div key={title} className="text-center">
                <div className="w-10 h-10 bg-muted rounded-2xl mx-auto mb-3 flex items-center justify-center">{icon}</div>
                <div className="text-xs text-muted-foreground font-mono mb-1">Step {i + 1}</div>
                <div className="font-semibold text-sm mb-1">{title}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <h2 className="font-semibold text-lg mb-4">Community Guidelines</h2>
          <ul className="space-y-2.5">
            {guidelines.map((g, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />{g}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800 mb-1">Disclaimer</p>
              <p className="text-xs text-amber-700 leading-relaxed">ratemyunit_ is an independent student project not affiliated with Monash University. Reviews reflect personal student experiences only. Always verify details on the official <a href="https://handbook.monash.edu" target="_blank" rel="noopener noreferrer" className="underline">Monash Handbook</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
