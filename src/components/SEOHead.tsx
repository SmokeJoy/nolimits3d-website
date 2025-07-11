import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'service' | 'local_business';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  category?: string;
  tags?: string[];
  localSEO?: {
    businessName?: string;
    address?: string;
    city?: string;
    region?: string;
    postalCode?: string;
    phone?: string;
    priceRange?: string;
    services?: string[];
  };
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
  faq?: Array<{
    question: string;
    answer: string;
  }>;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Stampa 3D Frosinone | Prototipazione Professionale | NoLimits3D",
  description = "Stampa 3D professionale a Frosinone: prototipazione rapida, componenti tecnici, preventivo gratuito in 2 ore. Materiali certificati PLA, ABS, PETG, TPU.",
  keywords = "stampa 3d frosinone, prototipazione frosinone, componenti tecnici frosinone, stampa 3d ciociaria, FDM professionale, preventivo stampa 3d, PLA, ABS, PETG, TPU",
  image = "https://nolimits3d.store/images/logo.jpg",
  url = "https://nolimits3d.store",
  type = "website",
  publishedTime,
  modifiedTime,
  author = "NoLimits3D",
  category,
  tags = [],
  localSEO = {
    businessName: "NoLimits3D",
    address: "Via Dante Alighieri",
    city: "Frosinone",
    region: "Lazio",
    postalCode: "03100",
    phone: "+393770918590",
    priceRange: "€€",
    services: ["Stampa 3D FDM", "Prototipazione", "Componenti Tecnici"]
  },
  breadcrumbs = [],
  faq = []
}) => {
  // Generate Local SEO structured data
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": localSEO.businessName || "NoLimits3D",
    "description": description,
    "url": url,
    "logo": image,
    "image": image,
    "telephone": localSEO.phone,
    "priceRange": localSEO.priceRange,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": localSEO.address,
      "addressLocality": localSEO.city,
      "addressRegion": localSEO.region,
      "postalCode": localSEO.postalCode,
      "addressCountry": "IT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.6298,
      "longitude": 13.3401
    },
    "openingHours": "Mo-Sa 09:00-18:00",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 41.6298,
        "longitude": 13.3401
      },
      "geoRadius": "50000"
    },
    "areaServed": ["Frosinone", "Ciociaria", "Lazio", "Roma", "Latina"]
  };

  // Generate Breadcrumbs structured data
  const breadcrumbsData = breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  } : null;

  // Generate FAQ structured data
  const faqData = faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;

  // Generate Article structured data (for blog posts)
  const articleData = type === 'article' ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "NoLimits3D",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nolimits3d.store/images/logo.jpg"
      }
    },
    "datePublished": publishedTime,
    "dateModified": modifiedTime || publishedTime,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "keywords": keywords,
    "articleSection": category,
    "about": {
      "@type": "Thing",
      "name": "Stampa 3D FDM"
    }
  } : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Local SEO Meta Tags */}
      <meta name="geo.region" content="IT-FR" />
      <meta name="geo.placename" content={localSEO.city} />
      <meta name="geo.position" content="41.6298;13.3401" />
      <meta name="ICBM" content="41.6298, 13.3401" />
      <meta name="DC.coverage" content="Frosinone, Ciociaria, Lazio" />
      <meta name="service-area" content="Frosinone, Ciociaria, Lazio, Roma, Latina, Cassino, Sora, Anagni, Ferentino, Alatri" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="NoLimits3D" />
      <meta property="og:locale" content="it_IT" />
      
      {/* Business Information in Open Graph */}
      <meta property="business:contact_data:street_address" content={localSEO.address} />
      <meta property="business:contact_data:locality" content={localSEO.city} />
      <meta property="business:contact_data:region" content={localSEO.region} />
      <meta property="business:contact_data:postal_code" content={localSEO.postalCode} />
      <meta property="business:contact_data:country_name" content="Italia" />
      <meta property="business:contact_data:phone_number" content={localSEO.phone} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={url} />

      {/* Article specific meta tags */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={author} />
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:modified_time" content={modifiedTime || publishedTime} />
          {category && <meta property="article:section" content={category} />}
          {tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Local Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessData)}
      </script>

      {/* Breadcrumbs Schema */}
      {breadcrumbsData && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbsData)}
        </script>
      )}

      {/* FAQ Schema */}
      {faqData && (
        <script type="application/ld+json">
          {JSON.stringify(faqData)}
        </script>
      )}

      {/* Article Schema */}
      {articleData && (
        <script type="application/ld+json">
          {JSON.stringify(articleData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead; 