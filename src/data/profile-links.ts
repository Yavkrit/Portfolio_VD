// ORCID is the standard identifier academic publishers and funding bodies
// check first — add the real iD here (format "0000-0002-1234-5678") the
// moment one exists, e.g. by registering at https://orcid.org, and it will
// appear automatically as a profile icon and in the site's structured data
// (see src/components/seo/person-json-ld.tsx, which imports this constant).
export const ORCID_ID = "";

export const profileLinks = [
  {
    key: "scholar",
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?user=iva4O4MAAAAJ&hl=en",
  },
  {
    key: "researchgate",
    label: "ResearchGate",
    href: "https://www.researchgate.net/profile/Dattatraya-Vhatkar",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dr-dattatraya-vhatkar-2353797/",
  },
  {
    key: "adindex",
    label: "AD Scientific Index",
    href: "https://adscientificindex.com/scientist/vd-shivling/5452813/",
  },
  {
    key: "csio",
    label: "CSIR-CSIO Official Profile",
    href: "https://icsio.csio.res.in/CSIO.EMS/HoD.aspx?id=550",
  },
  ...(ORCID_ID
    ? [{ key: "orcid", label: "ORCID", href: `https://orcid.org/${ORCID_ID}` }]
    : []),
] as const;
