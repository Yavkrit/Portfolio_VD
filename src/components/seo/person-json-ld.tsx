import { profile } from "@/data/profile";
import { profileLinks, ORCID_ID } from "@/data/profile-links";
import { SITE_URL } from "@/lib/site";

export function PersonJsonLd() {
  const sameAs = [
    ...profileLinks.map((link) => link.href),
    ...(ORCID_ID ? [`https://orcid.org/${ORCID_ID}`] : []),
  ];

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
