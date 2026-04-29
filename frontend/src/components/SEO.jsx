import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, type = 'website' }) => {
  const siteName = 'ShuttleCore';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph tags for social sharing */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;
