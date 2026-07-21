export type Project = {
  title: string;
  years?: string;
  role: string;
  funding?: string;
  fundingAgency?: string;
  description: string;
};

export const flagshipProjects: Project[] = [
  {
    title: "Hand-Held Moisture Meter for Made Tea",
    role: "Principal Investigator",
    funding: "₹28.78 Lakhs",
    fundingAgency: "DST, Govt. of India",
    description:
      "Patch-antenna based moisture analysis for tea samples: electronics hardware, antenna design, embedded software, and lab-to-field prototyping.",
  },
  {
    title: "Early Warning System for Plant Protection & Pest Control",
    years: "2014–2017",
    role: "Principal Investigator",
    funding: "₹314 Lakhs",
    fundingAgency: "CSIR SUPRA",
    description:
      "Sensor interfacing, data logging and field-scale disease forecasting for medicinal crops, with field trials run in collaboration with agricultural universities.",
  },
  {
    title: "Sensors & Instrumentation for Crop Growth (Photosynthesis)",
    role: "Principal Investigator",
    funding: "₹64.70 Lakhs",
    fundingAgency: "CSIR SUPRA",
    description:
      "Temperature, humidity and CO₂-scrubber sensor interfacing with a custom leaf-sample holder for photosynthesis data collection and analysis.",
  },
  {
    title: "Moisture Probe for Oil Seeds & Pulses",
    role: "Principal Investigator",
    funding: "₹12.13 Lakhs",
    fundingAgency: "Dept. of Vanaspati & Vegetables, Govt. of India",
    description:
      "Resistivity-based moisture sensing interfaced to a microcontroller, validated at Khandelia Oil Mills, Chandigarh.",
  },
  {
    title: "Indigenized Lyophiliser for Preservation of Indian Fruits & Vegetables",
    years: "2018–2020",
    role: "Co-Principal Investigator / Nodal Officer, ANB Mission",
    funding: "₹398 Lakhs",
    fundingAgency: "CSIR Agri-Nutri Biotech (ANB) Mission",
    description:
      "Electronics for chamber temperature and humidity measurement and control in a lyophilisation system for food preservation.",
  },
  {
    title: "Smart Agro-Informatics & Green IoT for Agriculture-4.0 (SAGITA)",
    role: "Coordinator / Team Member",
    funding: "₹80 Lakhs",
    fundingAgency: "CSIR ANB Mission",
    description:
      "Soil temperature and water-mark humidity sensor networks with field installation, built toward IoT-enabled precision agriculture.",
  },
  {
    title: "Mobile Soil-Sensing System & Digital Spatial Repository",
    role: "Team Member",
    funding: "₹118 Lakhs",
    fundingAgency: "CSIR ANB Mission",
    description:
      "Fusion of proximity soil sensors with geo-statistics modelling for precision agriculture mapping.",
  },
  {
    title: "Customized Flow Hive for Wax-Free Honey Extraction",
    years: "2018–2020",
    role: "Program Coordinator / Nodal Officer",
    funding: "₹68 Lakhs",
    fundingAgency: "CSIR ANB Mission",
    description:
      "Lab prototyping and validation of a wax-free honey extraction mechanism.",
  },
  {
    title: "Design & Development of Bamboo Composite Structures",
    years: "2018–2020",
    role: "Team Member",
    funding: "₹98 Lakhs",
    fundingAgency: "CSIR ANB Mission",
    description: "Joint design and testing for bamboo and composite structural sections.",
  },
  {
    title: "Electrostatic Spraying Technology: Facility Creation",
    role: "Team Member / Administrative Role",
    funding: "₹300 Lakhs",
    fundingAgency: "CSIR OLP",
    description:
      "High-voltage electronic and electrical test facility supporting electrostatic spraying R&D.",
  },
  {
    title: "River Water Quality Index Monitoring via Machine Learning",
    funding: "₹19.50 Lakhs",
    role: "Team Member",
    description: "Photosynthesis-index electronics feeding a machine-learning water-quality model.",
  },
  {
    title: "Electrostatic Nozzle for Agricultural Applications",
    role: "Team Lead Support (HoD)",
    funding: "₹27.05 Lakhs",
    fundingAgency: "SERB, DST",
    description: "Testing and technology-transfer negotiation for an agricultural electrostatic nozzle.",
  },
  {
    title: "Customized Coconut Harvesting Machine",
    role: "Team Member",
    funding: "₹32.56 Lakhs",
    fundingAgency: "DST",
    description: "Climb-mechanism electronics using brushless DC motors for automated coconut harvesting.",
  },
];

export const researchAreas = [
  {
    title: "Agrionics & Sensor Instrumentation",
    description:
      "Sensor and electronics design for pre- and post-harvest technologies: moisture, disease, and crop-growth measurement systems built for field conditions.",
  },
  {
    title: "Microwave-Absorbing Nanomaterials",
    description:
      "Ferrite and nanocomposite materials engineered for X-band microwave absorption, developed with PhD scholars across multiple funded studies.",
  },
  {
    title: "Prosthetics & Biomechanics",
    description:
      "Mechanism design for low-cost prosthetic hands and human gait dynamics, bridging electronics with rehabilitation robotics.",
  },
  {
    title: "Electrostatic Systems",
    description:
      "Electrostatic spraying, disinfection, and dust-mitigation technologies taken from lab prototype through to licensed, commercialized products.",
  },
] as const;

export const technologiesAsPI = [
  "Controlled Storage Atmosphere for Fruits and Vegetables",
  "Sensors and Instrumentation for Crop Growth (Photosynthesis)",
  "Early Warning System for Plant Protection and Pest Control",
  "Indigenized Lyophiliser for Preservation of Indian Fruits and Vegetables",
  "Customized Flow Hive for Quality Honey Extraction",
  "Smart Agro-Informatics and Green IoT for Agriculture-4.0 (SAGITA)",
] as const;

// Every technology above was also carried through to a working prototype —
// the three entries below map directly to the technologies-as-PI list
// (Controlled Storage / Crop Growth Sensors / Early Warning System already
// appear here under their prototype-stage naming, so aren't repeated).
export const prototypesDeveloped = [
  "Sensor and Instrumentation for Crop Growth (Photosynthesis)",
  "Controlled Storage for Fruits and Vegetables",
  "Digital Moisture Probe for Grains",
  "Hand-Held Moisture Meter for Made Tea",
  "Early Warning System for Plant Protection & Pest Control (Kutki)",
  "Indigenized Lyophiliser for Preservation of Indian Fruits and Vegetables",
  "Customized Flow Hive for Quality Honey Extraction",
  "Smart Agro-Informatics and Green IoT for Agriculture-4.0 (SAGITA)",
] as const;
