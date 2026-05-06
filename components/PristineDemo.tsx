'use client'
import { useEffect, useRef, useState } from "react";
const logo = "/pristine-logo.png";
import {
  LayoutDashboard,
  Megaphone,
  UserSearch,
  List,
  CreditCard,
  Lightbulb,
  Users,
  Settings,
  Search,
  Moon,
  Zap,
  Info,
  BarChart2,
  Building2,
  MapPin,
  Tag,
  Briefcase,
  TrendingUp,
  Monitor,
  Radio,
  DollarSign,
  ListFilter,
  Eye,
  MessageCircle,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  ChevronsRight,
  RotateCcw,
  Sparkles,
  Check,
} from "lucide-react";

const DESIGN_W = 1280;
const DESIGN_H = 800;

const STATES = [
  { id: 0, dur: 3200 },
  { id: 1, dur: 3600 },
  { id: 2, dur: 3800 },
  { id: 3, dur: 3200 },
  { id: 4, dur: 3000 },
  { id: 5, dur: 3200 },
  { id: 6, dur: 2400 },
  { id: 7, dur: 3400 },
];

const QUERY = "Data Leaders in AI SaaS companies in San Francisco with revenue more than $5 Million";

export function PristineDemo() {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setStep((s) => (s + 1) % STATES.length), STATES[step].dur);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    if (step !== 0) { setTyped(QUERY); return; }
    setTyped("");
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTyped(QUERY.slice(0, i));
      if (i >= QUERY.length) clearInterval(iv);
    }, 28);
    return () => clearInterval(iv);
  }, [step]);

  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const el = wrapRef.current;
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();
      setScale(Math.min(width / DESIGN_W, height / DESIGN_H));
    };
    update();
    const ro = new ResizeObserver(update);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener("resize", update);
    return () => { ro.disconnect(); window.removeEventListener("resize", update); };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 flex items-center justify-center bg-[oklch(0.97_0.015_270)] font-sans overflow-hidden">
      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl bg-white flex"
        style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})`, transformOrigin: "center center", flexShrink: 0, position: "absolute" }}
      >
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <div className="flex-1 relative bg-[oklch(0.97_0.015_270)] overflow-hidden">
            <Pane show={step === 0}><SearchState typed={typed} /></Pane>
            <Pane show={step === 1}><ResultsState expanded="persona" /></Pane>
            <Pane show={step === 2}><ResultsState expanded="firmographics" /></Pane>
            <Pane show={step >= 3 && step <= 7}><ProfileState /></Pane>
            <MessageOverlay step={step} />
          </div>
        </div>
        <ProgressDots step={step} />
      </div>
    </div>
  );
}

function Pane({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <div
      className="absolute inset-0 transition-all duration-500"
      style={{ opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(8px)", pointerEvents: show ? "auto" : "none" }}
    >
      {children}
    </div>
  );
}

function ProgressDots({ step }: { step: number }) {
  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-50">
      {STATES.map((_, i) => (
        <div key={i} className="h-1 rounded-full transition-all duration-300" style={{ width: i === step ? 24 : 8, background: i === step ? "oklch(0.52 0.22 275)" : "oklch(0.85 0.02 270)" }} />
      ))}
    </div>
  );
}

function Sidebar() {
  const items = [
    { icon: <LayoutDashboard size={14} />, label: "Dashboard" },
    { icon: <Megaphone size={14} />, label: "Campaigns" },
    { icon: <UserSearch size={14} />, label: "Lead Search", active: true },
    { icon: <List size={14} />, label: "Lists" },
    { icon: <CreditCard size={14} />, label: "Subscription Hub" },
  ];
  return (
    <aside className="w-[210px] bg-white border-r border-[oklch(0.93_0.01_270)] flex flex-col py-4 px-3 shrink-0">
      <div className="flex items-center px-2 mb-6">
        <img src={logo} alt="Pristine Data AI" className="h-8 w-auto object-contain" />
      </div>
      <nav className="flex flex-col gap-1">
        {items.map(({ icon, label, active }) => (
          <div key={label} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] ${active ? "bg-[oklch(0.94_0.04_280)] text-[oklch(0.35_0.18_275)] font-semibold" : "text-[oklch(0.35_0.03_265)]"}`}>
            <span className="opacity-70">{icon}</span>{label}
          </div>
        ))}
      </nav>
      <div className="text-[10px] font-bold tracking-wider text-[oklch(0.55_0.03_265)] mt-6 px-3 mb-2">SALES INTELLIGENCE</div>
      <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-[oklch(0.35_0.03_265)]">
        <span className="opacity-70"><Lightbulb size={14} /></span>Opportunity Playbook
      </div>
      <div className="text-[10px] font-bold tracking-wider text-[oklch(0.55_0.03_265)] mt-4 px-3 mb-2">WORKSPACES</div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-[oklch(0.35_0.03_265)]">
          <span className="opacity-70"><Users size={14} /></span>Accounts
        </div>
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-[oklch(0.35_0.03_265)]">
          <span className="opacity-70"><Settings size={14} /></span>Settings
        </div>
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <div className="h-12 border-b border-[oklch(0.93_0.01_270)] flex items-center px-5 gap-3 bg-white shrink-0">
      <Search size={14} className="text-[oklch(0.55_0.03_265)]" />
      <span className="text-[13px] text-[oklch(0.55_0.03_265)]">Search</span>
      <div className="ml-auto flex items-center gap-3">
        <Moon size={14} className="text-[oklch(0.5_0.04_265)]" />
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[oklch(0.6_0.18_280)] to-[oklch(0.5_0.2_290)] flex items-center justify-center text-white text-[10px] font-bold">JR</div>
      </div>
    </div>
  );
}

function SearchState({ typed }: { typed: string }) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-10">
      <div className="px-3 py-1 rounded-full bg-white border border-[oklch(0.92_0.02_270)] text-[12px] font-medium text-[oklch(0.4_0.05_265)] mb-4 flex items-center gap-1.5">
        <Zap size={12} /> AI-Powered ICP Discovery
      </div>
      <h1 className="text-[34px] font-bold text-[oklch(0.18_0.03_265)] mb-2">Find Your Ideal Customers</h1>
      <p className="text-[14px] text-[oklch(0.5_0.04_265)] mb-8">Describe what you're looking for in natural language. Our AI will handle the rest.</p>
      <div className="w-full max-w-[820px] bg-white rounded-2xl shadow-[0_8px_30px_rgba(80,60,180,0.08)] border border-[oklch(0.94_0.02_270)] overflow-hidden">
        <div className="px-6 py-7 min-h-[140px] text-[16px] text-[oklch(0.18_0.03_265)] leading-relaxed">
          {typed}<span className="inline-block w-0.5 h-5 bg-[oklch(0.52_0.22_275)] align-middle ml-0.5 animate-pulse" />
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-t border-[oklch(0.95_0.01_270)] bg-[oklch(0.985_0.008_270)]">
          <div className="text-[12px] text-[oklch(0.55_0.04_265)] flex items-center gap-1.5">
            <Info size={12} /> How it works
          </div>
          <button className="px-5 py-2 rounded-lg bg-[oklch(0.45_0.22_280)] text-white text-[13px] font-semibold flex items-center gap-2 shadow-md">
            Start Search <span>→</span>
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-2 justify-center max-w-[760px]">
        <div className="text-[12px] text-[oklch(0.5_0.04_265)] w-full text-center mb-1">Quick starters:</div>
        {["Companies in California with Revenue < $50 Million", "Companies that use Salesforce", "CMOs in Healthcare SaaS Companies"].map((q) => (
          <div key={q} className="px-3 py-1.5 rounded-full bg-white border border-[oklch(0.92_0.02_270)] text-[11px] text-[oklch(0.35_0.04_265)]">{q}</div>
        ))}
      </div>
    </div>
  );
}

function Chip({ children, color = "pink" }: { children: React.ReactNode; color?: "pink" | "muted" }) {
  const cls = color === "pink"
    ? "bg-gradient-to-r from-[oklch(0.7_0.18_350)] to-[oklch(0.65_0.2_340)] text-white"
    : "bg-[oklch(0.96_0.02_280)] text-[oklch(0.35_0.05_280)]";
  return <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium ${cls}`}>{children}<span className="opacity-70">×</span></span>;
}

function ResultsState({ expanded = "persona" }: { expanded?: "persona" | "firmographics" }) {
  const contacts = [
    { name: "Jeff Roberts", title: "VP Data", company: "Otter.ai", avatar: "JR", color: "from-[oklch(0.6_0.15_30)] to-[oklch(0.5_0.18_25)]" },
    { name: "Rahul Reddy", title: "Head of Data", company: "Snorkel AI", avatar: "RR", color: "from-[oklch(0.7_0.04_265)] to-[oklch(0.6_0.04_265)]" },
    { name: "Tyler Larsen", title: "Head of Data Engineering", company: "Scale AI", avatar: "TL", color: "from-[oklch(0.6_0.12_60)] to-[oklch(0.5_0.14_50)]" },
    { name: "Wenshuai Wan", title: "Senior Director, Head of Data", company: "Tempus AI", avatar: "WW", color: "from-[oklch(0.55_0.1_240)] to-[oklch(0.45_0.12_250)]" },
  ];
  const isFirmo = expanded === "firmographics";
  return (
    <div className="h-full flex flex-col p-5 gap-4 overflow-hidden">
      <div className="bg-[oklch(0.96_0.03_280)] rounded-xl px-5 py-3 flex items-center gap-4">
        <div className="text-[14px] font-bold text-[oklch(0.18_0.03_265)] whitespace-nowrap">Search results for</div>
        <div className="flex-1 text-[13px] text-[oklch(0.3_0.04_265)] truncate">{QUERY.toLowerCase()}</div>
        <div className="flex gap-2">
          <div className="px-3 py-1.5 rounded-md bg-white text-[12px] font-medium text-[oklch(0.35_0.04_265)] flex items-center gap-1.5">
            <BarChart2 size={12} /> Accounts
          </div>
          <div className="px-3 py-1.5 rounded-md bg-[oklch(0.45_0.22_280)] text-white text-[12px] font-medium flex items-center gap-1.5">
            <Users size={12} /> Contacts
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-[340px_1fr] gap-4 min-h-0">
        <div className="bg-white rounded-xl border border-[oklch(0.94_0.02_270)] p-4 overflow-y-auto flex flex-col gap-3">
          <div className={`rounded-lg ${!isFirmo ? "ring-2 ring-[oklch(0.55_0.22_275)]" : "border border-[oklch(0.94_0.02_270)]"} p-3`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[13px] font-bold text-[oklch(0.18_0.03_265)]">
                <Users size={13} /> Persona <span className="bg-[oklch(0.7_0.18_350)] text-white text-[10px] rounded-full px-2 py-0.5">6</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[oklch(0.5_0.04_265)]">
                ↻ Reset {isFirmo ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
              </div>
            </div>
            {!isFirmo && (
              <div className="mt-3">
                <div className="text-[11px] font-semibold text-[oklch(0.35_0.04_265)] mb-2 flex items-center gap-1"><List size={11} /> Job Titles</div>
                <div className="h-8 rounded-md bg-[oklch(0.97_0.015_270)] mb-2" />
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {["Data Leader", "Data Director", "VP Data", "Head of Data", "Chief Data Officer"].map((t) => <Chip key={t}>{t}</Chip>)}
                </div>
                <div className="text-[11px] font-semibold text-[oklch(0.6_0.18_25)] mb-2 flex items-center gap-1"><List size={11} /> Exclude Job Titles</div>
                <div className="h-8 rounded-md bg-[oklch(0.97_0.015_270)]" />
              </div>
            )}
          </div>

          <div className={`rounded-lg ${isFirmo ? "ring-2 ring-[oklch(0.55_0.22_275)]" : "border border-[oklch(0.94_0.02_270)]"} p-3`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[13px] font-bold text-[oklch(0.18_0.03_265)]">
                <Building2 size={13} /> Firmographics <span className="bg-[oklch(0.7_0.18_350)] text-white text-[10px] rounded-full px-2 py-0.5">4</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[oklch(0.5_0.04_265)]">
                ↻ Reset {isFirmo ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </div>
            </div>
            {isFirmo && (
              <div className="mt-3 space-y-3" style={{ animation: "slideIn 0.4s both" }}>
                <div>
                  <div className="text-[11px] font-semibold text-[oklch(0.35_0.04_265)] mb-1.5 flex items-center gap-1"><MapPin size={11} /> Locations</div>
                  <div className="h-7 rounded-md bg-[oklch(0.97_0.015_270)] mb-1.5" />
                  <Chip>San Francisco</Chip>
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[oklch(0.35_0.04_265)] mb-1.5 flex items-center gap-1"><Tag size={11} /> Company Keywords</div>
                  <div className="h-7 rounded-md bg-[oklch(0.97_0.015_270)] mb-1.5" />
                  <div className="flex flex-wrap gap-1.5"><Chip>AI</Chip><Chip>SaaS</Chip><Chip>AI SaaS</Chip></div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[oklch(0.35_0.04_265)] mb-1.5 flex items-center gap-1"><Briefcase size={11} /> Industry</div>
                  <div className="h-7 rounded-md bg-[oklch(0.97_0.015_270)]" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[oklch(0.35_0.04_265)] mb-1.5 flex items-center gap-1"><TrendingUp size={11} /> Revenue (Min)</div>
                  <div className="h-7 rounded-md bg-[oklch(0.97_0.015_270)] mb-1.5" />
                  <Chip>5,000,000</Chip>
                </div>
              </div>
            )}
          </div>

          {[
            { icon: <Monitor size={13} />, label: "Technographics" },
            { icon: <Radio size={13} />, label: "Signals" },
            { icon: <DollarSign size={13} />, label: "Funding" },
            { icon: <Briefcase size={13} />, label: "Job Search" },
            { icon: <ListFilter size={13} />, label: "Lists & Exclusions" },
          ].map(({ icon, label }) => (
            <div key={label} className="rounded-lg border border-[oklch(0.94_0.02_270)] p-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[13px] font-semibold text-[oklch(0.25_0.03_265)]">{icon}{label}</div>
              <ChevronDown size={12} className="text-[oklch(0.5_0.04_265)]" />
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-[oklch(0.94_0.02_270)] p-4 flex flex-col min-h-0">
          <div className="flex items-center gap-2 mb-3">
            <div className="text-[13px] font-bold text-[oklch(0.18_0.03_265)] flex items-center gap-1.5"><Eye size={13} /> Live Preview</div>
            <div className="text-[12px] font-semibold text-[oklch(0.55_0.22_275)]">1,076 Contacts</div>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-3 pb-3 border-b border-[oklch(0.95_0.01_270)]">
            <span className="text-[11px] text-[oklch(0.5_0.04_265)] mr-1">Person Titles:</span>
            {["Data Leader","Data Director","VP Data","Head of Data","Chief Data Officer"].map(t => <Chip key={t}>{t}</Chip>)}
            <span className="text-[11px] text-[oklch(0.5_0.04_265)] mx-1">Locations:</span><Chip>San Francisco</Chip>
            <span className="text-[11px] text-[oklch(0.5_0.04_265)] mx-1">Keywords:</span>
            <Chip>AI</Chip><Chip>SaaS</Chip><Chip>AI SaaS</Chip>
            <span className="text-[11px] text-[oklch(0.5_0.04_265)] mx-1">Revenue:</span><Chip>Min 5,000,000</Chip>
          </div>
          <div className="flex-1 overflow-hidden flex flex-col gap-2">
            {contacts.map((c, i) => (
              <div key={c.name} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[oklch(0.98_0.01_270)] border border-transparent" style={{ animation: `slideIn 0.4s ${i * 0.08}s both` }}>
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-white text-[11px] font-bold`}>{c.avatar}</div>
                <div className="grid grid-cols-4 gap-3 flex-1 text-[12px]">
                  <div><div className="text-[9px] text-[oklch(0.55_0.04_265)] uppercase">Name</div><div className="font-semibold text-[oklch(0.18_0.03_265)]">{c.name}</div></div>
                  <div><div className="text-[9px] text-[oklch(0.55_0.04_265)] uppercase">Title</div><div className="text-[oklch(0.3_0.03_265)]">{c.title}</div></div>
                  <div><div className="text-[9px] text-[oklch(0.55_0.04_265)] uppercase">Location</div><div className="text-[oklch(0.3_0.03_265)]">San Francisco, CA</div></div>
                  <div><div className="text-[9px] text-[oklch(0.55_0.04_265)] uppercase">Company</div><div className="text-[oklch(0.3_0.03_265)]">{c.company}</div></div>
                </div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[oklch(0.65_0.2_320)] to-[oklch(0.55_0.22_275)] flex items-center justify-center text-white">
                  <MessageCircle size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes slideIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}

function ProfileState() {
  return (
    <div className="h-full flex flex-col p-5 gap-3 overflow-hidden">
      <div className="text-[12px] text-[oklch(0.5_0.04_265)] flex items-center gap-1">
        <ChevronLeft size={12} /> Home › Search › Profile
      </div>
      <div className="bg-white rounded-xl border border-[oklch(0.94_0.02_270)] p-5 flex items-center gap-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[oklch(0.6_0.15_30)] to-[oklch(0.5_0.18_25)] flex items-center justify-center text-white font-bold">JA</div>
          <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
        </div>
        <div>
          <div className="text-[18px] font-bold text-[oklch(0.18_0.03_265)]">Jeff Roberts</div>
          <div className="text-[12px] text-[oklch(0.5_0.04_265)]">VP Data (AI / B2B / eComm / Social Media)</div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button className="px-5 py-2 rounded-lg bg-[oklch(0.45_0.22_280)] text-white text-[13px] font-semibold shadow-md">Message</button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[oklch(0.94_0.02_270)] p-5 flex-1 overflow-hidden">
        <div className="flex gap-6 border-b border-[oklch(0.95_0.01_270)] pb-2 mb-4">
          <div className="text-[13px] text-[oklch(0.5_0.04_265)]">Contact</div>
          <div className="text-[13px] font-semibold text-[oklch(0.45_0.22_280)] border-b-2 border-[oklch(0.45_0.22_280)] pb-2 -mb-2">Account</div>
          <div className="text-[13px] text-[oklch(0.5_0.04_265)]">Opportunity Playbook</div>
        </div>
        <div className="space-y-2.5">
          <Section title="Overview" />
          <Section title="Social Summary" open>
            <div className="text-[11px] font-bold text-[oklch(0.18_0.03_265)] mt-2">Messaging Themes</div>
            <ul className="text-[11.5px] text-[oklch(0.3_0.03_265)] list-disc pl-5 space-y-1 mt-1">
              <li>AI-powered meeting intelligence as a productivity multiplier: Otter positions transcription, automated note-taking, and real-time summarization as tools that let professionals focus on discussion.</li>
              <li>Knowledge capture and workflow integration: building searchable, persistent meeting records accessible via AI Chat.</li>
            </ul>
            <div className="text-[11px] font-bold text-[oklch(0.18_0.03_265)] mt-3">Priority Topics</div>
            <ul className="text-[11.5px] text-[oklch(0.3_0.03_265)] list-disc pl-5 space-y-1 mt-1">
              <li>Real-time transcription across Zoom, Google Meet, and Microsoft Teams with 'no bot required' integration.</li>
              <li>AI Chat and content generation from meetings across web, mobile, and Chrome extension.</li>
            </ul>
          </Section>
          <Section title="SO and Challenges" />
          <Section title="Recent News" />
        </div>
      </div>
    </div>
  );
}

function Section({ title, open, children }: { title: string; open?: boolean; children?: React.ReactNode }) {
  return (
    <div className="border-b border-[oklch(0.95_0.01_270)] pb-2">
      <div className="flex items-center justify-between py-1.5">
        <div className="text-[13px] font-bold text-[oklch(0.18_0.03_265)]">{title}</div>
        {open ? <ChevronUp size={14} className="text-[oklch(0.5_0.04_265)]" /> : <ChevronDown size={14} className="text-[oklch(0.5_0.04_265)]" />}
      </div>
      {open && children}
    </div>
  );
}

function MessageOverlay({ step }: { step: number }) {
  const show = step >= 3;
  return (
    <div
      className="absolute top-0 right-0 h-full w-[560px] bg-white shadow-2xl border-l border-[oklch(0.93_0.01_270)] transition-transform duration-500 z-40 flex flex-col"
      style={{ transform: show ? "translateX(0)" : "translateX(100%)" }}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-[oklch(0.95_0.01_270)]">
        <ChevronsRight size={16} className="text-[oklch(0.5_0.04_265)]" />
        <RotateCcw size={14} className="text-[oklch(0.5_0.04_265)]" />
      </div>
      <div className="flex-1 overflow-hidden p-6">
        {step === 3 && <ObjectiveStep />}
        {step === 4 && <GeneratedMessage />}
        {step === 5 && <TweakStep />}
        {step === 6 && <ImprovedMessage />}
        {step === 7 && <EmailSent />}
      </div>
    </div>
  );
}

function ObjectiveStep() {
  return (
    <div>
      <div className="text-[18px] font-bold text-[oklch(0.18_0.03_265)] mb-5">Choose a Messaging Objective</div>
      <label className="text-[12px] text-[oklch(0.35_0.04_265)] font-medium">Message Theme *</label>
      <div className="mt-1.5 px-4 py-3 rounded-lg border-2 border-[oklch(0.45_0.22_280)] text-[14px] text-[oklch(0.45_0.22_280)] font-semibold flex items-center justify-between">
        Sales Outreach <ChevronDown size={14} />
      </div>
      <div className="mt-2 rounded-lg shadow-lg border border-[oklch(0.93_0.02_270)] bg-white overflow-hidden text-[13px]">
        {["Sales Outreach", "Lead Nurture", "Event Outreach", "Competitor Takeout", "Strategic Objectives"].map((o, i) => (
          <div key={o} className={`px-4 py-2.5 ${i === 0 ? "bg-[oklch(0.96_0.03_280)] text-[oklch(0.45_0.22_280)] font-semibold" : "text-[oklch(0.3_0.03_265)]"}`}>{o}</div>
        ))}
      </div>
      <label className="text-[12px] text-[oklch(0.35_0.04_265)] font-medium block mt-5">Hint</label>
      <div className="mt-1.5 px-4 py-3 rounded-lg border-2 border-[oklch(0.45_0.22_280)] text-[14px] text-[oklch(0.18_0.03_265)] min-h-[80px]">
        <Typing text="Focus on Nexla's Agentic AI capabilities" />
      </div>
      <div className="flex justify-end mt-6">
        <button className="px-6 py-2.5 rounded-lg bg-[oklch(0.45_0.22_280)] text-white text-[13px] font-semibold">Proceed</button>
      </div>
    </div>
  );
}

function Typing({ text }: { text: string }) {
  const [t, setT] = useState("");
  useEffect(() => {
    setT("");
    let i = 0;
    const iv = setInterval(() => { i++; setT(text.slice(0, i)); if (i >= text.length) clearInterval(iv); }, 35);
    return () => clearInterval(iv);
  }, [text]);
  return <>{t}<span className="inline-block w-0.5 h-4 bg-[oklch(0.45_0.22_280)] align-middle ml-0.5 animate-pulse" /></>;
}

function MessageBox({ subject, body, footer }: { subject: string; body: React.ReactNode; footer: React.ReactNode }) {
  return (
    <div>
      <div className="text-[18px] font-bold text-[oklch(0.18_0.03_265)] mb-4">Message Preview</div>
      <div className="text-[12px] font-semibold text-[oklch(0.35_0.04_265)] mb-1">Subject</div>
      <div className="px-4 py-3 rounded-lg bg-[oklch(0.97_0.015_270)] text-[13px] text-[oklch(0.18_0.03_265)] mb-4">{subject}</div>
      <div className="text-[12px] font-semibold text-[oklch(0.35_0.04_265)] mb-1">Message</div>
      <div className="px-4 py-3 rounded-lg border border-[oklch(0.93_0.02_270)] text-[12.5px] text-[oklch(0.2_0.03_265)] leading-relaxed space-y-2.5 max-h-[300px] overflow-hidden">
        {body}
      </div>
      {footer}
    </div>
  );
}

function GeneratedMessage() {
  return (
    <MessageBox
      subject="Unlocking AI-Powered Meeting Intelligence at Otter.ai"
      body={<>
        <div>Hi Jeff,</div>
        <div>As the VP of Data at Otter.ai, I admire your commitment to enhancing productivity through AI-powered meeting intelligence. I wanted to reach out to discuss how <span className="text-[oklch(0.45_0.22_280)] underline">Nexla</span>'s Agentic AI capabilities can complement your initiatives by streamlining data workflows and automating processes.</div>
        <div>Would you be open to a brief call to discuss how Nexla can support your initiatives at Otter.ai?</div>
        <div>Thanks</div>
      </>}
      footer={<>
        <div className="mt-3 px-4 py-3 rounded-lg bg-[oklch(0.97_0.015_270)] text-[12px] text-[oklch(0.5_0.04_265)] flex items-center gap-2">
          <Sparkles size={12} /> Tweak and Personalize
        </div>
        <div className="flex justify-between items-center mt-5">
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-full border border-[oklch(0.45_0.22_280)] text-[oklch(0.45_0.22_280)] text-[12px] font-semibold">Regenerate</button>
            <button className="px-4 py-2 rounded-full border border-[oklch(0.45_0.22_280)] text-[oklch(0.45_0.22_280)] text-[12px] font-semibold">Copy</button>
          </div>
          <button className="px-5 py-2.5 rounded-lg bg-[oklch(0.45_0.22_280)] text-white text-[13px] font-semibold">Send Now</button>
        </div>
      </>}
    />
  );
}

function TweakStep() {
  return (
    <MessageBox
      subject="Unlocking AI-Powered Meeting Intelligence at Otter.ai"
      body={<>
        <div>Hi Jeff,</div>
        <div>As the VP of Data at Otter.ai, I admire your commitment to enhancing productivity through AI-powered meeting intelligence...</div>
        <div className="opacity-50">Would you be open to a brief call?</div>
      </>}
      footer={<>
        <div className="mt-3 px-4 py-3 rounded-lg border-2 border-[oklch(0.45_0.22_280)] bg-[oklch(0.98_0.02_280)] text-[12.5px] text-[oklch(0.18_0.03_265)] min-h-[70px] flex items-start gap-2">
          <Sparkles size={12} className="text-[oklch(0.45_0.22_280)] mt-0.5 shrink-0" />
          <Typing text="In the second paragraph can you reference a Nexla success story that would resonate with Jeff?" />
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <button className="px-5 py-2.5 rounded-lg border border-[oklch(0.85_0.02_270)] text-[oklch(0.3_0.03_265)] text-[13px] font-medium">Close</button>
          <button className="px-5 py-2.5 rounded-lg bg-[oklch(0.45_0.22_280)] text-white text-[13px] font-semibold">Apply Improvements</button>
        </div>
      </>}
    />
  );
}

function ImprovedMessage() {
  return (
    <div style={{ animation: "fadeUp 0.5s both" }}>
      <MessageBox
        subject="Enhancing Data Management at Otter.ai with Nexla"
        body={<>
          <div>Hi Jeff,</div>
          <div>I hope this message finds you well! As the VP of Data at Otter.ai, I understand that managing diverse data sources efficiently is crucial for driving insights and decision-making.</div>
          <div className="bg-[oklch(0.97_0.04_280)] -mx-2 px-2 py-1.5 rounded">Nexla offers a powerful data integration platform that simplifies management of data flows. <strong>For instance, we helped a major insurance provider reduce partner onboarding time by 3x</strong>, standardizing data ingestion across hundreds of business units, automating 60-70% of manual tasks and improving claims efficiency by 30%.</div>
          <div>Would you be open to a brief chat to discuss how <span className="text-[oklch(0.45_0.22_280)] underline">Nexla</span> can support your initiatives at Otter.ai?</div>
        </>}
        footer={<>
          <div className="mt-3 px-4 py-3 rounded-lg bg-[oklch(0.97_0.015_270)] text-[12px] text-[oklch(0.5_0.04_265)] flex items-center gap-2">
            <Sparkles size={12} /> Tweak and Personalize
          </div>
          <div className="flex justify-between items-center mt-5">
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-full border border-[oklch(0.45_0.22_280)] text-[oklch(0.45_0.22_280)] text-[12px] font-semibold">Regenerate</button>
              <button className="px-4 py-2 rounded-full border border-[oklch(0.45_0.22_280)] text-[oklch(0.45_0.22_280)] text-[12px] font-semibold">Copy</button>
            </div>
            <button className="px-5 py-2.5 rounded-lg bg-[oklch(0.45_0.22_280)] text-white text-[13px] font-semibold shadow-md">Send Now</button>
          </div>
        </>}
      />
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}

function EmailSent() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-6" style={{ animation: "fadeUp 0.5s both" }}>
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-[oklch(0.45_0.22_280)] opacity-20 blur-2xl" />
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[oklch(0.55_0.22_280)] to-[oklch(0.45_0.22_290)] flex items-center justify-center text-white shadow-xl" style={{ animation: "popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both" }}>
          <Check size={32} strokeWidth={3} />
        </div>
      </div>
      <div className="text-[22px] font-bold text-[oklch(0.18_0.03_265)] mb-2">Email Sent</div>
      <div className="text-[13px] text-[oklch(0.5_0.04_265)] max-w-[360px] mb-6">
        Your personalized message to <span className="font-semibold text-[oklch(0.18_0.03_265)]">Jeff Roberts</span> at Otter.ai is on its way.
      </div>
      <div className="w-full max-w-[380px] rounded-xl border border-[oklch(0.93_0.02_270)] bg-white p-4 text-left shadow-sm">
        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[oklch(0.95_0.01_270)]">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[oklch(0.6_0.15_30)] to-[oklch(0.5_0.18_25)] flex items-center justify-center text-white text-[11px] font-bold">JR</div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-semibold text-[oklch(0.18_0.03_265)] truncate">jeff.roberts@otter.ai</div>
            <div className="text-[10px] text-[oklch(0.55_0.04_265)]">Delivered just now</div>
          </div>
          <div className="text-[10px] font-semibold text-[oklch(0.45_0.55_150)] bg-[oklch(0.95_0.08_150)] px-2 py-0.5 rounded-full">Sent</div>
        </div>
        <div className="text-[11px] font-semibold text-[oklch(0.35_0.04_265)] mb-1">Subject</div>
        <div className="text-[12px] text-[oklch(0.18_0.03_265)] mb-3">Enhancing Data Management at Otter.ai with Nexla</div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-[oklch(0.97_0.015_270)] py-2"><div className="text-[10px] text-[oklch(0.55_0.04_265)]">Tracking</div><div className="text-[11px] font-semibold text-[oklch(0.18_0.03_265)]">On</div></div>
          <div className="rounded-lg bg-[oklch(0.97_0.015_270)] py-2"><div className="text-[10px] text-[oklch(0.55_0.04_265)]">Follow-up</div><div className="text-[11px] font-semibold text-[oklch(0.18_0.03_265)]">3 days</div></div>
          <div className="rounded-lg bg-[oklch(0.97_0.015_270)] py-2"><div className="text-[10px] text-[oklch(0.55_0.04_265)]">Sequence</div><div className="text-[11px] font-semibold text-[oklch(0.18_0.03_265)]">Active</div></div>
        </div>
      </div>
      <div className="flex gap-2 mt-6">
        <button className="px-4 py-2 rounded-lg border border-[oklch(0.85_0.02_270)] text-[oklch(0.3_0.03_265)] text-[12px] font-medium">View in Sent</button>
        <button className="px-4 py-2 rounded-lg bg-[oklch(0.45_0.22_280)] text-white text-[12px] font-semibold">Next Lead →</button>
      </div>
      <style>{`@keyframes popIn { 0% { opacity: 0; transform: scale(0.5); } 100% { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
}
