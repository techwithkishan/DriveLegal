import React, { useState, useEffect, useRef } from 'react';
import { Info, BookOpen, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

const VisionBanner = () => (
  <div className="bg-blue-500/10 border border-blue-500/25 rounded-2xl p-3.5 flex items-start gap-2.5">
    <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
    <div>
      <p className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest">Vision Layer — Future Civic Programs</p>
      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-0.5">
        The Civic Programs below are future vision items. Awareness modules above are fully functional demo content.
      </p>
    </div>
  </div>
);

const modules = [
  {
    id: 1,
    emoji: '🪖',
    title: 'Helmet Basics',
    status: 'completed',
    duration: '5 min read',
    quiz: true,
    score: '8/10',
    desc: 'Why helmets save lives and what makes a helmet IS-certified.',
    content: `A quality helmet is your most critical safety investment. Under Indian Motor Vehicles Act, wearing a BIS/IS-certified helmet is mandatory for all two-wheeler riders and pillion passengers. Key facts:\n\n• IS 4151 certification ensures the helmet meets impact absorption standards\n• Non-certified helmets provide up to 60% less protection\n• Penalty for not wearing helmet: ₹1,000 + possible licence suspension\n• Replace helmets every 5 years or after any significant impact`,
  },
  {
    id: 2,
    emoji: '📋',
    title: 'Understanding Challans',
    status: 'completed',
    duration: '8 min read',
    quiz: true,
    score: '10/10',
    desc: 'How challans work, payment process, contesting a challan legally.',
    content: `A challan is an official notice of traffic violation issued under Section 166 of the Motor Vehicles Act, 1988.\n\n Payment Methods:\n• Online via Parivahan portal (parivahan.gov.in)\n• State traffic police portals\n• Physical payment at designated counters\n\nContesting a Challan:\n• File an application with the Traffic Court within 30 days\n• Provide evidence (dash-cam footage, witnesses)\n• Attend hearing on scheduled date\n\nConsequences of Non-Payment:\n• Court summons after grace period\n• Possible licence suspension\n• Vehicle detention at checkpoints`,
  },
  {
    id: 3,
    emoji: '🛣️',
    title: 'Highway Safety',
    status: 'in-progress',
    progress: 60,
    duration: '10 min read',
    quiz: true,
    desc: 'Speed limits, lane discipline, overtaking rules, night driving.',
    content: `National Highway speed limits (Motor Vehicles Act 2019):\n\n• Cars/SUVs: 100 km/h (NH), 60 km/h (urban)\n• Two-wheelers: 80 km/h (NH)\n• Heavy vehicles: 60 km/h (NH)\n\nLane Discipline:\n• Keep left unless overtaking\n• No U-turns on divided highways\n• No stopping on highway except designated spots\n\nNight Driving Tips:\n• Dim headlights when approaching oncoming traffic\n• Maintain extra following distance (road markings harder to see)\n• Never drive fatigued — stop every 2 hours for rest`,
  },
  {
    id: 4,
    emoji: '🌐',
    title: 'Driving in New Cities',
    status: 'locked',
    duration: '6 min read',
    quiz: true,
    desc: 'Travel mode rules, inter-state driving, tourist driving tips.',
    lockMsg: 'Complete Module 3 to unlock',
    content: '',
  },
];

const civicPrograms = [
  { emoji: '🏫', title: 'School Awareness Program', desc: 'Age-appropriate road safety modules for school students. Covers: pedestrian safety, cycle safety, why traffic rules matter.', status: 'Architecture planned.' },
  { emoji: '👮', title: 'Traffic Police Training Aid', desc: 'Officers use DRIVELEGAL\'s database for citizen awareness drives and public education booths.', status: 'Proposal stage.' },
  { emoji: '🚗', title: 'New Driver Onboarding', desc: 'Learner licence holders complete DRIVELEGAL awareness modules as part of driving school curriculum.', status: 'Partnership model designed.' },
  { emoji: '📻', title: 'Public Awareness Campaigns', desc: 'DRIVELEGAL data feeds into state-level road safety reports used for campaign planning.', status: 'Data model ready (Phase 6).' },
];

const impactNumbers = [
  { value: 12400, label: 'Awareness modules completed', suffix: '+' },
  { value: 3, label: 'Civic partnerships planned', suffix: '' },
  { value: 87, label: 'Avg awareness quiz score', suffix: '%' },
  { value: 5, label: 'Cities targeted for rollout', suffix: '' },
];

function CountUp({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          setCount(Math.floor(current));
          if (current >= target) clearInterval(timer);
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function ModuleCard({ mod, expanded, onToggle }) {
  const statusMap = {
    completed: { label: '✅ COMPLETED', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    'in-progress': { label: '📖 IN PROGRESS', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
    locked: { label: '🔒 LOCKED', color: 'text-slate-400 bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10' },
  };
  const s = statusMap[mod.status];

  return (
    <div className={`glass-panel overflow-hidden transition-all duration-300 ${mod.status === 'locked' ? 'opacity-70' : ''}`}>
      <button
        onClick={() => mod.status !== 'locked' && onToggle(mod.id)}
        className="w-full flex items-center gap-3 p-4 text-left"
        disabled={mod.status === 'locked'}
      >
        <span className="text-xl shrink-0">{mod.emoji}</span>
        <div className="flex-1 min-w-0 space-y-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">{mod.title}</p>
            <span className={`text-[7.5px] font-extrabold uppercase tracking-widest border px-2 py-0.5 rounded-full ${s.color}`}>{s.label}</span>
          </div>
          <p className="text-[9px] text-slate-500 font-semibold">{mod.duration}{mod.quiz ? ' | Quiz included' : ''}</p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 italic font-medium leading-snug">{mod.desc}</p>
          {mod.status === 'completed' && mod.score && (
            <p className="text-[9px] text-emerald-400 font-extrabold">Score: {mod.score}</p>
          )}
          {mod.status === 'in-progress' && mod.progress && (
            <div className="space-y-0.5 mt-1">
              <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-1">
                <div className="h-1 rounded-full bg-blue-400 transition-all duration-700" style={{ width: `${mod.progress}%` }} />
              </div>
              <p className="text-[8px] text-slate-400 font-semibold">Progress: {mod.progress}%</p>
            </div>
          )}
          {mod.status === 'locked' && (
            <p className="text-[9px] text-slate-400 font-semibold italic">{mod.lockMsg}</p>
          )}
        </div>
        {mod.status !== 'locked' && (
          expanded ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
        )}
      </button>
      {expanded && mod.status !== 'locked' && (
        <div className="px-4 pb-4 space-y-3 animate-fade-in">
          <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl p-3.5">
            <p className="text-[10px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed whitespace-pre-line">{mod.content}</p>
          </div>
          <button className="w-full py-2.5 rounded-xl bg-electric/10 border border-electric/25 text-electric font-extrabold text-[10px] uppercase tracking-wider hover:bg-electric/15 transition-all active:scale-95 flex items-center justify-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            {mod.status === 'completed' ? 'Review Module' : 'Continue Module'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function CivicAwarenessScreen() {
  const [expanded, setExpanded] = useState(null);
  const toggleModule = (id) => setExpanded(prev => prev === id ? null : id);

  return (
    <div className="flex-1 flex flex-col p-4 pb-28 space-y-5 max-w-2xl mx-auto w-full animate-fade-in">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-electric" />
          <h1 className="font-heading font-black text-xl text-slate-900 dark:text-white uppercase tracking-wider">Road Safety Ecosystem</h1>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Education, awareness, and community compliance</p>
      </div>

      {/* Awareness Modules */}
      <div className="space-y-3">
        <h2 className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">Awareness Modules</h2>
        {modules.map(mod => (
          <ModuleCard
            key={mod.id}
            mod={mod}
            expanded={expanded === mod.id}
            onToggle={toggleModule}
          />
        ))}
      </div>

      {/* Impact Numbers */}
      <div className="glass-panel p-5 space-y-4">
        <h2 className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">Platform Impact (Demo)</h2>
        <div className="grid grid-cols-2 gap-3">
          {impactNumbers.map((item, i) => (
            <div key={i} className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl p-3 text-center space-y-0.5">
              <p className="font-heading font-black text-2xl text-slate-900 dark:text-white">
                <CountUp target={item.value} suffix={item.suffix} />
              </p>
              <p className="text-[8px] text-slate-500 font-bold uppercase tracking-wider leading-tight">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Vision Section */}
      <VisionBanner />

      {/* Future Civic Programs */}
      <div className="space-y-3">
        <h2 className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">Future Civic Programs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {civicPrograms.map((prog, i) => (
            <div key={i} className="glass-panel p-4 space-y-2 border border-dashed border-slate-300 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xl">{prog.emoji}</span>
                <p className="text-[10px] font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">{prog.title}</p>
              </div>
              <p className="text-[9px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{prog.desc}</p>
              <p className="text-[8px] text-electric font-extrabold uppercase tracking-wider">Status: {prog.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
