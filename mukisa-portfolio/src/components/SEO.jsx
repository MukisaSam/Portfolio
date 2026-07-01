import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Mukisa Samuel - Software Engineer & Ethical Hacker",
  description = "Passionate software engineer and ethical hacker specializing in secure web applications, cybersecurity consulting, and penetration testing. Building robust solutions that stand the test of modern security challenges.",
  keywords = "software engineer, ethical hacker, cybersecurity, web development, penetration testing, security consulting, React, Node.js, Python, Uganda developer",
  image = "/og-image.jpg",
  url = "https://mukisa.dev",
  type = "website"
}) => {
  const siteTitle = title.includes("Mukisa Samuel") ? title : `${title} | Mukisa Samuel`;
  const socialLinks = [
    "https://github.com/MukisaSam",
    "https://www.linkedin.com/in/mukisa-samuel",
    "https://x.com/samuelmuki"
  ];

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Mukisa Samuel" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Mukisa Samuel Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content="@mukisa_samuel" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="application-name" content="Mukisa Samuel Portfolio" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Mukisa Samuel",
          "jobTitle": "Software Engineer & Ethical Hacker",
          "description": description,
          "url": url,
          "image": image,
          "sameAs": socialLinks,
          "knowsAbout": [
            "Software Engineering",
            "Ethical Hacking",
            "Cybersecurity",
            "Web Development",
            "Penetration Testing",
            "JavaScript",
            "Python",
            "React",
            "Node.js"
          ],
          "alumniOf": {
            "@type": "Organization",
            "name": "University"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Kampala",
            "addressCountry": "Uganda"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;