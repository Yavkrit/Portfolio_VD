export const profile = {
  name: "Dr Dattatraya Vhatkar",
  fullName: "Dr Dattatraya Vhatkar",
  title: "Chief Scientist",
  division: "IMCS Division",
  institute: "CSIR – Central Scientific Instruments Organisation (CSIO)",
  location: "Chandigarh, India",
  specialization:
    "Electronics for Agrionics Instrumentation — Sensors & Systems for Pre- and Post-Harvest Technologies",
  tagline:
    "Thirty years turning sensor physics into instruments farmers and industry actually use.",
} as const;

export const education = [
  {
    degree: "Ph.D. (Engineering)",
    year: "2017",
    institute: "Jaipur National University, Jaipur",
    detail:
      "Thesis: Study and Development of Sensor & Instrumentation for Plant Protection Applications",
  },
  {
    degree: "M.Tech., Electronics & Communication Engineering",
    year: "2007",
    institute: "Panjab Technical University, Jalandhar",
    detail: "",
  },
  {
    degree: "B.E., Electronics",
    year: "1992",
    institute: "Shivaji University (Walchand College of Engineering, Sangli)",
    detail: "",
  },
] as const;

export const careerTimeline = [
  { role: "Scientist B", institute: "CSIR-CSIO", from: 1993, to: 1998 },
  { role: "Scientist C", institute: "CSIR-CSIO", from: 1998, to: 2003 },
  { role: "Scientist E1", institute: "CSIR-CSIO", from: 2003, to: 2008 },
  { role: "Principal Scientist (E2)", institute: "CSIR-CSIO", from: 2008, to: 2014 },
  { role: "Senior Principal Scientist", institute: "CSIR-CSIO", from: 2014, to: 2020 },
  { role: "Chief Scientist", institute: "CSIR-CSIO", from: 2020, to: null },
] as const;

export const leadershipRoles = [
  { role: "Head, Department of Agrionics", org: "CSIR-CSIO", period: "Jan 2015 – Jun 2021" },
  { role: "Honorary Professor", org: "AcSIR-CSIO", period: "Ongoing" },
  {
    role: "Expert Committee Member, PRSG",
    org: "Ministry of Information & Communication Technology (MeitY), New Delhi",
    period: "",
  },
  { role: "Member, ACR Collegium for Principal & Sr. Principal Scientist", org: "CSIR-CSIO", period: "2022 – Present" },
] as const;

// Fellow (IETE) and Life Member (Instrument Society of India) are covered
// with full credential detail in data/certifications.ts — kept out of this
// plain list to avoid duplicating them.
export const professionalAffiliations = [
  "Member, Indian Phytopathological Society",
  "Member, Indian Meteorological Society",
] as const;

export const researchImpactSummary = {
  externallyFundedProjects: { count: 6, value: "₹2 Cr" },
  csirProjects: { count: 8, value: "₹15 Cr" },
  departmentalProjects: { count: 20, value: "₹8.2 Cr" },
  technologyReports: "~100",
  technicalReports: "~10",
  invitedTalks: 5,
  pgThesisSupervised: "25+",
  ugStudentsTrained: "40+",
  phdStudentsOngoing: 3,
  conferencesOrganized: 10,
} as const;

export const phdSupervision = [
  { student: "Manju Bala", area: "Spinel ferrite based nanocomposites for microwave absorption applications" },
  { student: "Amandeep Singh", area: "High strain-rate compressive response of polyurethane for shock mitigation of embedded electronics (thesis submitted)" },
  { student: "S. Anup Chander", area: "Robotics and control systems" },
] as const;

export const visionStatement = `As CSIR-CSIO looks toward the next decade, the world is moving decisively into technologies backed by high-end computing, artificial intelligence, and Industry 4.0. Building on the institute's strengths in robotics, optics, photonics, agri-instrumentation, imaging, avionics, and artificial intelligence, the path forward rests on five pillars: deeper industry collaboration that turns societal research into revenue and healthy competitiveness; indigenous technology development in step with national self-reliance goals; start-up incubation that lets thesis work graduate into engineering-backed ventures; academia exposure that keeps the institute's science current; and a collaborative, healthy work culture that makes all of the above sustainable. The throughline is balance — between industrial and societal work, between strong IPR and open scientific output, between rigorous instrumentation and the people who build it.`;
