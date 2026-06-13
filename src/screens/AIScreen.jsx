
﻿import React, { useState, useRef, useEffect } from 'react';

import { 
  Send, Bot, User, ShieldAlert, Sparkles, Scale, 
  RefreshCw, Mic, Volume2, Globe, ArrowRight, Play, BookOpen 
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';
import { QUESTION_VARIATIONS } from '../data/questionVariations';
import { RULES_DATABASE } from '../data/rulesData';
import { useGlobalContext } from '../context/GlobalContext';
import violationsGlobal from '../data/violations-global.json';
import exchangeRates from '../data/exchangeRates.json';

export default function AIScreen() {
  const { user, location, setActiveScreen } = useAppState();
  const { country, region, activeCountryConfig } = useGlobalContext();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',

      text: "Hello! I am your DRIVOS AI Companion. Ask me any traffic law questions, or tap one of the suggested chips below.",

      isStructured: false,
      timestamp: new Date()
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN'); // EN, HI, Hinglish
  const [isListening, setIsListening] = useState(false);
  const [voiceCycleIndex, setVoiceCycleIndex] = useState(0);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Language suggestions maps
  const suggestedQuestions = {
    EN: [
      "What is fine for no helmet in Karnataka?",
      "Can police seize my bike?",
      "What happens if I don't pay challan in 30 days?",
      "Triple riding fine amount?",
      "Driving without licence consequences?"
    ],
    HI: [
      "हेलमेट न पहनने पर जुर्माना?",
      "बिना लाइसेंस गाड़ी चलाने पर?",
      "चालान न भरने पर क्या होगा?",
      "ट्रिपल राइडिंग का चालान कितना है?",
      "गाड़ी सीज करने के नियम?"
    ],
    Hinglish: [
      "Helmet fine kitna hai Karnataka mein?",
      "Police bike seize kar sakti hai?",
      "Challan pay nahi kiya toh kya hoga?",
      "Triple riding fine amount kya hai?",
      "Without driving licence penalty?"
    ]
  };

  // Mock Voice Queries Cycle
  const voiceQueries = [
    "Helmet nahi pehna toh fine kitna hai?",
    "Can police seize my vehicle?",
    "Insurance fine Karnataka?"
  ];

  const getCountrySpecificResponse = (query) => {
    const q = query.toLowerCase();
    
    // Check if query is about speeding/speed limits
    if (q.includes('speed') || q.includes('तेज') || q.includes('overspeeding')) {
      if (country === 'AE') {
        return {
          fine: "AED 600 to AED 3,000",
          section: "Articles 71-78, UAE Federal Traffic Law",
          consequences: "Vehicle impounded for up to 30 days. Active smart speed cameras enforce a buffer margin (e.g., Dubai has a 20 km/h grace margin, but Abu Dhabi has ZERO buffer). Accumulating extreme speeds adds up to 23 Black Points.",
          why: "UAE Speed trap systems are fully automated. Compared to India's Section 183 fine of ₹1,500 (~AED 66) without license suspension, UAE enforces vehicle seizure immediately.",
          legal_advice: "Verify active buffer limits per emirate. In Abu Dhabi, the posted limit is absolute. Never exceed speed limits, as automatic impound orders will be processed within 24 hours.",
          is_new_provision: true,
          violation_name: "Over-speeding"
        };
      } else if (country === 'GB') {
        return {
          fine: "£100 to £2,500",
          section: "Road Traffic Regulation Act 1984",
          consequences: "Minimum 3 penalty points on driving record. Court prosecution can lead to automatic license suspension.",
          why: "UK Speed Cameras (e.g. GATSO) are extremely strict. Fines scale with weekly income (Band A, B, C). Compared to India's flat ₹1,500 speed penalty, the UK system adjusts to your financial profile.",
          legal_advice: "You have 14 days to respond to a Notice of Intended Prosecution (NIP). Speed awareness courses might be offered for first-time minor infractions in lieu of points.",
          is_new_provision: false,
          violation_name: "Over-speeding"
        };
      } else if (country === 'US') {
        return {
          fine: "$150 to $1,000+",
          section: "VC Section 22350 (Basic Speed Law)",
          consequences: "1 or 2 points on driving record, causing insurance premiums to spike immediately.",
          why: "US states enforce 'Basic Speed Law' (must drive safe for conditions regardless of limit). Speeding in school/construction zones doubles fines. In India, zone penalties are rarely progressive.",
          legal_advice: "Contesting speed tickets via Trial by Written Declaration is a common strategy in California. Ensure radar calibration logs are checked.",
          is_new_provision: false,
          violation_name: "Over-speeding"
        };
      }
    }

    // Check if query is about mobile phone / distracted driving
    if (q.includes('mobile') || q.includes('phone') || q.includes('calling') || q.includes('फ़ोन')) {
      if (country === 'GB') {
        return {
          fine: "£200 (up to £1,000 in court)",
          section: "Road Traffic Act 1988, Section 41D",
          consequences: "Immediate 6 penalty points on driving licence. Under UK law, new drivers (within 2 years) will have their license REVOKED immediately on a single mobile phone offense.",
          why: "UK distracted driving laws are exceptionally harsh. S.41D covers holding the device for any purpose. Compared to India's Section 184 (₹1,500 fine and no points), a UK offense instantly disqualifies new drivers.",
          legal_advice: "Never touch your device even while stopped at red lights or in traffic. Hands-free setups must be fully mounted and not obscure the windscreen.",
          is_new_provision: true,
          violation_name: "Mobile While Driving"
        };
      } else if (country === 'AE') {
        return {
          fine: "AED 800",
          section: "Article 104, UAE Federal Traffic Law",
          consequences: "Immediate 4 Black Points added to license. Enforced by high-definition AI camera traps that scan cabin interiors.",
          why: "UAE uses multi-spectral cameras to automatically detect mobile phone usage and seatbelt compliance inside vehicles, unlike India which relies mostly on manual police spots.",
          legal_advice: "Use Bluetooth speakers or built-in Apple CarPlay/Android Auto. Touching your phone at a junction can trigger an automated AI fine ticket.",
          is_new_provision: true,
          violation_name: "Mobile While Driving"
        };
      }
    }

    // Check if query is about helmet rules
    if (q.includes('helmet') || q.includes('हेलमेट')) {
      if (country === 'AE') {
        return {
          fine: "AED 500",
          section: "Article 49, UAE Federal Traffic Law",
          consequences: "4 Black Points added to licence. Enforced strictly for motorbikes and delivery fleets.",
          why: "UAE has zero tolerance. Helmets must meet international safety standards. Fines are five times higher than India's base rate.",
          legal_advice: "Ensure both rider and pillion wear certified helmets. High visibility jackets are also mandatory for commercial riders.",
          is_new_provision: false,
          violation_name: "No Helmet"
        };
      } else if (country === 'GB') {
        return {
          fine: "£50 (up to £500 in court)",
          section: "Road Traffic Act 1988, Section 16",
          consequences: "Fixed Penalty Notice. Non-compliance leads to vehicle stop orders.",
          why: "UK law requires all motorcycle riders and sidecar passengers to wear a protective helmet securely fastened. Exceptions exist only for followers of the Sikh religion wearing turbans.",
          legal_advice: "Always check for the British Standard BS 6658 or UNECE Regulation 22.05 mark on safety helmets before riding.",
          is_new_provision: false,
          violation_name: "No Helmet"
        };
      }
    }

    // Check if query is about drunk driving / alcohol limit
    if (q.includes('drunk') || q.includes('alcohol') || q.includes('drink') || q.includes('दारू') || q.includes('sharab')) {
      if (country === 'AE') {
        return {
          fine: "Up to AED 20,000 (Court decided)",
          section: "Article 10, UAE Federal Traffic Law",
          consequences: "ZERO TOLERANCE (0.00% BAC). Immediate arrest, vehicle impounded for 60 days, license suspended for 3-12 months, and mandatory prison sentence.",
          why: "Unlike India which allows a legal threshold of 0.03% (30mg/100ml) BAC, the UAE is strictly zero-tolerance. Any trace of alcohol in the system constitutes a major offense.",
          legal_advice: "Never drive after consuming any amount of alcohol. Use taxi hailing apps like Careem or professional chauffeur services (Safe Driver).",
          is_new_provision: true,
          violation_name: "Drunk Driving"
        };
      } else if (country === 'GB') {
        return {
          fine: "Unlimited fine (standard £5,000)",
          section: "Road Traffic Act 1988, Section 5",
          consequences: "Minimum 12-month driving ban, up to 6 months imprisonment, and a criminal record that stays on your profile.",
          why: "UK limit is 0.08% BAC (80mg/100ml) in England/Wales (higher than India's 0.03%), but Scotland is lower (0.05% BAC). Punishments are extremely severe with mandatory bans.",
          legal_advice: "The legal limit is not a safe guideline, as body weight and absorption rates vary. Always delegate a designated driver.",
          is_new_provision: false,
          violation_name: "Drunk Driving"
        };
      }
    }

    return null;
  };

  const findMatchingAnswer = (query) => {
    // 1. Try country-specific explicit responses first
    const specificResponse = getCountrySpecificResponse(query);
    if (specificResponse) return specificResponse;

    const q = query.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"");
    if (!q) return null;

    let bestMatch = null;
    let highestScore = 0;

    // Split user query into words for token overlap matching
    const queryWords = q.split(/\s+/).filter(w => w.length > 2);

    QUESTION_VARIATIONS.forEach(variant => {
      let score = 0;
      const questionText = variant.question.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"");
      
      // 1. Direct or substring matching
      if (q === questionText) {
        score += 100; // Exact match!
      } else if (q.includes(questionText) || questionText.includes(q)) {
        score += 30;
      }

      // 2. Token overlap score
      const variantWords = questionText.split(/\s+/).filter(w => w.length > 2);
      let wordOverlap = 0;
      queryWords.forEach(qw => {
        if (variantWords.includes(qw)) {
          wordOverlap += 5;
        }
      });
      score += wordOverlap;

      // 3. Keyword matching
      if (variant.keywords && Array.isArray(variant.keywords)) {
        let keywordMatches = 0;
        variant.keywords.forEach(keyword => {
          const kw = keyword.toLowerCase().trim();
          if (q.includes(kw)) {
            keywordMatches += 8;
          }
        });
        score += keywordMatches;
      }

      // 4. Intent priority boost
      const intentKeywords = {
        "helmet_fine": ["helmet", "helmet fine", "हेलमेट", "helmet challan"],
        "seatbelt_fine": ["seatbelt", "seat belt", "सीटबेल्ट", "seatbelt fine"],
        "overspeeding": ["overspeed", "overspeeding", "speed limit", "तेज गाड़ी", "speeding"],
        "drunk_driving": ["drunk", "drinking", "alcohol", "wine", "दारू", "शराब", "daaru"],
        "mobile_phone": ["phone", "mobile", "calling", "फ़ोन", "calling while driving"],
        "insurance_expired": ["insurance", "insurance fine", "बीमा", "third party"],
        "triple_riding": ["triple", "triple riding", "तीन सवारी", "triple ride"],
        "red_light": ["red light", "signal", "traffic light", "लाल लाइट", "ishara"],
        "wrong_side": ["wrong side", "wrongside", "उल्टा साइड", "wrong side driving"],
        "no_license": ["license", "licence", "license fine", "बिना लाइसेंस", "dl"],
        "general_penalty": ["general penalty", "section 177", "general fine"],
        "road_regulation": ["road regulation", "177a", "lane regulation"],
        "without_ticket": ["ticket", "without ticket", "bus ticket", "stage carriage"],
        "disobedience_authority": ["disobey", "authority", "obey", "traffic police info", "179"],
        "unauthorized_drive": ["unauthorized", "lend", "keys", "minor drive", "180"],
        "driving_disqualified": ["disqualified", "suspended dl", "disqualification", "182(1)"],
        "conductor_disqualified": ["conductor", "182(2)"],
        "defective_construction": ["defective construction", "manufacture defect", "alteration vehicle", "182a(1)"],
        "defective_vehicle": ["defective vehicle", "recall", "defect car", "182a(2)"],
        "defective_safety_component": ["safety component", "non isi", "brakes defect", "182a(3)"],
        "unauthorized_alteration": ["alteration retrofitting", "modification", "silencer exhaust", "182a(4)"],
        "oversize_vehicle": ["oversize", "dimensions", "large vehicle", "182b"],
        "mentally_unfit_drive": ["mentally unfit", "physically unfit", "fatigue driving", "sleepy", "186"],
        "accident_offence": ["accident", "hit and run", "accident aid", "accident duty", "187"],
        "racing_speeding": ["racing", "drag race", "speed trial", "189"],
        "unsafe_vehicle": ["unsafe condition", "mechanically defective", "unsafe road", "190(1)"],
        "unsafe_vehicle_injury": ["unsafe vehicle injury", "defect damage", "unsafe vehicle property"],
        "dangerous_hazardous_cargo": ["hazardous cargo", "dangerous goods", "flammable", "190(3)"],
        "without_registration": ["registration", "driving without rc", "expired fitness", "192"],
        "without_permit": ["permit", "transport permit", "without permit", "192a"],
        "owner_registration_fail": ["registration delay", "owner rc", "192b(1)"],
        "dealer_registration_fail": ["dealer register", "dealer rc", "192b(2)"],
        "owner_registration_misrep": ["forged engine", "fake chassis", "misrepresentation registration", "192b(3)"],
        "canvasser_agent_fine": ["canvasser", "broker ticketing", "solicit", "193(1)"],
        "aggregator_fine": ["aggregator", "uber rapido", "ola license", "193(2)"],
        "aggregator_license_violation": ["aggregator violation", "aggregator safety", "aggregator fare", "193(3)"],
        "overloading_cargo": ["overloading", "excess weight", "excess tonne", "overload truck", "194(1)"]
      };

      if (intentKeywords[variant.intent]) {
        intentKeywords[variant.intent].forEach(ik => {
          if (q.includes(ik)) {
            score += 15;
          }
        });
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = variant;
      }
    });

    if (highestScore >= 8 && bestMatch) {
      const INTENT_TO_RULE_MAP = {
        "helmet_fine": "HEL001",
        "seatbelt_fine": "SEA001",
        "overspeeding": "OVS001",
        "drunk_driving": "DRK001",
        "mobile_phone": "DAN001",
        "insurance_expired": "INS001",
        "triple_riding": "TRP001",
        "red_light": "DAN001",
        "wrong_side": "DAN001",
        "no_license": "LIC001",
        "general_penalty": "GEN001",
        "road_regulation": "ROAD001",
        "without_ticket": "TKT001",
        "disobedience_authority": "DIS001",
        "unauthorized_drive": "UNL001",
        "driving_disqualified": "DISQ001",
        "conductor_disqualified": "COND001",
        "defective_construction": "MTC001",
        "defective_vehicle": "DEF001",
        "defective_safety_component": "SAF001",
        "unauthorized_alteration": "RET001",
        "oversize_vehicle": "OVSZ001",
        "mentally_unfit_drive": "UNFIT001",
        "accident_offence": "ACC001",
        "racing_speeding": "RACE001",
        "unsafe_vehicle": "UNS001",
        "unsafe_vehicle_injury": "UNS002",
        "dangerous_hazardous_cargo": "HAZ001",
        "without_registration": "REG001",
        "without_permit": "PRM001",
        "owner_registration_fail": "REG_FAIL001",
        "dealer_registration_fail": "REG_DEAL001",
        "owner_registration_misrep": "REG_MIS_OWN001",
        "canvasser_agent_fine": "AGT001",
        "aggregator_fine": "AGR001",
        "aggregator_license_violation": "AGR002",
        "overloading_cargo": "OVL001"
      };

      const ruleId = INTENT_TO_RULE_MAP[bestMatch.intent];
      const authoritativeRule = RULES_DATABASE.find(r => r.violation_id === ruleId);

      // Adaptive Global lookup check
      let violationName = authoritativeRule ? authoritativeRule.violation_name : bestMatch.category;
      let normalizedName = violationName;
      if (violationName === 'Using Mobile While Driving' || violationName === 'Mobile While Driving') {
        normalizedName = 'Mobile While Driving';
      }

      const globalViolation = violationsGlobal[normalizedName]?.[country];
      if (globalViolation) {
        const symbol = activeCountryConfig?.currencySymbol || '₹';
        return {
          fine: `${symbol}${globalViolation.fine}`,
          previous_penalty: "N/A",
          new_penalty: `${symbol}${globalViolation.fine}`,
          section: `${globalViolation.section}`,
          consequences: `${globalViolation.extra}. Demerits: ${globalViolation.points}`,
          why: `Legal System: ${activeCountryConfig?.legalSystem} | Drive Side: ${activeCountryConfig?.driveSide} | Alcohol Limit: ${activeCountryConfig?.alcoholLimit}`,
          legal_advice: `This penalty has a severity rating of ${globalViolation.severity}. Always comply with local regulations.`,
          is_new_provision: globalViolation.severity === 'HIGH',
          violation_name: normalizedName
        };
      }

      // Base conversion fallback
      if (country !== 'IN') {
        const rate = exchangeRates.rates[country] || 1.0;
        const symbol = activeCountryConfig?.currencySymbol || '$';
        const convertedFine = typeof authoritativeRule?.new_penalty === 'number'
          ? `${symbol}${Math.round(authoritativeRule.new_penalty * rate)}`
          : typeof bestMatch?.answer === 'string' && bestMatch.answer.includes('₹')
            ? bestMatch.answer.replace(/₹\s?\d+/, (m) => {
                const val = parseInt(m.replace(/\D/g, ''));
                return `${symbol}${Math.round(val * rate)}`;
              })
            : "Refer to local acts";

        return {
          fine: convertedFine,
          previous_penalty: "N/A",
          new_penalty: convertedFine,
          section: authoritativeRule ? `Section ${authoritativeRule.section} (${activeCountryConfig?.legalSystem})` : `Category: ${bestMatch.category}`,
          consequences: authoritativeRule ? authoritativeRule.simple_explanation : bestMatch.answer,
          why: `Converted to active currency context (${country}) using dynamic exchange adapter.`,
          legal_advice: "Verify rule applicability with local transport authorities.",
          is_new_provision: false,
          violation_name: violationName
        };
      }

      if (authoritativeRule) {
        return {
          fine: authoritativeRule.new_penalty,
          previous_penalty: authoritativeRule.previous_penalty,
          new_penalty: authoritativeRule.new_penalty,
          section: `Section ${authoritativeRule.section} (${authoritativeRule.act})`,
          consequences: authoritativeRule.simple_explanation,
          why: `Severity: ${authoritativeRule.severity.toUpperCase()} | Vehicle Class: ${authoritativeRule.vehicle_type}\n\nRepeat Penalty: ${authoritativeRule.repeat_offense}\n\nAct Reference: ${authoritativeRule.amended_by}`,
          legal_advice: authoritativeRule.legal_advice,
          is_new_provision: authoritativeRule.is_new_provision,
          violation_name: authoritativeRule.violation_name
        };
      } else {
        return {
          fine: "Refer to MV Act guidelines",
          section: `Category: ${bestMatch.category}`,
          consequences: bestMatch.answer,
          why: `This rule relates to standard "${bestMatch.category}" regulations. Ensure compliance to avoid fines.`,
          legal_advice: "Verify rule applicability with local transport authorities.",
          is_new_provision: false,
          violation_name: bestMatch.category
        };
      }
    }

    // Direct database fallback
    const directRule = RULES_DATABASE.find(r => 
      q.includes(r.violation_name.toLowerCase()) || 
      q.includes(r.section.toString().toLowerCase())
    );

    if (directRule) {
      let violationName = directRule.violation_name;
      let normalizedName = violationName;
      if (violationName === 'Using Mobile While Driving' || violationName === 'Mobile While Driving') {
        normalizedName = 'Mobile While Driving';
      }

      const globalViolation = violationsGlobal[normalizedName]?.[country];
      if (globalViolation) {
        const symbol = activeCountryConfig?.currencySymbol || '₹';
        return {
          fine: `${symbol}${globalViolation.fine}`,
          previous_penalty: "N/A",
          new_penalty: `${symbol}${globalViolation.fine}`,
          section: `${globalViolation.section}`,
          consequences: `${globalViolation.extra}. Demerits: ${globalViolation.points}`,
          why: `Legal System: ${activeCountryConfig?.legalSystem} | Drive Side: ${activeCountryConfig?.driveSide} | Alcohol Limit: ${activeCountryConfig?.alcoholLimit}`,
          legal_advice: `This penalty has a severity rating of ${globalViolation.severity}. Always comply with local regulations.`,
          is_new_provision: globalViolation.severity === 'HIGH',
          violation_name: normalizedName
        };
      }

      if (country !== 'IN') {
        const rate = exchangeRates.rates[country] || 1.0;
        const symbol = activeCountryConfig?.currencySymbol || '$';
        const convertedFine = `${symbol}${Math.round(directRule.new_penalty * rate)}`;
        return {
          fine: convertedFine,
          previous_penalty: "N/A",
          new_penalty: convertedFine,
          section: `Section ${directRule.section} (${activeCountryConfig?.legalSystem})`,
          consequences: directRule.simple_explanation,
          why: `Converted to active currency context (${country}) using standard RTO lookup.`,
          legal_advice: directRule.legal_advice,
          is_new_provision: directRule.is_new_provision,
          violation_name: directRule.violation_name
        };
      }

      return {
        fine: directRule.new_penalty,
        previous_penalty: directRule.previous_penalty,
        new_penalty: directRule.new_penalty,
        section: `Section ${directRule.section} (${directRule.act})`,
        consequences: directRule.simple_explanation,
        why: `Severity: ${directRule.severity.toUpperCase()} | Vehicle: ${directRule.vehicle_type}\n\nRepeat Offense: ${directRule.repeat_offense}\n\nApplicability: ${directRule.state} States`,
        legal_advice: directRule.legal_advice,
        is_new_provision: directRule.is_new_provision,
        violation_name: directRule.violation_name
      };
    }

    return null;
  };

  const handleSend = (textToSend, isVoice = false) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      isVoice,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const match = findMatchingAnswer(textToSend);
      
      let reply;
      if (match) {
        reply = {
          id: Date.now() + 1,
          sender: 'bot',
          isStructured: true,
          structuredData: match,
          timestamp: new Date()
        };
      } else {
        reply = {
          id: Date.now() + 1,
          sender: 'bot',
          isStructured: false,
          text: `I can answer questions about ${activeCountryConfig?.name || 'Indian'} traffic laws and challans. Try asking about speeding, helmet rules, drunk driving, or demerits.`,
          timestamp: new Date()
        };
      }

      setMessages(prev => [...prev, reply]);
      setIsTyping(false);
    }, 1500);
  };

  const handleMicTap = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      // Fallback to simulation if browser doesn't support Web Speech API
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        const query = voiceQueries[voiceCycleIndex];
        setVoiceCycleIndex(prev => (prev + 1) % voiceQueries.length);
        handleSend(query, true);
      }, 2000);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      // Select speech engine locale based on active language selected
      if (selectedLang === 'HI') {
        recognition.lang = 'hi-IN'; // Hindi Speech Engine
      } else {
        recognition.lang = 'en-IN'; // Indian English Accent (best for Hinglish as well!)
      }

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript && transcript.trim()) {
          handleSend(transcript, true);
        }
      };

      recognition.onerror = (e) => {
        console.error("Speech recognition error, falling back to simulated cycle:", e);
        setIsListening(false);
        
        // Quiet fallback to mock queries if browser permission is blocked
        const query = voiceQueries[voiceCycleIndex];
        setVoiceCycleIndex(prev => (prev + 1) % voiceQueries.length);
        handleSend(query, true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error("Failed to initialize speech recognition:", err);
      setIsListening(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-24 h-[calc(100vh-60px)] lg:h-[calc(100vh-80px)] max-w-md lg:max-w-3xl mx-auto relative select-none w-full">
      
      {/* Bot Chat Header */}
      <div className="glass-panel p-3.5 flex items-center justify-between border-electric/25 shadow-lg shadow-indigo-500/5 z-10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-indigo-500 via-blue-600 to-electric p-2 rounded-xl text-white shadow-md glow-electric">
            <Bot className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-800 dark:text-white block uppercase tracking-wider">

              DRIVOS AI

            </span>
            <span className="text-[8px] bg-electric/10 rounded-full px-2 py-0.5 mt-0.5 inline-block text-electric font-semibold uppercase">
              Powered by AI
            </span>
          </div>
        </div>
        
        {/* Global Context Tag */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-2.5 py-1 rounded-xl text-[9px] text-slate-500 dark:text-slate-300 font-bold uppercase tracking-wider">
          <span className="text-sm leading-none">{activeCountryConfig?.flag || '🇮🇳'}</span>
          <span>{region || location.state}</span>
        </div>
      </div>

      {/* Language pill selector ( EN | हिं | Hinglish ) */}
      <div className="flex justify-center my-2 shrink-0">
        <div className="flex bg-slate-200/60 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-1 rounded-xl gap-1 relative w-60">
          {[
            { id: 'EN', label: 'EN' },
            { id: 'HI', label: 'हिं' },
            { id: 'Hinglish', label: 'Hinglish' }
          ].map((lang) => {
            const active = selectedLang === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className={`flex-1 py-1 text-[9px] font-bold tracking-wider rounded-lg transition-all duration-300 uppercase ${
                  active 
                    ? 'bg-electric text-white shadow-md glow-electric' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                {lang.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat scroll feed */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-3 scroll-smooth">
        {messages.map((m) => {
          const isBot = m.sender === 'bot';
          return (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 max-w-[90%] ${
                isBot ? '' : 'ml-auto flex-row-reverse'
              }`}
            >
              {/* Avatar Icon */}
              <div className={`p-2 rounded-xl border shrink-0 ${
                isBot 
                  ? 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/5 text-electric dark:text-electric-glow' 
                  : 'bg-electric border-electric text-white'
              }`}>
                {isBot ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
              </div>

              {/* Chat bubble text */}
              <div className="space-y-1 flex-1">
                {/* Voice Input Badge */}
                {!isBot && m.isVoice && (
                  <span className="text-[7px] bg-electric/15 text-electric font-extrabold uppercase px-1.5 py-0.5 rounded-md inline-block mb-1">
                    🎙️ Voice input detected
                  </span>
                )}

                {!m.isStructured ? (
                  <div className={`p-3.5 rounded-2xl text-[11px] leading-relaxed shadow-sm font-semibold whitespace-pre-line ${
                    isBot 
                      ? 'bg-white/90 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-tl-none' 
                      : 'bg-electric-dark border border-electric/30 text-white rounded-tr-none'
                  }`}>
                    {m.text}
                  </div>
                ) : (
                  // SCREEN 1 Structured 4-Card Bubble Layout
                  <div className="space-y-2.5 max-w-sm animate-slide-up select-text">
                    <div className="bg-slate-100 dark:bg-navy-900/60 border border-slate-200 dark:border-white/10 rounded-2xl p-1.5 shadow-xl space-y-2.5">
                      
                      {/* Section Title Header */}
                      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl p-2.5 flex items-center justify-between shadow-md">
                        <div className="flex items-center gap-2">
                          <Scale className="w-4 h-4 text-amber-400" />
                          <span className="text-[9px] font-extrabold uppercase tracking-wider">
                            {m.structuredData.violation_name || "Legal Violation Fact"}
                          </span>
                        </div>
                        {m.structuredData.is_new_provision && (
                          <span className="text-[7px] bg-amber-400/20 border border-amber-400/50 text-amber-300 font-extrabold uppercase px-1.5 py-0.5 rounded-md animate-pulse">
                            New Provision
                          </span>
                        )}
                      </div>

                      {/* Card 1: Legal Section & Act */}
                      <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl p-3 flex items-start gap-3">
                        <div className="bg-indigo-500/10 p-2 rounded-xl text-indigo-500 shrink-0">
                          <Scale className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[8px] uppercase tracking-wider font-extrabold text-slate-500 dark:text-slate-400 block">Act Reference</span>
                          <span className="text-xs font-extrabold text-slate-800 dark:text-white block uppercase tracking-wide">
                            {m.structuredData.section}
                          </span>
                        </div>
                      </div>

                      {/* Card 2: Penalty Comparison Panel */}
                      {m.structuredData.previous_penalty ? (
                        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl p-3 space-y-2">
                          <span className="text-[8px] uppercase tracking-wider font-extrabold text-slate-500 dark:text-slate-400 block">
                            Penalty Comparison
                          </span>
                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            {/* Before 2019 */}
                            <div className="bg-slate-50 dark:bg-white/5 border border-slate-150 dark:border-white/5 p-2 rounded-lg space-y-1">
                              <span className="text-[7px] font-extrabold text-slate-400 uppercase block tracking-wider">Previous Penalty</span>
                              <p className="font-semibold text-slate-600 dark:text-slate-300 leading-normal">
                                {m.structuredData.previous_penalty}
                              </p>
                            </div>
                            {/* After 2019 */}
                            <div className="bg-amber-500/10 border border-amber-500/30 p-2 rounded-lg space-y-1 relative overflow-hidden">
                              <span className="text-[7px] font-extrabold text-amber-500 uppercase block tracking-wider flex items-center gap-1">
                                New Penalty <span className="text-[6px] bg-amber-500 text-white font-extrabold px-1 rounded">2019 Act</span>
                              </span>
                              <p className="font-bold text-amber-600 dark:text-amber-400 leading-normal">
                                {m.structuredData.new_penalty}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl p-3 flex items-start gap-3">
                          <div className="bg-blue-500/10 p-2 rounded-xl text-blue-500 shrink-0">
                            <Volume2 className="w-4 h-4" />
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-[8px] uppercase tracking-wider font-extrabold text-slate-500 dark:text-slate-400 block">Fine Amount</span>
                            <span className="text-xs font-mono font-bold text-slate-800 dark:text-white block tabular-nums">{m.structuredData.fine}</span>
                          </div>
                        </div>
                      )}

                      {/* Card 3: Consequences / Offense Details */}
                      <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl p-3 flex items-start gap-3">
                        <div className="bg-red-500/10 p-2 rounded-xl text-red-500 shrink-0">
                          <ShieldAlert className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[8px] uppercase tracking-wider font-extrabold text-slate-500 dark:text-slate-400 block">Offense Details</span>
                          <p className="text-[10px] text-slate-700 dark:text-slate-300 leading-normal font-semibold">
                            {m.structuredData.consequences}
                          </p>
                        </div>
                      </div>

                      {/* Card 4: Strict Legal Compliance Advice */}
                      {m.structuredData.legal_advice && (
                        <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-800/40 rounded-xl p-3 flex items-start gap-3">
                          <div className="bg-emerald-500/10 p-2 rounded-xl text-emerald-600 dark:text-emerald-400 shrink-0">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-[8px] uppercase tracking-wider font-extrabold text-emerald-600 dark:text-emerald-400 block">
                              Strict Legal Compliance Advice
                            </span>
                            <p className="text-[10px] text-slate-700 dark:text-slate-300 leading-normal font-bold">
                              {m.structuredData.legal_advice}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Card 5: Severity & Context Details */}
                      <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl p-3 flex items-start gap-3">
                        <div className="bg-slate-500/10 p-2 rounded-xl text-slate-500 shrink-0">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[8px] uppercase tracking-wider font-extrabold text-slate-500 dark:text-slate-400 block">Context & Repeat Violations</span>
                          <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-normal font-semibold whitespace-pre-line">
                            {m.structuredData.why}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-start gap-2.5 max-w-[85%]">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 shrink-0">
              <Bot className="w-3.5 h-3.5 text-electric animate-pulse" />
            </div>
            <div className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-3 rounded-2xl rounded-tl-none flex items-center gap-1.5 text-[9px] text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-electric" />
              <span>AI is framing advice bubble...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested question chips */}
      <div className="space-y-1.5 mb-2 shrink-0">
        <div className="flex items-center justify-between px-1">
          <span className="text-[8px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 block">
            Suggested Queries
          </span>
          {/* Quick Scenario Simulator link button */}
          <button 
            onClick={() => setActiveScreen('scenario')}
            className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-1 uppercase tracking-wider focus:outline-none"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Scenario Simulator</span>
          </button>
        </div>
        
        {/* Horizontal scroll chips bar */}
        <div className="flex gap-2 overflow-x-auto py-1 scrollbar-none snap-x snap-mandatory" id="suggested-chips-bar">
          {suggestedQuestions[selectedLang].map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-electric/50 text-slate-600 dark:text-slate-400 hover:text-electric text-[10px] py-2 px-3.5 rounded-xl transition-all font-semibold shrink-0 snap-center"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat bottom form panel */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="glass-panel p-2 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI traffic compliance questions..."
          className="flex-1 bg-transparent border-0 text-xs py-2 px-3 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none font-semibold"
          id="chat-text-input"
        />
        
        {/* Mic Voice simulated trigger */}
        <button
          type="button"
          onClick={handleMicTap}
          className={`p-2 rounded-xl text-white active:scale-95 transition-all flex items-center justify-center shrink-0 ${
            isListening 
              ? 'bg-red-500 glow-red animate-pulse' 
              : 'bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
          title="Simulate Voice Input"
          id="chat-voice-btn"
        >
          <Mic className="w-4.5 h-4.5" />
        </button>

        <button
          type="submit"
          disabled={!input.trim()}
          className="bg-electric p-2 rounded-xl text-white hover:bg-electric-glow disabled:opacity-50 disabled:hover:bg-electric active:scale-95 transition-all flex items-center justify-center shrink-0 shadow-md shadow-electric/25"
        >
          <Send className="w-4.5 h-4.5" />
        </button>
      </form>

      {/* SCREEN 2: VOICE LISTENING SIMULATOR WAVEFORM OVERLAY */}
      {isListening && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex flex-col items-center justify-center p-6 space-y-6">
          <div className="relative flex items-center justify-center w-36 h-36">
            {/* Animated pulsating halo rings */}
            <div className="absolute inset-0 bg-red-500/10 rounded-full animate-[ping_1.8s_infinite]" />
            <div className="absolute inset-4 bg-red-500/20 rounded-full animate-pulse" />
            <div className="relative bg-gradient-to-tr from-red-500 to-rose-600 p-8 rounded-full text-white shadow-2xl glow-red">
              <Mic className="w-16 h-16 animate-bounce" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <h3 className="font-heading font-extrabold text-base text-white uppercase tracking-wider animate-pulse">
              Listening to Voice...
            </h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Speak clearly now. We are translating your speech queries to traffic law intents in real-time.
            </p>
          </div>

          {/* Undulating SVG Waveform animation */}
          <div className="w-48 h-8 flex justify-center items-center gap-1.5 py-1">
            {[1.2, 2.5, 1.8, 3.2, 2.1, 1.5, 2.8, 1.3].map((val, i) => (
              <div 
                key={i} 
                className="w-1.5 bg-red-500 rounded-full animate-[voice-wave_0.8s_infinite_ease-in-out]" 
                style={{
                  height: '100%',
                  animationDelay: `${i * 0.1}s`,
                  transformScale: val
                }} 
              />
            ))}
          </div>
        </div>
      )}

      {/* Voice wave inline style */}
      <style>{`
        @keyframes voice-wave {
          0%, 100% { transform: scaleY(0.2); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
