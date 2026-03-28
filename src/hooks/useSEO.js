import { useEffect } from 'react';

export const useSEO = (config = {}) => {
  const {
    title = 'VANGUARD | Premium Tactical Archive',
    description = 'Premium tactical gear, high-performance equipment, and innovative products for professionals and enthusiasts.',
    keywords = 'tactical gear, premium equipment, professional tools',
    ogTitle = null,
    ogDescription = null,
    ogImage = null,
    canonical = null,
    status = 200,
  } = config;

  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;

    // Update or create meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = keywords;

    // Update Open Graph tags
    const updateMetaTag = (property, value, isProperty = true) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, property);
        document.head.appendChild(meta);
      }
      meta.content = value;
    };

    if (ogTitle) updateMetaTag('og:title', ogTitle);
    if (ogDescription) updateMetaTag('og:description', ogDescription);
    if (ogImage) updateMetaTag('og:image', ogImage);

    // Update canonical tag
    if (canonical) {
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.rel = 'canonical';
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.href = canonical;
    }

    return () => {
      // Cleanup if needed
    };
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, canonical, status]);
};
