import React from 'react';
import { Helmet } from 'react-helmet-async';

// Interfaccia per dati articolo
export interface ArticleData {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  wordCount: number;
  image: string;
  slug: string;
}

// Interfaccia estesa per local business
interface LocalSEOData {
  businessName: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  phone: string;
  email?: string;
  priceRange: string;
  services: string[];
  openingHours?: string[];
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article' | 'local_business';
  localSEO?: LocalSEOData;
  articleData?: ArticleData;
  canonicalUrl?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  url = 'https://nolimits3d.store',
  image = 'https://nolimits3d.store/images/logo.jpg',
  type = 'website',
  localSEO,
  articleData,
  canonicalUrl
}) => {
  // Schema LocalBusiness avanzato
  const createLocalBusinessSchema = () => {
    if (!localSEO) return null;

    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://nolimits3d.store/#organization",
      "name": localSEO.businessName,
      "legalName": "NoLimits3D di Andrea Conte",
      "url": "https://nolimits3d.store",
      "logo": "https://nolimits3d.store/images/logo.jpg",
      "image": "https://nolimits3d.store/images/logo.jpg",
      "description": "Servizio professionale di stampa 3D FDM a Frosinone. Prototipazione rapida, componenti tecnici specializzati e oggetti personalizzati per aziende e privati in Ciociaria.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": localSEO.address,
        "addressLocality": localSEO.city,
        "addressRegion": localSEO.region,
        "postalCode": localSEO.postalCode,
        "addressCountry": "IT"
      },
      "geo": localSEO.coordinates ? {
        "@type": "GeoCoordinates",
        "latitude": localSEO.coordinates.latitude,
        "longitude": localSEO.coordinates.longitude
      } : {
        "@type": "GeoCoordinates",
        "latitude": 41.6330,
        "longitude": 13.3424
      },
      "telephone": localSEO.phone,
      "email": localSEO.email || "nolimits.3d.print@gmail.com",
      "priceRange": localSEO.priceRange,
      "currenciesAccepted": "EUR",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer",
      "openingHours": localSEO.openingHours || [
        "Mo-Fr 09:00-18:00",
        "Sa 09:00-13:00"
      ],
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 41.6330,
          "longitude": 13.3424
        },
        "geoRadius": "50000"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Frosinone",
          "sameAs": "https://it.wikipedia.org/wiki/Frosinone"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Ciociaria"
        },
        {
          "@type": "AdministrativeArea", 
          "name": "Lazio"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Servizi Stampa 3D",
        "itemListElement": localSEO.services.map((service, index) => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": service
          },
          "position": index + 1
        }))
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "27",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Marco R."
          },
          "datePublished": "2024-11-15",
          "reviewBody": "Servizio eccellente per la prototipazione. Qualità professionale e tempi di consegna rispettati. Consigliato per progetti industriali.",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          }
        }
      ],
      "sameAs": [
        "https://www.instagram.com/nolimits3d.it/",
        "https://wa.me/393770918590"
      ]
    };
  };

  // Schema Article per blog posts
  const createArticleSchema = () => {
    if (!articleData) return null;

    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${url}/#article`,
      "headline": articleData.title,
      "description": articleData.description,
      "image": `https://nolimits3d.store${articleData.image}`,
      "datePublished": `${articleData.datePublished}T09:00:00+02:00`,
      "dateModified": `${articleData.dateModified || articleData.datePublished}T15:00:00+02:00`,
      "author": {
        "@type": "Person",
        "name": articleData.author,
        "url": "https://nolimits3d.store/chi-siamo"
      },
      "publisher": {
        "@type": "Organization",
        "name": "NoLimits3D",
        "logo": {
          "@type": "ImageObject",
          "url": "https://nolimits3d.store/images/logo.jpg",
          "width": 400,
          "height": 400
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      },
      "wordCount": articleData.wordCount,
      "articleSection": "Stampa 3D Guide",
      "inLanguage": "it-IT",
      "isPartOf": {
        "@type": "Blog",
        "@id": "https://nolimits3d.store/blog/#blog"
      },
      "about": {
        "@type": "Thing",
        "name": "Stampa 3D",
        "sameAs": "https://it.wikipedia.org/wiki/Stampa_3D"
      }
    };
  };

  // Schema WebSite per search box
  const createWebSiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://nolimits3d.store/#website",
    "url": "https://nolimits3d.store",
    "name": "NoLimits3D - Stampa 3D Professionale Frosinone",
    "description": "Servizio professionale di stampa 3D FDM a Frosinone. Prototipazione rapida e componenti tecnici per aziende in Ciociaria.",
    "publisher": {
      "@id": "https://nolimits3d.store/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://nolimits3d.store/blog?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "it-IT"
  });

  // Combina tutti gli schema
  const schemas = [createWebSiteSchema()];
  
  if (localSEO) {
    schemas.push(createLocalBusinessSchema());
  }
  
  if (articleData) {
    schemas.push(createArticleSchema());
  }

  return (
    <Helmet>
      {/* Meta tags standard */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl || url} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
      <meta property="og:site_name" content="NoLimits3D" />
      <meta property="og:locale" content="it_IT" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Article specific */}
      {articleData && (
        <>
          <meta property="article:published_time" content={`${articleData.datePublished}T09:00:00+02:00`} />
          <meta property="article:modified_time" content={`${articleData.dateModified || articleData.datePublished}T15:00:00+02:00`} />
          <meta property="article:author" content={articleData.author} />
          <meta property="article:section" content="Stampa 3D" />
          <meta property="article:tag" content="stampa 3d, prototipazione, frosinone" />
        </>
      )}
      
      {/* Schema.org JSON-LD */}
      {schemas.map((schema, index) => (
        schema && (
          <script key={index} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        )
      ))}
      
      {/* Preconnect per performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      
      {/* DNS prefetch */}
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
    </Helmet>
  );
};

export default SEOHead; 