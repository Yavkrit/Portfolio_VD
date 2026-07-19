import { profile } from "@/data/profile";
import { profileLinks, ORCID_ID } from "@/data/profile-links";
import { SITE_URL } from "@/lib/site";

export function PersonJsonLd() {
  // profileLinks already includes the ORCID entry once ORCID_ID is set
  // (see data/profile-links.ts), so no need to add it again here.
  const sameAs = profileLinks.map((link) => link.href);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    worksFor: {
      "@type": "Organization",
      name: profile.institute,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chandigarh",
      addressCountry: "IN",
    },
    url: SITE_URL,
    sameAs,
    ...(ORCID_ID ? { identifier: `https://orcid.org/${ORCID_ID}` } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
