// DriVos High-Fidelity Demo Data & Traffic Compliance Matrix (Phase 2)

export const DEMO_USER = {
  name: "Arjun Mehta",
  phone: "+91 98765 43210",
  primaryVehicle: "KA01AB1234",
  licenseNumber: "KA-2019-0012345",
  licenseExpiry: "12 Aug 2029",
  licenseClass: "LMV + MCWG",
  registeredState: "Karnataka",
  vehicles: [
    { plate: "KA01AB1234", type: "Bike", state: "Karnataka" },
    { plate: "KA03CD5678", type: "Car", state: "Karnataka" }
  ]
};

export const MOCK_CHALLAN_STATS = {
  total: 6,
  pending: 2,
  paid: 4,
  totalFines: 5500,
  paidFines: 3000,
  pendingFines: 2500
};

export const MOCK_SAFETY_SCORE = {
  score: 67,
  label: "Moderate Risk",
  deductions: [
    { id: "d1", name: "Repeat Violations", value: -12, desc: "Over-speeding × 2" },
    { id: "d2", name: "Unpaid Challans", value: -8, desc: "2 pending challans" },
    { id: "d3", name: "Serious Offenses", value: -13, desc: "Red Light Jump" },
    { id: "d4", name: "Clean Months (last 3)", value: 0, desc: "No recent clean streaks" }
  ],
  tips: [
    { id: "t1", text: "Pay your 2 pending challans to gain +8 points" },
    { id: "t2", text: "No violations in next 30 days → +10 points" },
    { id: "t3", text: "Complete 1 road safety module → +5 points" }
  ],
  history: [
    { month: "Dec", score: 55 },
    { month: "Jan", score: 58 },
    { month: "Feb", score: 65 },
    { month: "Mar", score: 70 },
    { month: "Apr", score: 65 },
    { month: "May", score: 67 }
  ]
};

export const HISTORICAL_CHALLANS = [
  {
    id: "h1",
    violation: "No Helmet",
    date: "12 May 2025",
    amount: 1000,
    location: "Bengaluru, MG Road",
    status: "Pending",
    section: "Sec 129 MV Act",
    officerId: "TRAFFIC_OFF_894",
    deadline: "12 July 2025"
  },
  {
    id: "h2",
    violation: "Over-speeding",
    date: "28 April 2025",
    amount: 1500,
    location: "Mysuru Highway",
    status: "Pending",
    section: "Sec 183 MV Act",
    officerId: "HIGHWAY_PATROL_104",
    deadline: "28 June 2025"
  },
  {
    id: "h3",
    violation: "Wrong Parking",
    date: "10 March 2025",
    amount: 500,
    location: "Bengaluru, Koramangala",
    status: "Paid",
    section: "Sec 122/177 MV Act",
    officerId: "KOR_TRAFFIC_451",
    deadline: "Paid on 12 March 2025"
  },
  {
    id: "h4",
    violation: "No Seatbelt",
    date: "22 Feb 2025",
    amount: 500,
    location: "Bengaluru, Whitefield",
    status: "Paid",
    section: "Sec 194B MV Act",
    officerId: "WFD_TRAFFIC_309",
    deadline: "Paid on 24 Feb 2025"
  },
  {
    id: "h5",
    violation: "Red Light Jump",
    date: "05 Jan 2025",
    amount: 1000,
    location: "Bengaluru, Silk Board",
    status: "Paid",
    section: "Sec 119 MV Act",
    officerId: "CAM_AUTO_SB05",
    deadline: "Paid on 06 Jan 2025"
  },
  {
    id: "h6",
    violation: "Over-speeding",
    date: "18 Dec 2024",
    amount: 1000,
    location: "Bengaluru, Outer Ring Rd",
    status: "Paid",
    section: "Sec 183 MV Act",
    officerId: "CAM_AUTO_ORR12",
    deadline: "Paid on 20 Dec 2024"
  }
];

export const AI_DRIVING_INSIGHTS = {
  pattern: "You received 2 over-speeding challans in the last 3 months. Speed violations are your most frequent offense. Most occur on highways between 8–10 PM.",
  heatmap: [
    { violation: "Over-speeding", count: 2, percentage: 50 },
    { violation: "No Helmet", count: 1, percentage: 25 },
    { violation: "Red Light", count: 1, percentage: 25 },
    { violation: "Wrong Parking", count: 1, percentage: 25 }
  ],
  trend: "Compared to last quarter, your violation rate dropped by 1 incident. Keep improving.",
  rotatingTips: [
    "Over-speeding fines double on highways after 10 PM in Karnataka. Stay under 80 km/h.",
    "Riding a two-wheeler without high-security plates (HSRP) carries a fine of ₹500 in Bengaluru.",
    "Did you know? Under Sec 183, a speeding ticket can be disputed if the camera calibration is expired.",
    "Always check your tyre tread before high-speed expressway travel. RTO officers can issue fines for bald tyres."
  ]
};

export const FINE_DATABASE = {
  "No Helmet": {
    amount: 1000,
    section: "Sec 129 MV Act",
    severity: "LOW",
    category: "Two-Wheeler",
    description: "Riding without protective headgear conforming to BIS standards."
  },
  "No Insurance": {
    amount: 2000,
    section: "Sec 196 MV Act",
    severity: "MEDIUM",
    category: "All Vehicles",
    description: "Driving an uninsured motor vehicle, which poses substantial financial risk."
  },
  "Triple Riding": {
    amount: 1000,
    section: "Sec 128 MV Act",
    severity: "MEDIUM",
    category: "Two-Wheeler",
    description: "Carrying more than one pillion rider on a two-wheeler."
  },
  "Over-speeding": {
    amount: 1500,
    section: "Sec 183 MV Act",
    severity: "MEDIUM",
    category: "All Vehicles",
    description: "Driving a motor vehicle in excess of the maximum speed limit specified."
  },
  "Red Light Jump": {
    amount: 1000,
    section: "Sec 119 MV Act",
    severity: "MEDIUM",
    category: "All Vehicles",
    description: "Disobeying mandatory traffic signals, endangering cross-traffic."
  },
  "No Seatbelt": {
    amount: 500,
    section: "Sec 194B MV Act",
    severity: "LOW",
    category: "Four-Wheeler (Private)",
    description: "Driving or riding without fastening the seatbelt."
  },
  "No Valid Licence": {
    amount: 5000,
    section: "Sec 3/181 MV Act",
    severity: "HIGH",
    category: "All Vehicles",
    description: "Driving without holding an active or valid driving license for the vehicle class."
  },
  "Using Mobile While Driving": {
    amount: 1500,
    section: "Sec 184 MV Act",
    severity: "HIGH",
    category: "All Vehicles",
    description: "Holding or using hand-held communication devices while operating a vehicle."
  },
  "Wrong Parking": {
    amount: 500,
    section: "Sec 122/177 MV Act",
    severity: "LOW",
    category: "All Vehicles",
    description: "Leaving a vehicle in a dangerous or obstructive parking spot."
  }
};

export const AI_TEACHING_BLOCKS = {
  "No Helmet": {
    realExample: "Ramesh was running late for a client meet near MG Road. He zipped past a traffic outpost with his helmet dangling on his handle. An automated camera snapped his plate. Ramesh received a ₹1,000 challan and a warning of licence suspension.",
    whatIfNoPay: {
      "7 Days": "A digital warning is sent to your registered phone number. Auto-payment options remain open.",
      "30 Days": "The challan amount locks in. You are blocked from renewing insurance or selling the vehicle.",
      "60 Days": "The file escalates to the virtual court. A summons is issued; ignoring it can lead to a court warrant."
    },
    repeatOffense: "A second or subsequent offense within 3 years attracts double the fine (₹2,000) and an immediate 3-month licence suspension by the RTO.",
    whereMoneyGoes: [
      "Funding of free helmet distribution drives in rural regions.",
      "Installing solar-powered variable messaging signs at black spots.",
      "Support grants for state-led trauma care centres near highways."
    ]
  },
  "No Insurance": {
    realExample: "Priya forgot to renew her third-party insurance. When stopped during a routine checkpoints drive in Jayanagar, the electronic scanner showed expired coverage. She was fined ₹2,000 on the spot, and had to arrange towing as driving uninsured is prohibited.",
    whatIfNoPay: {
      "7 Days": "First notification issued. Police can impound the vehicle on secondary stops.",
      "30 Days": "Double interest potential or flat penalty doubling. Blacklisted on VAHAN portal.",
      "60 Days": "Court summons. Continued driving is punishable with imprisonment up to 3 months or fine up to ₹4,000."
    },
    repeatOffense: "Subsequent offenses attract a fine up to ₹4,000 and/or imprisonment up to 3 months, with vehicle impoundment.",
    whereMoneyGoes: [
      "Accident Compensation Fund for hit-and-run victims.",
      "National Highway ambulance network integrations.",
      "Digital legal aid cells for road accident victims."
    ]
  },
  "Triple Riding": {
    realExample: "Three college students were riding a scooter near the campus gate. A patrol jeep stopped them. Along with the ₹1,000 fine, the driver's license was suspended on-spot for three months to deter unsafe passenger loading.",
    whatIfNoPay: {
      "7 Days": "Alert sent to the license holder and parents (if minors).",
      "30 Days": "VAHAN portal holds are applied to the vehicle registration certificate.",
      "60 Days": "Referred to local traffic court; rider is summoned to explain safety violations."
    },
    repeatOffense: "Repeat violations attract immediate license disqualification for 6 months and mandatory safe-driving community service.",
    whereMoneyGoes: [
      "Road safety orientation classes at universities and colleges.",
      "Procurement of high-precision speed radars and CCTV camera loops."
    ]
  },
  "Over-speeding": {
    realExample: "Aniket decided to test his sedan's speed on the outer expressway at midnight. A speed-gun camera clocked him at 124 km/h in an 80 km/h zone. The automated SMS challan of ₹1,000 was delivered before he reached home.",
    whatIfNoPay: {
      "7 Days": "Digital notification reminder. Option to pay at discount counter in digital portals.",
      "30 Days": "License details sent to the RTO for speed violation tracking. Portal holds activated.",
      "60 Days": "Court appearance required. Inability to produce valid justification results in higher summary fines."
    },
    repeatOffense: "Second speed offense leads to license impounding, mandatory driver re-training, and ₹2,000 fine.",
    whereMoneyGoes: [
      "Installation of smart automatic speed governors on commercial fleets.",
      "Scientific study of highway crash sections to reduce fatality rates.",
      "Financing traffic signs and emergency crash cushions."
    ]
  },
  "Red Light Jump": {
    realExample: "Siddharth rushed through an intersection as the light turned red. An automated red-light speed violation camera snapped his rear plates. He received a fine of ₹1,000 under Section 119.",
    whatIfNoPay: {
      "7 Days": "System sends SMS alert containing camera footage and link to pay.",
      "30 Days": "Vehicle is flagged at toll booths; toll scanners alert local patrols on highway entry.",
      "60 Days": "Virtual court hearing scheduled. Disobeying summons risks vehicle confiscation orders."
    },
    repeatOffense: "Subsequent offenses face up to ₹2,000 fine, 1 month imprisonment, and active license suspension.",
    whereMoneyGoes: [
      "Intersection automation and smart AI traffic flow cameras.",
      "High-visibility pedestrian zebra crossings and path indicators."
    ]
  },
  "No Seatbelt": {
    realExample: "Meera was driving to the supermarket next block and did not buckle up. A traffic inspector spotted her at a roundabout. She was issued a spot fine of ₹500 under Section 194B.",
    whatIfNoPay: {
      "7 Days": "Friendly SMS reminder sent.",
      "30 Days": "Blocked from updating vehicle address or registering transfer of ownership.",
      "60 Days": "Summons from traffic magistrate. Fines can be raised by court discretion."
    },
    repeatOffense: "Subsequent offenses result in ₹1,000 fines and mandatory safety counselling at local RTO.",
    whereMoneyGoes: [
      "Seatbelt safety awareness billboards and video campaigns.",
      "Public school road safety training programs."
    ]
  },
  "No Valid Licence": {
    realExample: "Karan lent his car to his teenager cousin who didn't have a license. They were stopped during a festival security sweep. Karan was fined ₹5,000 under Section 180 (allowing unauthorized person to drive) and the teenager got a matching ₹5,000 fine.",
    whatIfNoPay: {
      "7 Days": "High-priority warning. SMS issued to license holder and vehicle owner.",
      "30 Days": "Police are authorized to impound the vehicle on sight.",
      "60 Days": "Virtual court mandates appearance. Failure to appear results in arrest warrants or heavy summary penalties."
    },
    repeatOffense: "Subsequent offenses attract a flat ₹10,000 fine, potential vehicle seizure, and up to 3 months imprisonment.",
    whereMoneyGoes: [
      "State driving school subsidies and licensing camp setups.",
      "Rehabilitation funds for road accident victims."
    ]
  },
  "Using Mobile While Driving": {
    realExample: "Rahul was replying to a text message while driving. A motorcycle patrol officer caught him holding the phone on the steering wheel. He was issued a spot fine of ₹1,500 under Section 184.",
    whatIfNoPay: {
      "7 Days": "Direct notification reminder.",
      "30 Days": "License is placed on the suspension watch-list. VAHAN portal holds active.",
      "60 Days": "Escalated to court. Magistrate can suspend license for up to 6 months."
    },
    repeatOffense: "Second offense within 3 years results in a fine up to ₹10,000 or imprisonment up to 6 months.",
    whereMoneyGoes: [
      "Distracted driving awareness commercials on digital screens.",
      "Procurement of specialized camera feeds that identify mobile usage in-cabin."
    ]
  },
  "Wrong Parking": {
    realExample: "Aman parked his hatchback near a busy marketplace lane in Indiranagar, ignoring a yellow painted kerb line. A traffic tow truck cleared the block and issued a ₹500 challan.",
    whatIfNoPay: {
      "7 Days": "Digital notification reminder sent to owner.",
      "30 Days": "Vehicle registration blacklisted on state parking violations watch-list.",
      "60 Days": "Case referred to virtual traffic magistrate. Double towing fines can apply."
    },
    repeatOffense: "Repeat parking offences allow local traffic police to immobilize the vehicle with tyre clamps (₹1,000 release fine).",
    whereMoneyGoes: [
      "Creation of dedicated multi-level smart parking structures.",
      "Painting of bold pedestrian paths and clearance markers."
    ]
  }
};

// Travel Mode specific guidelines
export const TRAVEL_RULES = {
  "Karnataka": {
    registeredIn: "Maharashtra",
    notice: "You are driving in Karnataka. Your vehicle is registered in Maharashtra.",
    keyDifferences: [
      "High Tax Enforcement: Out-of-state vehicles staying beyond 11 months must pay lifetime road tax in Karnataka.",
      "Mandatory original physical documents or authenticated DigiLocker/mParivahan apps.",
      "Tinted Glass rules are strictly enforced: No plastic sun-films allowed on glasses, regardless of light transmission percentage."
    ],
    commonChallans: [
      "Tinted windows/Sun film (₹1,000 fine)",
      "Unregistered out-of-state vehicle beyond permitted timeline (₹2,000 - ₹5,000 fine)",
      "High-Security Registration Plates (HSRP) missing (₹500 fine)"
    ],
    reminders: [
      "Carry original physical RC + Insurance certificate.",
      "Ensure PUC (Pollution Under Control) is valid (out-of-state PUCs are validated online via VAHAN)."
    ]
  },
  "Maharashtra": {
    registeredIn: "Karnataka",
    notice: "You are driving in Maharashtra. Your vehicle is registered in Karnataka.",
    keyDifferences: [
      "PUC Validity check is strictly computerized. Spot checking is highly frequent near city toll booths.",
      "Reflective yellow tapes are mandatory on the front bumper for specific classes of commercial out-of-state vehicles.",
      "Seatbelt rules are strictly applied to all front and rear seat passengers in metro regions."
    ],
    commonChallans: [
      "PUC Certificate expired (₹2,000 fine)",
      "Speed limit breaches monitored strictly via expressway gantries (₹2,000 fine)",
      "Rear seatbelts not worn (₹200 per passenger)"
    ],
    reminders: [
      "Keep digital copy of PUC handy on mParivahan app.",
      "Always follow speed lane rules on major expressways (e.g., Pune-Mumbai Expressway)."
    ]
  }
};

// Static Cascading Location Data
export const LOCATION_CASCADES = {
  "India": {
    "Karnataka": {
      "Bengaluru": ["MG Road", "Indiranagar", "Koramangala", "Whitefield", "Jayanagar"],
      "Mysuru": ["Gokulam", "Devaraja Mohalla", "Kuwempunagar"],
      "Hubballi": ["Vidyanagar", "Keshwapur", "Gokul Road"]
    },
    "Maharashtra": {
      "Mumbai": ["Bandra", "Andheri", "Colaba", "Juhu", "Worli"],
      "Pune": ["Koregaon Park", "Kothrud", "Hinjawadi", "Viman Nagar"],
      "Nagpur": ["Dharampeth", "Sadar", "Wardhaman Nagar"]
    },
    "Delhi": {
      "New Delhi": ["Connaught Place", "Saket", "Karol Bagh", "Dwarka", "Vasant Kunj"]
    }
  }
};
