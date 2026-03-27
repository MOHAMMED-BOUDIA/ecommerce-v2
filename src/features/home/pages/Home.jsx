import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import BrandManifesto from '../components/BrandManifesto';
import FeaturedCategories from '../components/FeaturedCategories';
import FeaturedProducts from '../components/FeaturedProducts';
import NewArrivals from '../components/NewArrivals';
import BestSellers from '../components/BestSellers';
import BrandStory from '../components/BrandStory';
import EditorialShowcase from '../components/EditorialShowcase';
import TechnicalShowcase from '../components/TechnicalShowcase';
import VisualStats from '../components/VisualStats';
import ProcessSection from '../components/ProcessSection';
import StoreBenefits from '../components/StoreBenefits';
import PromotionBanner from '../components/PromotionBanner';
import LookbookSection from '../components/LookbookSection';
import FeaturesHighlights from '../components/FeaturesHighlights';
import Testimonials from '../components/Testimonials';
import BrandLogos from '../components/BrandLogos';
import NewsletterSection from '../components/NewsletterSection';

/**
 * Editorial Luxury Home Page - Ultra Extended Edition v4
 * Implements high-end technical aesthetic across 19+ curated sections.
 * Optimized for long-scroll engagement and high-contrast typography.
 */
const Home = () => {
  useEffect(() => {
    // Scroll to top on mount for cinematic flow
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <main className="bg-[#0a0a0a] min-h-screen selection:bg-white selection:text-black overflow-x-hidden">
      {/* 1. HERO: The Strategic Entry */}
      <section className="relative z-50">
        <HeroSection />
      </section>

      {/* 2. PHILOSOPHY: The Brand Manifesto */}
      <BrandManifesto />

      {/* 3. NAVIGATION: Curated Category Strip */}
      <FeaturedCategories />

      {/* 4. CORE INVENTORY: Essential Deployments */}
      <FeaturedProducts />

      {/* 5. FRESH INVENTORY: New Technical Prototypes */}
      <section className="border-y border-white/5">
        <NewArrivals />
      </section>

      {/* 6. IMMERSIVE NARRATIVE: Lookbook Horizontal Gallery */}
      <LookbookSection />

      {/* 7. PERFORMANCE: Best Sellers / Core Staples */}
      <BestSellers />

      {/* 8. NARRATIVE: Brand Story */}
      <BrandStory />

      {/* 9. DEEP DIVE: Image + Text Showcase 01 */}
      <EditorialShowcase />

      {/* 10. TECHNICAL SHOWCASE: Image + Text Showcase 02 */}
      <TechnicalShowcase />

      {/* 11. METRICS: Visual Performance Stats */}
      <VisualStats />

      {/* 12. TECHNICAL FLOW: The Process */}
      <ProcessSection />

      {/* 13. SERVICE: Tactical Benefits */}
      <StoreBenefits />

      {/* 14. CONVERSION: Tiered Access Banner */}
      <PromotionBanner />

      {/* 15. TECHNICAL SPECS: Performance Engineering */}
      <FeaturesHighlights />

      {/* 16. SOCIAL PROOF: The Human Element */}
      <Testimonials />

      {/* 17. INDUSTRY ALIGNMENT: Brand Partners */}
      <BrandLogos />

      {/* 18. COMMUNITY ACCESS: The Archive Protocol */}
      <NewsletterSection />

      {/* Floating Design Credential Decor */}
      <div className="fixed bottom-10 right-10 z-[100] hidden lg:block">
        <div className="flex flex-col items-end gap-2 text-white/10 uppercase font-black text-[9px] tracking-[0.4em] origin-right rotate-90 translate-x-12 translate-y-12 select-none">
          <span>// VANGUARD SYSTEM // CORE-08</span>
          <span>EST. 2026 // ARCHIVE</span>
        </div>
      </div>
    </main>
  );
};

export default Home;
