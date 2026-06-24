import React, { useState, useEffect } from 'react';
import { WifiOff, X, Search, Scale, AlertTriangle } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

const RULES_DATA = [
  { section: "177", particulars: "General penalty", previous: "First offence-fine up to 100; Second offence fine up to 300", newPenalty: "First offence-fine up to 500; Second offence Fine up to 1500" },
  { section: "177A", particulars: "Violation of road regulation", previous: "New Provision", newPenalty: "500" },
  { section: "178(3)(b)", particulars: "Travelling without ticket", previous: "Fine up to 200", newPenalty: "Fine up to 500" },
  { section: "179", particulars: "Disobedience of orders of authorities and refusal to give information", previous: "Fine up to 500", newPenalty: "Fine up to 2000" },
  { section: "180", particulars: "Unauthorised use of vehicles without license", previous: "Fine up to 1000", newPenalty: "Fine of 5000" },
  { section: "181", particulars: "Driving without license", previous: "Fine up to 500", newPenalty: "Fine of 5000" },
  { section: "182(1)", particulars: "Driving despite disqualification", previous: "Fine up to 500", newPenalty: "Fine of 10,000" },
  { section: "182(2)", particulars: "Acting as a conductor after disqualification", previous: "Fine up to 100 and/or imprisonment up to one month", newPenalty: "Fine up to 10,000" },
  { section: "182A(1)", particulars: "Penalty relating to construction, maintenance, sale and alteration of motor vehicles and components.", previous: "New Provision", newPenalty: "Imprisonment for up to 1 year and/or fine of 1,00,000 per vehicle" },
  { section: "182A(2)", particulars: "Defective vehicles", previous: "New Provision", newPenalty: "Imprisonment for up to 1 year and/or fine up to 100,00,00, for defective automobiles" },
  { section: "182A(3)", particulars: "Sale of critical safety component in violation of rules", previous: "New Provision", newPenalty: "Imprisonment for up to 1 year and/or fine of 1,00,000 per component" },
  { section: "182A(4)", particulars: "Alteration of retrofitting in contravention of rules", previous: "New Provision", newPenalty: "Imprisonment for up to 6 months and/or fine of 5000 per alteration" },
  { section: "182B", particulars: "Oversize vehicles", previous: "New Provision", newPenalty: "5000" },
  { section: "183(1)", particulars: "Over-speeding", previous: "Fine up to 400", newPenalty: "1000 to 2000 for LMV; 2000 to 4000 for medium passenger/goods; Subsequent: impounding DL" },
  { section: "184", particulars: "Penalty for dangerous driving", previous: "First: Imprisonment up to 6 mo / fine up to 1000; Subsequent (within 3 yrs): Imp up to 2 yrs and/or fine up to 2000", newPenalty: "First: Imprisonment 6 mo to 1 yr and/or fine 1000 to 5000; Subsequent (within 3 yrs): Imp up to 2 yrs and/or 10000" },
  { section: "185", particulars: "Drunken driving", previous: "First: fine up to 2000 and/or imp up to 6 mo; Second (within 3 yrs): fine up to 3000 and/or imp up to 2 yrs", newPenalty: "First: fine up to 10000 and/or imp up to 6 mo; Second: fine of 3000 and/or imp up to 2 yrs" },
  { section: "186", particulars: "Penalty for driving when mentally or physically unfit to drive", previous: "First: fine up to 200; Second: fine up to 500", newPenalty: "First: fine up to 1000; Second: fine up to 2000" },
  { section: "187", particulars: "Penalty for offences relating to accident (Section 132(i), 133 and 134)", previous: "First: fine up to 500 and/or imp of 3 mo; Second: fine up to 1000 and/or imp of 6 mo", newPenalty: "First: fine up to 5000 and/or imp of 6 mo; Second: fine up to 10,000 and/or imp of 1 yr" },
  { section: "189", particulars: "Punishment for racing and speeding", previous: "Fine up to 500 and/or imprisonment up to 1 month", newPenalty: "First: Fine up to 500 and/or imp up to 1 mo; Second: Fine of 10,000 and/or imp up to 1 mo" },
  { section: "190(1)", particulars: "Using vehicle in unsafe condition with defect", previous: "Fine up to 250", newPenalty: "First: fine of 1500; Second: fine of 5000" },
  { section: "190(1)", particulars: "Using vehicle in unsafe condition with defect resulting in injury or property damage", previous: "Fine of 1000 and/or imprisonment up to 3 months", newPenalty: "First: fine up to 5000 and/or imp upto 3 mo; Second: Imp upto 6 mo or fine upto 10,000" },
  { section: "190(2)", particulars: "Penalty for driving vehicle violating safety, noise/air pollution standards", previous: "First: Fine of 1000; Second: Fine of 2000", newPenalty: "First: Imp upto 3 mo and/or fine of 10,000, plus DL disqualification for 3 mo; Second: Imp upto 6 mo and/or fine upto 10,000" },
  { section: "190(3)", particulars: "Penalty for carriage of goods dangerous/hazardous to human life", previous: "First: fine of 3000 and/or imp up to 1 yr; Second: fine up to 5000 and/or imp up to 3 yrs", newPenalty: "First: Fine of 10,000 and/or imp up to 1 yr, plus DL disqualification for 3 mo; Second: Fine up to 20,000 and/or imp up to 3 yrs" },
  { section: "191", particulars: "Sale of vehicle in or alteration to condition contravening the Act", previous: "Fine of 500", newPenalty: "Omitted" },
  { section: "192", particulars: "Using vehicle without registration (Explanation Sec 56)", previous: "New provision", newPenalty: "First: Fine from 2000 to 5000; Second: Imprisonment up to 1 year or fine from 500 to 10,000" },
  { section: "192A", particulars: "Using vehicle without permit", previous: "First: Fine 2000 to 5000; Second: Imp 3 mo to 1 yr and/or fine 5000 to 10,000", newPenalty: "First: Imp upto 6 months and fine of 10,000; Second: Imp 6 months to 1 year and/or fine of 10,000" },
  { section: "192B(1)", particulars: "Offences relating to registration- failure by owner to register", previous: "New provision", newPenalty: "Fine of 5 times the annual road tax or 1/3 of the lifetime tax of the vehicle, whichever is higher" },
  { section: "192B(2)", particulars: "Offences relating to registration- failure by dealer to register new vehicle", previous: "New provision", newPenalty: "Fine of 15 times annual road tax or lifetime tax, whichever is higher" },
  { section: "192B(3)", particulars: "Misrepresentation of engine/chassis no. by owner", previous: "New provision", newPenalty: "Imprisonment 6 months to 1 year, and fine of 10 times annual road tax or 2/3 lifetime tax, whichever is higher" },
  { section: "192B(4)", particulars: "Misrepresentation of engine/chassis no. by dealer", previous: "New provision", newPenalty: "Imprisonment 6 months to 1 year, and fine of 10 times annual road tax or 2/3 lifetime tax, whichever is higher" },
  { section: "193(1)", particulars: "Punishment for agents and canvassers", previous: "First: Fine up to 1000; Second: Imp up to 6 mo and/or fine up to 2000", newPenalty: "First: fine of 1000; Second: Imp up to 6 months and/or fine of 2000" },
  { section: "193(2)", particulars: "Punishment for aggregators", previous: "New Provisions", newPenalty: "Fine from 25000 up to 1,00,000" },
  { section: "193(3)", particulars: "Contravention by aggregator of condition of license under S. 93(4)", previous: "New Provisions", newPenalty: "Fine of 5000" },
  { section: "194(1)", particulars: "Overloading", previous: "Fine of minimum 2000 and 1000 per excess tonne, and liability to pay for offloading", newPenalty: "Fine of minimum 20000 and 2000 per excess tonne, and liability to pay for offloading" },
  { section: "194(1A)", particulars: "Lateral/front/rear extension of load", previous: "New provision", newPenalty: "Fine of 20,000 and charges for offloading" },
  { section: "194(2)", particulars: "Refusal to stop and submit vehicle for weighing", previous: "Fine up to 3000", newPenalty: "Fine of 40,000" },
  { section: "194A", particulars: "Carriage of excess passengers", previous: "New provision", newPenalty: "Fine of 200 per excess passenger" },
  { section: "194B(1)", particulars: "Use of safety belts and seating of children", previous: "New provision", newPenalty: "Fine of 1000" },
  { section: "194B(2)", particulars: "Seating of children below 14 years", previous: "New provision", newPenalty: "Fine of 1000" },
  { section: "194C", particulars: "Violation of motorcycle safety measures / pillion riders", previous: "New provision", newPenalty: "Fine of 1000 and DL disqualification for 3 months" },
  { section: "194D", particulars: "Penalty for not wearing helmets", previous: "New provisions", newPenalty: "Fine of 1000 and DL disqualification for 3 months" },
  { section: "194E", particulars: "Failure to allow free passage to emergency vehicles", previous: "New provisions", newPenalty: "Fine of 10000 and/or imprisonment upto 6 months" },
  { section: "194F", particulars: "Penalty for use of phones in silent zones", previous: "New provisions", newPenalty: "First: Fine of 1000; Second: Fine of 2000" },
  { section: "195", particulars: "Imposition of minimum fines", previous: "Deleted", newPenalty: "Deleted" },
  { section: "196", particulars: "Driving uninsured vehicles", previous: "Fine of 1000 and/or punishment up to 3 months", newPenalty: "First: Fine of 2000 and/or imp up to 3 months; Second: Fine of 4000 and/or imp up to 3 months" },
  { section: "197(1)", particulars: "Taking vehicle without lawful authority", previous: "Fine of 500 and/or imp up to 3 months", newPenalty: "Fine of 5000 and/or imp up to 3 months" },
  { section: "197(2)", particulars: "Seizing motor vehicle by force", previous: "Fine of 500 and/or imp up to 3 months", newPenalty: "Fine of 5000 and/or imp up to 3 months" },
  { section: "198", particulars: "Unauthorised interference with vehicle", previous: "Fine up to 100", newPenalty: "Fine of 1000" },
  { section: "198A", particulars: "Failure to comply with standards for road design, construction and maintenance", previous: "New provision", newPenalty: "Fine up to 1,00,000" },
  { section: "199A", particulars: "Offences by juveniles", previous: "New provision", newPenalty: "Guardian owner deemed guilty. Fine of Rs. 25,000 and imprisonment up to 3 years, cancellation of registration for 12 months. Juvenile ineligible for learners DL until age 25." },
  { section: "199B", particulars: "Revision of fines", previous: "New provisions", newPenalty: "Annual increase of fines up to 10 %" },
  { section: "201", particulars: "Penalty for causing obstruction to free flow of traffic", previous: "Fine of 50 per hour", newPenalty: "Fine of 500" },
  { section: "210A", particulars: "Power of State government to increase penalties", previous: "New provisions", newPenalty: "Notify a multiplier between 1 to 10 for each fine" },
  { section: "210B", particulars: "Penalty for offence committed by an enforcing authority", previous: "New provisions", newPenalty: "Twice the penalty under the Act" }
];

export default function OfflineBanner() {
  const { isOffline, location, user } = useAppState();
  const [showRules, setShowRules] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Reset the rules visibility whenever offline mode is toggled on
  useEffect(() => {
    if (isOffline) {
      setShowRules(true);
    }
  }, [isOffline]);

  if (!isOffline || !showRules) return null;

  const filteredRules = RULES_DATA.filter(rule => 
    rule.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rule.particulars.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rule.newPenalty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 select-none">
      <div className="glass-modal w-full h-full max-w-none max-h-none p-5 border border-slate-200 dark:border-white/10 shadow-2xl animate-fade-in flex flex-col relative text-left overflow-hidden">
        
        {/* Header / Dismiss button */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/5 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2.5 rounded-xl bg-electric/10 text-electric shadow-inner">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-heading font-black text-slate-800 dark:text-white uppercase tracking-wider leading-tight">
                Motor Vehicles Act 2019
              </h4>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block mt-1">
                Variations in Penalty and New Offences
              </span>
            </div>
          </div>
          <button 
            onClick={() => setShowRules(false)}
            className="p-2 rounded-xl bg-slate-105 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-450 dark:text-slate-400 active:scale-95 transition-all border border-slate-200 dark:border-white/5"
            title="Dismiss Box"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Offline compliance notification banner */}
        <div className="my-3 flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-500 leading-relaxed font-semibold shrink-0">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <p>
            <strong>Offline Notice:</strong> You are viewing offline penalty caches. Cross-reference fine details locally with regional multiplier notifications.
          </p>
        </div>

        {/* Search filter bar */}
        <div className="relative mb-3.5 shrink-0">
          <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Search rules, sections, or penalty amounts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-[#16161a] border border-slate-200 dark:border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-850 dark:text-slate-200 font-semibold placeholder:text-slate-450 focus:border-electric focus:ring-1 focus:ring-electric focus:outline-none transition-all"
          />
        </div>

        {/* Rules table scroll viewport */}
        <div className="flex-1 overflow-y-auto border border-slate-200 dark:border-white/5 rounded-xl text-xs font-semibold scrollbar-thin">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-[#16161a] border-b border-slate-200 dark:border-white/5 text-slate-550 dark:text-slate-450 uppercase text-[10.5px] tracking-wider text-left sticky top-0 z-10 backdrop-blur-md">
                <th className="py-3.5 px-4 w-28">Section</th>
                <th className="py-3.5 px-4">Particulars</th>
                <th className="py-3.5 px-4 text-red-500 dark:text-red-400">Previous Penalty</th>
                <th className="py-3.5 px-4 text-emerald-500 dark:text-emerald-450">New Penalty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-slate-300 font-mono">
              {filteredRules.map((rule, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                  <td className="py-4 px-4">
                    <span className="bg-electric/10 dark:bg-electric/5 text-electric dark:text-electric-glow border border-electric/25 px-2 py-1 rounded font-black tracking-wider text-[11px]">
                      {rule.section}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-sans text-slate-800 dark:text-slate-200 leading-normal text-xs sm:text-sm">
                    {rule.particulars}
                  </td>
                  <td className="py-4 px-4 text-red-650 dark:text-red-400 leading-normal text-xs sm:text-sm">
                    {rule.previous}
                  </td>
                  <td className="py-4 px-4 text-emerald-600 dark:text-emerald-400 font-black leading-normal text-xs sm:text-sm animate-fade-in">
                    {rule.newPenalty}
                  </td>
                </tr>
              ))}
              {filteredRules.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-16 text-center text-slate-550 uppercase text-xs font-sans">
                    No rules found matching search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
