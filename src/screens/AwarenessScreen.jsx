import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Sparkles, AlertCircle, ArrowRight, CheckCircle2, 
  XCircle, MapPin, Landmark, HeartHandshake, EyeOff, Scale, HelpCircle
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';
import { AI_TEACHING_BLOCKS, TRAVEL_RULES } from '../data/demoData';

export default function AwarenessScreen() {
  const { location, user } = useAppState();

  const [activeFactIndex, setActiveFactIndex] = useState(0);
  const [selectedExplainer, setSelectedExplainer] = useState(null); // Key name of the expanded teaching block card

  // Daily Rotating Law Facts
  const dailyFacts = [
    {
      title: "Calibration Calibration!",
      fact: "Under Section 183, speed ticket digital snapshots can be legally disputed in court if the RTO speed calibration certificate has expired beyond 1 year."
    },
    {
      title: "DigiLocker is Sovereign Law",
      fact: "As per Ministry circular RT-11036/64/2017/MV, police officers CANNOT refuse digital documents presented on DigiLocker or mParivahan. Physical document demands are illegal."
    },
    {
      title: "HSRP Mandatory Mandate",
      fact: "Riding a two-wheeler or driving a car without High-Security Registration Plates (HSRP) attracts an immediate ₹500 - ₹1,000 fine in metros."
    },
    {
      title: "PUC Computerized Audits",
      fact: "Traffic cameras in major cities can auto-crosscheck your licence plate against the national VAHAN register database for expired Pollution certificates."
    }
  ];

  // Rotate facts every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFactIndex(prev => (prev + 1) % dailyFacts.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Explainer Carousel items
  const explainers = [
    {
      id: "No Helmet",
      title: "Helmets & Safety",
      desc: "Section 129 rules, BIS certifications, and safety statistics.",
      icon: "🪖"
    },
    {
      id: "No Insurance",
      title: "Insurance Policies",
      desc: "Third-party liability coverage, claims voids, and spot towing rules.",
      icon: "📄"
    },
    {
      id: "Over-speeding",
      title: "Speed Radars",
      desc: "Expressway speed limits, speed guns, and second breach suspensions.",
      icon: "⚡"
    },
    {
      id: "Using Mobile While Driving",
      title: "Cabin Distraction",
      desc: "Hand-held communication penalties and dangerous driving charges.",
      icon: "📱"
    },
    {
      id: "Red Light Jump",
      title: "Signals & Crossings",
      desc: "Mandatory intersection rules, zebra crossing lanes, and CCTV tracking.",
      icon: "🚦"
    },
    {
      id: "No Seatbelt",
      title: "Seatbelt Restraints",
      desc: "Private vs commercial cab rules, rear occupant seatbelts.",
      icon: "💺"
    }
  ];

  // Myths vs Realities data
  const mythsVsRealities = [
    {
      myth: "I can drive with my physical license photocopy if original is at home.",
      reality: "Photocopies are invalid. Only original physical documents or verified mParivahan/DigiLocker QR screens are legally accepted.",
      rule: "Sec 130 MV Act"
    },
    {
      myth: "The police can seize my vehicle keys or deflate tires on routine checking.",
      reality: "Illegal. Police officers are strictly prohibited from snatching vehicle keys or physically damaging tyres on normal checking.",
      rule: "RTO Police Code"
    },
    {
      myth: "Rear seat passengers do not need to wear seatbelts in India.",
      reality: "Incorrect. Under Sec 194B, wearing seatbelts is legally mandatory for all front and rear occupants in LMV class cars.",
      rule: "Sec 194B MV Act"
    },
    {
      myth: "If my insurer doesn't send renewal reminders, my expired policy is pardoned.",
      reality: "False. The owner holds total legal liability. Driving uninsured for even 1 hour triggers a ₹2,000 fine and voided collision claims.",
      rule: "Sec 196 MV Act"
    }
  ];

  // Get active state's travel guidelines if applicable
  const activeState = location.state;
  const regionalRules = TRAVEL_RULES[activeState] || TRAVEL_RULES["Karnataka"];

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 max-w-md mx-auto space-y-4 relative select-none">
      
      {/* Daily Law Fact Header Card */}
      <div className="bg-gradient-to-r from-electric-dark via-indigo-950 to-slate-900 border border-electric/30 rounded-2xl p-4 shadow-xl relative overflow-hidden shrink-0">
        {/* Decorative corner glows */}
        <div className="absolute -right-6 -top-6 w-16 h-16 bg-electric/25 rounded-full blur-xl pointer-events-none" />
        
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-electric/20 p-1.5 rounded-lg text-electric-glow">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <span className="text-[9px] uppercase tracking-widest font-extrabold text-electric-glow">
            Daily Law Fact
          </span>
        </div>

        <div className="space-y-1.5 transition-all duration-500 animate-fade-in" key={activeFactIndex}>
          <h4 className="text-xs font-heading font-extrabold text-white uppercase tracking-wider">
            {dailyFacts[activeFactIndex].title}
          </h4>
          <p className="text-[10px] text-slate-300 leading-relaxed font-semibold">
            {dailyFacts[activeFactIndex].fact}
          </p>
        </div>

        {/* Fact indicators dots */}
        <div className="flex gap-1.5 mt-3 justify-start">
          {dailyFacts.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-300 ${
                activeFactIndex === i ? 'w-4 bg-electric' : 'w-1 bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Explainer Cards horizontally scrollable carousel */}
      <div className="space-y-2">
        <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 block px-1">
          Smart Law explainers slider
        </span>
        
        <div className="flex gap-3 overflow-x-auto py-1 scrollbar-none snap-x snap-mandatory" id="explainers-carousel">
          {explainers.map((exp) => (
            <button
              key={exp.id}
              onClick={() => setSelectedExplainer(exp.id)}
              className="bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-electric/30 p-4 rounded-2xl w-40 shrink-0 text-left snap-center hover:bg-slate-100 dark:hover:bg-white/10 active:scale-98 transition-all flex flex-col justify-between h-36 relative overflow-hidden"
            >
              <div className="text-2xl">{exp.icon}</div>
              <div className="space-y-1">
                <h5 className="text-[11px] font-heading font-extrabold text-slate-800 dark:text-white uppercase tracking-wider">
                  {exp.title}
                </h5>
                <p className="text-[9px] text-slate-500 dark:text-slate-400 leading-normal font-semibold">
                  {exp.desc}
                </p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-electric absolute bottom-4 right-4" />
            </button>
          ))}
        </div>
      </div>

      {/* State-Level RTO Differentials Card */}
      <div className="glass-panel p-4 space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/5 pb-2">
          <MapPin className="w-4 h-4 text-electric-glow" />
          <div>
            <h4 className="text-xs font-heading font-extrabold uppercase text-slate-800 dark:text-slate-200 tracking-wider">
              {activeState} RTO Ledger
            </h4>
            <span className="text-[8px] text-slate-500 block uppercase font-bold tracking-wider">
              Comparing Regional enforcement nuances
            </span>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-3 rounded-xl space-y-2">
            <span className="text-[9px] text-amber-600 dark:text-amber-400 font-extrabold uppercase tracking-wider block">
              ⚠️ out-of-state rules
            </span>
            <p className="text-[10px] text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
              {regionalRules.notice}
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 block">
              Key Local Nuances:
            </span>
            <ul className="space-y-2">
              {regionalRules.keyDifferences.map((tip, i) => (
                <li key={i} className="text-[10px] text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2">
                  <span className="text-electric font-extrabold mt-0.5">•</span>
                  <span className="font-semibold">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Myths vs Realities Section */}
      <div className="space-y-2.5">
        <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 block px-1">
          Popular Compliance Myths vs realities
        </span>

        <div className="space-y-3">
          {mythsVsRealities.map((item, i) => (
            <div key={i} className="glass-panel p-4 space-y-2.5 border-slate-200 dark:border-white/5">
              <div className="flex items-center gap-2">
                <span className="text-[8px] bg-indigo-500/10 rounded-full px-2 py-0.5 text-indigo-500 dark:text-indigo-400 font-extrabold uppercase tracking-wider">
                  {item.rule}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3.5">
                {/* Myth card block */}
                <div className="bg-red-500/5 border border-red-500/10 p-2.5 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-red-500 dark:text-red-400">
                    <XCircle className="w-3.5 h-3.5" />
                    <span className="text-[8px] uppercase tracking-wider font-extrabold">Popular Myth</span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal font-semibold">
                    "{item.myth}"
                  </p>
                </div>

                {/* Reality card block */}
                <div className="bg-emerald-500/5 border border-emerald-500/10 p-2.5 rounded-xl space-y-1 shadow-sm glow-green">
                  <div className="flex items-center gap-1.5 text-emerald-500 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="text-[8px] uppercase tracking-wider font-extrabold">Legal Reality</span>
                  </div>
                  <p className="text-[10px] text-slate-700 dark:text-slate-300 leading-normal font-semibold">
                    {item.reality}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Explainer Detail Modal Overlay */}
      {selectedExplainer && AI_TEACHING_BLOCKS[selectedExplainer] && (() => {
        const details = AI_TEACHING_BLOCKS[selectedExplainer];
        return (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="glass-modal max-w-sm w-full p-5 border border-slate-200 dark:border-white/10 animate-fade-in space-y-4 max-h-[85vh] overflow-y-auto">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5">
                <div>
                  <span className="text-[8px] uppercase tracking-widest font-extrabold text-slate-500 dark:text-slate-400">
                    Smart Law Explainer
                  </span>
                  <h4 className="text-sm font-heading font-extrabold text-slate-800 dark:text-white uppercase tracking-wider">
                    {selectedExplainer}
                  </h4>
                </div>
                <button 
                  onClick={() => setSelectedExplainer(null)}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/15 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all"
                >
                  <XCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
                </button>
              </div>

              {/* Real Case Example Study */}
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 block">
                  📖 Real Case Case-Study
                </span>
                <p className="text-[10px] text-slate-700 dark:text-slate-300 leading-relaxed font-semibold bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-3 rounded-xl">
                  {details.realExample}
                </p>
              </div>

              {/* What if you don't pay timeline */}
              <div className="space-y-2">
                <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 block">
                  ⏳ Consequences Timeline (If Unpaid)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(details.whatIfNoPay).map((dayKey) => (
                    <div key={dayKey} className="bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 p-2 rounded-xl text-center space-y-1">
                      <span className="text-[8px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block bg-indigo-500/10 py-0.5 rounded">
                        {dayKey}
                      </span>
                      <p className="text-[8px] text-slate-500 dark:text-slate-400 leading-normal">
                        {details.whatIfNoPay[dayKey]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Repeat Offense warnings */}
              {details.repeatOffense && (
                <div className="bg-red-500/5 border border-red-500/20 p-3 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-red-500 dark:text-red-400">
                    <Scale className="w-3.5 h-3.5" />
                    <span className="text-[8px] uppercase tracking-wider font-extrabold">Repeat Offenses Multiplier</span>
                  </div>
                  <p className="text-[9px] text-slate-700 dark:text-slate-300 leading-normal font-semibold">
                    {details.repeatOffense}
                  </p>
                </div>
              )}

              {/* Where Challan funds are allocated */}
              {details.whereMoneyGoes && (
                <div className="space-y-1.5">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 block">
                    🌱 Where your Challan fine funds go
                  </span>
                  <ul className="space-y-1.5 bg-emerald-500/5 border border-emerald-500/10 p-3 rounded-xl">
                    {details.whereMoneyGoes.map((item, i) => (
                      <li key={i} className="text-[9px] text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-1.5 font-semibold">
                        <span className="text-emerald-500 dark:text-emerald-400 font-extrabold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action buttons */}
              <button
                onClick={() => setSelectedExplainer(null)}
                className="w-full bg-electric text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-electric-glow transition-all"
              >
                Close Explainer
              </button>

            </div>
          </div>
        );
      })()}

    </div>
  );
}
