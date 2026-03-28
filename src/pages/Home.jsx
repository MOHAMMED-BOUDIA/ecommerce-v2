import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";     
import {
  HiOutlineArrowRight,
  HiOutlineCubeTransparent,
  HiOutlineShieldCheck,
  HiOutlineGlobeAlt,
  HiOutlineCpuChip,
  HiOutlineBolt,
  HiOutlineStar,
  HiOutlineCube,
  HiOutlineFingerPrint,
  HiOutlineEnvelope,
  HiOutlineCommandLine,
  HiOutlineIdentification,
  HiOutlineWrenchScrewdriver,
  HiOutlineBeaker,
  HiOutlineWifi,
  HiOutlineLockClosed,
  HiOutlineArrowUpRight,
  HiOutlineMapPin,
  HiOutlineQuestionMarkCircle
} from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import Globe from "react-globe.gl";
import Button from "../components/ui/Button";
import Accordion from "../components/ui/Accordion";
import { useSEO } from "../hooks/useSEO";
import HeroSection from "../features/home/components/HeroSection";
import BrandManifesto from "../features/home/components/BrandManifesto";
import FeaturedCategories from "../features/home/components/FeaturedCategories";
import FeaturedProducts from "../features/home/components/FeaturedProducts";
import NewArrivals from "../features/home/components/NewArrivals";
import BestSellers from "../features/home/components/BestSellers";
import BrandStory from "../features/home/components/BrandStory";
import EditorialShowcase from "../features/home/components/EditorialShowcase";
import TechnicalShowcase from "../features/home/components/TechnicalShowcase";
import VisualStats from "../features/home/components/VisualStats";
import ProcessSection from "../features/home/components/ProcessSection";
import StoreBenefits from "../features/home/components/StoreBenefits";
import PromotionBanner from "../features/home/components/PromotionBanner";
import LookbookSection from "../features/home/components/LookbookSection";
import FeaturesHighlights from "../features/home/components/FeaturesHighlights";
import Testimonials from "../features/home/components/Testimonials";
import BrandLogos from "../features/home/components/BrandLogos";
import NewsletterSection from "../features/home/components/NewsletterSection";
import { productDataService } from "../services/productDataService";

// --- PREMIMUM GALLERY COMPONENTS ---
const ArchiveItem = ({ item, colIdx, i }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: (colIdx * 0.1) + (i * 0.1),
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{
        scale: 1.02,
        zIndex: 10,
        transition: { duration: 0.4 }
      }}
      className={`relative overflow-hidden rounded-[2.5rem] group cursor-none shadow-2xl shadow-slate-200/50 hover:shadow-emerald-500/20 transition-all duration-700 ${item.aspect}`}
      style={{ perspective: "1000px" }}
    >
      {/* Floating Effect Wrapper */}
      <motion.div
        animate={{
          y: [0, -8, 0],
          rotateX: [0, 1, 0],
          rotateY: [0, -1, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: (colIdx + i) * 0.5
        }}
        className="w-full h-full relative"
      >
        <motion.img
          src={item.url}
          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 contrast-125 group-hover:contrast-100"
          alt="Archive Shot"
        />

        {/* Industrial Glass Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8 md:p-12">
          <div className="space-y-3 translate-y-8 group-hover:translate-y-0 transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1)">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-emerald-500" />
              <span className="text-[9px] font-black text-emerald-400 uppercase tracking-[0.3em]">REF_{1024 + (colIdx * 10) + i}</span>
            </div>
            <h4 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter leading-none">
              Tactical <br /> <span className="text-emerald-500">Integration.</span>
            </h4>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-relaxed max-w-[200px]">
              Biometric Sync Protocol v4.0 Active
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ColumnSection = ({ column, colIdx }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], column.parallax);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="space-y-4 md:gap-12 flex flex-col"
    >
      {column.items.map((item, i) => (
        <ArchiveItem key={i} item={item} colIdx={colIdx} i={i} />
      ))}
    </motion.div>
  );
};

// Newsletter Form Component
const TransmissionForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage({ type: "error", text: "Please enter your email" });
      return;
    }

    if (!validateEmail(email)) {
      setMessage({ type: "error", text: "Please enter a valid email" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // TODO: Replace with actual API endpoint
      // For now, simulate API call with localStorage
      const subscribers = JSON.parse(localStorage.getItem("newsletter_subscribers") || "[]");
      
      if (subscribers.includes(email)) {
        setMessage({ type: "warning", text: "This email is already subscribed" });
      } else {
        subscribers.push(email);
        localStorage.setItem("newsletter_subscribers", JSON.stringify(subscribers));
        setMessage({ type: "success", text: "Successfully joined the transmission! Check your email for confirmation." });
        setEmail("");
      }
    } catch {
      setMessage({ type: "error", text: "Failed to subscribe. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="max-w-xl mx-auto space-y-4"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >    
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <input
          type="email"
          placeholder="AUTHENTICATE EMAIL..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-10 py-6 rounded-full bg-white/5 border border-white/10 text-white font-bold tracking-widest text-xs focus:ring-2 focus:ring-emerald-500 transition-all outline-none focus:bg-white/10 placeholder-slate-500"
          disabled={loading}
        />
        <Button 
          variant="primary" 
          className="rounded-full px-12" 
          type="submit"
          disabled={loading}
        >
          {loading ? "Initiating..." : "Initiate"}
        </Button>
      </form>

      {/* Feedback Message */}
      {message.text && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-sm font-semibold tracking-wide ${
            message.type === "success" 
              ? "text-emerald-400" 
              : message.type === "error"
                ? "text-red-400"
                : "text-amber-400"
          }`}
        >
          {message.text}
        </motion.div>
      )}
    </motion.div>
  );
};

const Home = () => {
  useSEO({
    title: 'VANGUARD | Premium Tactical Archive - Home',
    description: 'Explore VANGUARD premium tactical gear, high-performance equipment, and innovative products. New arrivals, best sellers, and exclusive tactical solutions for professionals.',
    keywords: 'tactical gear, premium equipment, new arrivals, best sellers, tactical solutions',
    ogTitle: 'VANGUARD - Premium Tactical Archive',
    ogDescription: 'Discover premium tactical gear and innovative equipment for professionals.',
    canonical: 'https://vanguard.store/',
  });

  const navigate = useNavigate();
  const globeRef = useRef(null);
  const globeTimersRef = useRef({ focus: null, reset: null });
  const [selectedCity, setSelectedCity] = useState(null);

  const globeCities = useMemo(() => ([
    {
      code: "tokyo",
      label: "Tokyo",
      region: "APAC",
      lat: 35.6762,
      lng: 139.6503,
      altitude: 1.05,
      summary: "Tokyo command node",
    },
    {
      code: "berlin",
      label: "Berlin",
      region: "EUROPE",
      lat: 52.52,
      lng: 13.405,
      altitude: 1.08,
      summary: "Berlin archive hub",
    },
    {
      code: "brooklyn",
      label: "Brooklyn",
      region: "NORTH AMERICA",
      lat: 40.6782,
      lng: -73.9442,
      altitude: 1.1,
      summary: "Brooklyn transit line",
    },
    {
      code: "seoul",
      label: "Seoul",
      region: "APAC",
      lat: 37.5665,
      lng: 126.978,
      altitude: 1.06,
      summary: "Seoul relay station",
    },
  ]), []);

  const defaultGlobeView = useMemo(() => ({
    lat: 16,
    lng: 12,
    altitude: 1.72,
  }), []);
  const heroSlides = [
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&q=80&w=2070",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2070",
  ];

  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 12000);

    return () => window.clearInterval(interval);
  }, [heroSlides.length]);

  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const allProducts = productDataService.getAll();
  const deploymentProducts = allProducts.filter((product) => product.isFeatured).slice(0, 3);
  const formatPrice = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  const activeGlobeCity = selectedCity
    ? globeCities.find((city) => city.code === selectedCity)
    : null;

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) {
      return;
    }

    globe.pointOfView(defaultGlobeView, 0);

    const controls = globe.controls?.();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.22;
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.rotateSpeed = 0.7;
    }

    return () => {
      if (globeTimersRef.current.focus) {
        window.clearTimeout(globeTimersRef.current.focus);
      }
      if (globeTimersRef.current.reset) {
        window.clearTimeout(globeTimersRef.current.reset);
      }
    };
  }, [defaultGlobeView]);

  const focusGlobeCity = (city) => {
    const globe = globeRef.current;
    if (!globe) {
      return;
    }

    if (globeTimersRef.current.focus) {
      window.clearTimeout(globeTimersRef.current.focus);
    }
    if (globeTimersRef.current.reset) {
      window.clearTimeout(globeTimersRef.current.reset);
    }

    setSelectedCity(city.code);

    const controls = globe.controls?.();
    if (controls) {
      controls.autoRotate = false;
    }

    globe.pointOfView(
      {
        lat: city.lat,
        lng: city.lng,
        altitude: city.altitude,
      },
      1800
    );

    globeTimersRef.current.focus = window.setTimeout(() => {
      globe.pointOfView(defaultGlobeView, 2200);

      globeTimersRef.current.reset = window.setTimeout(() => {
        setSelectedCity(null);
        if (controls) {
          controls.autoRotate = true;
        }
      }, 2600);
    }, 2600);
  };

  const openProduct = (slug) => {
    navigate(`/product/${slug}`);
  };

  return (
    <div className="bg-white overflow-hidden relative">
      {/* GLOBAL SYSTEM OVERLAYS */}
      <div className="noise-overlay" />

      {/* SCROLL PROGRESS INDICATOR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 z-[100] origin-left shadow-[0_0_15px_#10b981]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* 1. CINEMATIC HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        <motion.div
          style={{ y: y1 }}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          {heroSlides.map((src, index) => (
            <motion.div
              key={src}
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: index === activeHeroSlide ? 1 : 0,
                scale: index === activeHeroSlide ? 1.05 : 1.1,
              }}
              transition={{
                duration: 2.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <img
                src={src}
                alt="Technical Background"
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/65 to-slate-950" />
          <div className="absolute inset-0 bg-slate-950/20 mix-blend-multiply" />
        </motion.div>

        <div className="container-custom relative z-10 text-center space-y-12"> 
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
          >
            <HiOutlineBolt size={14} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Protocol v4.0 Active</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-8xl md:text-[12rem] font-black text-white leading-[0.85] uppercase italic tracking-tighter"
          >
            Vanguard<br />
            <span className="text-emerald-500 drop-shadow-[0_0_50px_rgba(16,185,129,0.4)]">Archives.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto italic leading-relaxed"
          >
            High-performance technical gear engineered for the urban frontier.  
            Merging laboratory-grade utility with elite street aesthetic.       
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button as={Link} to="/shop" variant="primary" className="rounded-full px-12 h-20 shadow-emerald-500/20 overflow-hidden group">
              <span className="relative z-10 flex items-center gap-3">Access Archive <HiOutlineArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
            </Button>
            <Button as={Link} to="/about" variant="outline" className="rounded-full px-12 h-20 border-white/20 text-white hover:bg-emerald-500 hover:text-slate-950 hover:border-emerald-500 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
              Intel Report
            </Button>

          </motion.div>
        </div>

        <div className="absolute bottom-10 left-10 hidden xl:block space-y-4">  
          {[
            { label: "Stability", val: "99.9%" },
            { label: "Deployment", val: "Instant" },
            { label: "Encryption", val: "AES-256" }
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-white/40">
              <div className="w-10 h-[1px] bg-emerald-500" />
              <span>{stat.label}: <span className="text-white">{stat.val}</span></span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. TECHNICAL MARQUEE */}
      <section className="bg-slate-950 py-10 border-y border-white/5 overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee gap-20 items-center">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-10 text-white/20 text-[10px] font-black uppercase tracking-[1em]">
              <span>Precision Machined</span>
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Tactical Grade</span>
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Vanguard System</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CORE PILLARS */}
      <section className="py-40 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black text-slate-950 uppercase italic tracking-tighter">Core Pillars</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {[
              { icon: HiOutlineCpuChip, title: "Precision Crafted", desc: "Every module is engineered with sub-millimeter accuracy for peak performance." },    
              { icon: HiOutlineShieldCheck, title: "Tactical Resilience", desc: "Materials tested in extreme urban environments to ensure lifelong durability." },
              { icon: HiOutlineGlobeAlt, title: "Universal Sync", desc: "Seamlessly integrated into any technical rotation, from baseline to peak loadout." }   
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="space-y-8 group"
              >
                <motion.div 
                  className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-900 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500"
                  whileHover={{ scale: 1.08 }}
                >
                  <item.icon size={32} />
                </motion.div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium italic">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SELECTION GRID */}
      <section className="py-32 bg-slate-50 relative z-10">
        <div className="container-custom grid grid-cols-1 md:grid-cols-4 gap-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="md:col-span-2 relative overflow-hidden rounded-[3rem] group"
          >
            <img src="https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Outerwear" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-80" />
            <div className="absolute bottom-10 left-10 space-y-2 text-white">   
              <span className="text-emerald-400 text-[9px] font-black uppercase tracking-widest">Advanced Tech</span>
              <h4 className="text-5xl font-black uppercase italic tracking-tighter">Outerwear</h4>
            </div>
          </motion.div>

          <div className="md:col-span-2 grid grid-cols-1 gap-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="aspect-square md:aspect-auto md:h-[380px] relative overflow-hidden rounded-[3rem] group"
            >
              <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Footwear" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-80" />
              <div className="absolute bottom-10 left-10 space-y-2 text-white"> 
                <span className="text-emerald-400 text-[9px] font-black uppercase tracking-widest">Urban Grade</span>
                <h4 className="text-4xl font-black uppercase italic tracking-tighter">Footwear</h4>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="aspect-square md:aspect-auto md:h-[380px] relative overflow-hidden rounded-[3rem] group"
            >
              <img src="https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Accessories" />      
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-80" />
              <div className="absolute bottom-10 left-10 space-y-2 text-white"> 
                <span className="text-emerald-400 text-[9px] font-black uppercase tracking-widest">Essential Tooling</span>
                <h4 className="text-4xl font-black uppercase italic tracking-tighter">Accessories</h4>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. X-RAY ANALYSIS (NEW CREATIVE SECTION) */}
      <section className="relative z-0 mt-[-1px] overflow-hidden bg-slate-950 py-28 md:py-36 border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_30%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
            <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-32">
              <motion.div 
                className="space-y-5 max-w-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-[9px] font-black uppercase tracking-[0.45em] text-emerald-400">
                  Internal Breakdown
                </span>
                <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.9] text-white">
                  X-RAY <span className="text-emerald-500 drop-shadow-[0_0_20px_rgba(16,185,129,0.35)]">Analysis.</span>
                </h2>
                <p className="max-w-lg text-base md:text-lg leading-relaxed text-slate-400 italic">
                  A closer read on the architecture, materials, and modular logic behind the collection. Built for clarity, endurance, and precision under pressure.
                </p>
              </motion.div>

              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {[
                  { label: "Signal", value: "99.8%" },
                  { label: "Layers", value: "03" },
                  { label: "Ports", value: "08" },
                ].map((metric) => (
                  <div key={metric.label} className="rounded-[1.75rem] border border-white/8 bg-white/5 p-5 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_rgba(0,0,0,0.25)]">
                    <div className="text-[8px] font-black uppercase tracking-[0.45em] text-emerald-500/80">{metric.label}</div>
                    <div className="mt-3 text-2xl font-black uppercase italic tracking-tighter text-white">{metric.value}</div>
                  </div>
                ))}
              </motion.div>

              <div className="space-y-4">
                {[
                  {
                    icon: HiOutlineIdentification,
                    title: "Biometric Integration",
                    desc: "Adaptive sensor mapping reacts to thermal shifts, posture changes, and movement intensity in real time.",
                  },
                  {
                    icon: HiOutlineWrenchScrewdriver,
                    title: "Modular Architecture",
                    desc: "Expandable utility points and structural interfaces allow the system to scale without visual clutter.",
                  },
                  {
                    icon: HiOutlineBeaker,
                    title: "Synthetic Membranes",
                    desc: "A high-density shell stack improves resistance while preserving a sharp, lightweight silhouette.",
                  },
                ].map((feat, i) => (
                  <motion.div
                    key={feat.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 md:p-6 backdrop-blur-xl transition-all duration-500 hover:border-emerald-500/25 hover:bg-white/[0.06] hover:shadow-[0_0_0_1px_rgba(16,185,129,0.08),0_20px_60px_rgba(0,0,0,0.35)]"
                  >
                    <div className="flex items-start gap-5">
                      <div className="relative shrink-0">
                        <div className="absolute -inset-2 rounded-2xl bg-emerald-500/20 blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/20 bg-slate-950 text-emerald-400 shadow-[0_0_0_1px_rgba(16,185,129,0.08)] transition-all duration-500 group-hover:border-emerald-500/40 group-hover:bg-emerald-500 group-hover:text-slate-950">
                          <feat.icon size={23} />
                        </div>
                      </div>

                      <div className="min-w-0 flex-1 space-y-2 pt-1">
                        <h4 className="text-base md:text-lg font-black uppercase italic tracking-tighter text-white transition-colors duration-500 group-hover:text-emerald-200">
                          {feat.title}
                        </h4>
                        <p className="max-w-xl text-sm md:text-[15px] leading-relaxed text-slate-400 transition-colors duration-500 group-hover:text-slate-300">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 relative">
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-[2.75rem] border border-white/10 bg-slate-900 shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.18),transparent_50%)] opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-slate-950/80" />
                <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:48px_48px] mix-blend-overlay" />

                <div className="relative aspect-[4/5] md:aspect-[13/14]">
                  <motion.img
                    src="https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&q=80&w=2000"
                    alt="Tech Diagram"
                    className="h-full w-full object-cover grayscale-[0.85] contrast-125 brightness-75"
                    initial={{ scale: 1.08 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  />

                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent"
                    animate={{ opacity: [0.35, 1, 0.35], x: [0, 24, 0] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                  />

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_28%,rgba(2,6,23,0.42)_100%)]" />

                  <div className="absolute inset-0">
                    {[
                      { top: "18%", left: "20%", label: "Thermal Lining", width: "w-40" },
                      { top: "39%", left: "58%", label: "Pouch Node P01", width: "w-44" },
                      { top: "67%", left: "28%", label: "Elastic Cinch", width: "w-36" },
                    ].map((pin, i) => (
                      <motion.div
                        key={pin.label}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ delay: 0.2 + i * 0.15, duration: 0.8 }}
                        animate={{ y: [0, -6, 0] }}
                        style={{ top: pin.top, left: pin.left }}
                        className="absolute z-20"
                      >
                        <div className="flex flex-col items-center">
                          <div className="relative flex items-center justify-center">
                            <div className="absolute h-8 w-8 rounded-full border border-emerald-400/40 bg-emerald-400/10 blur-[1px]" />
                            <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_24px_rgba(16,185,129,0.95)]" />
                          </div>
                          <div className="h-12 w-px bg-gradient-to-b from-emerald-400 to-transparent" />
                          <div className={`${pin.width} rounded-full border border-emerald-400/25 bg-slate-950/80 px-4 py-2 text-center text-[8px] font-black uppercase tracking-[0.45em] text-emerald-300 backdrop-blur-md shadow-[0_12px_30px_rgba(0,0,0,0.35)]`}>
                            {pin.label}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="absolute inset-0 rounded-[2.75rem] ring-1 ring-inset ring-white/10" />
                  <div className="absolute inset-6 rounded-[2.25rem] ring-1 ring-inset ring-emerald-500/10" />

                  <motion.div
                    className="absolute bottom-6 right-6 rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="text-[8px] font-black uppercase tracking-[0.45em] text-slate-400">Overlay State</div>
                    <div className="mt-2 text-sm font-black uppercase italic tracking-tighter text-white">X-Ray Live</div>
                  </motion.div>
                </div>
              </motion.div>

              <div className="pointer-events-none absolute -inset-10 bg-emerald-500/10 blur-[120px] opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURED DROP */}
      <section className="py-40 bg-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square overflow-hidden rounded-[4rem] group"
          >
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1999"
              alt="Featured Gear"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.5em]">Current Priority</span>
            <h2 className="text-7xl font-black text-slate-950 uppercase italic tracking-tighter leading-none">
              The <span className="text-emerald-500">Aethel</span> <br />Module.
            </h2>
            <p className="text-slate-500 text-xl font-medium italic leading-relaxed">
              Introducing the pinnacle of the Archive collections. Limited release technical essentials for high-frequency urban movement.
            </p>
            <Button
              as={Link}
              to="/shop"
              variant="transparent"
              className="group inline-flex min-h-16 items-center rounded-full border border-emerald-500 bg-emerald-500 px-6 pr-4 text-[10px] font-black uppercase tracking-[0.28em] text-slate-950 shadow-[0_20px_50px_rgba(16,185,129,0.3)] transition-all duration-300 hover:border-emerald-600 hover:bg-emerald-600 hover:shadow-[0_24px_60px_rgba(16,185,129,0.4)] active:translate-y-[1px] active:scale-[0.99]"
            >
              <span className="inline-flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-950/20 bg-slate-950/10 text-slate-950 transition-all duration-300 group-hover:border-slate-950/40 group-hover:bg-slate-950 group-hover:text-emerald-400">
                  <HiOutlineFingerPrint size={18} />
                </span>
                <span className="leading-none text-slate-950 transition-colors duration-300 group-hover:text-slate-900">
                  Inspect Specs
                </span>
              </span>

              <span className="ml-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-950/10 bg-slate-950/10 text-slate-950 transition-all duration-300 group-hover:border-slate-950/20 group-hover:bg-slate-950 group-hover:text-emerald-400">
                <HiOutlineArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 7. VERTICAL MODULES (SCROLL PARALLAX) */}
      <section className="py-40 bg-slate-50 overflow-hidden">
        <div className="container-custom flex flex-col items-center text-center space-y-20">
          <div className="space-y-6">
            <span className="text-emerald-600 text-[9px] font-black uppercase tracking-[0.5em]">Collection Matrix</span>
            <h2 className="text-6xl md:text-8xl font-black text-slate-950 uppercase italic tracking-tighter leading-none">Modular Deployment</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
            {deploymentProducts.map((product, i) => (
              <motion.article
                key={product.slug}
                whileHover={{ y: -20 }}
                whileTap={{ scale: 0.99 }}
                role="link"
                tabIndex={0}
                aria-label={`Open product details for ${product.name}`}
                onClick={() => openProduct(product.slug)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openProduct(product.slug);
                  }
                }}
                className="relative aspect-[4/5] rounded-[3rem] overflow-hidden group shadow-2xl shadow-slate-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
              >
                <img src={product.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={product.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute inset-x-8 bottom-8 flex items-end justify-between gap-6 text-left">
                  <div className="space-y-2 max-w-[70%]">
                    <span className="text-emerald-400 font-black text-[9px] uppercase tracking-widest">{`Deployment 0${i + 1}`}</span>
                    <h4 className="text-3xl font-black text-white italic tracking-tighter leading-[0.9]">{product.name}</h4>
                    <div className="flex flex-wrap items-center gap-3 text-[9px] font-black uppercase tracking-[0.35em] text-white/50">
                      <span>{product.category}</span>
                      <span className="w-1 h-1 rounded-full bg-emerald-400/80" />
                      <span>{formatPrice(product.price)}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      openProduct(product.slug);
                    }}
                    aria-label={`View details for ${product.name}`}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-emerald-500/35 hover:bg-emerald-500 hover:text-slate-950 active:scale-95"
                  >
                    <HiOutlineArrowUpRight size={18} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FOUNDER'S INTEL */}
      <section className="py-40 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">       
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover grayscale" alt="Intel BG" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto space-y-16 text-center">
            <HiOutlineCubeTransparent size={60} className="mx-auto text-emerald-500" />
            <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-tight">
              "We don't manufacture clothing. We develop biological housing systems for the modern nomad environment."
            </h2>
            <div className="space-y-4">
              <p className="text-slate-400 font-bold uppercase tracking-[1em] text-xs">Aura X Vanguard — Protocol Lead</p>
              <div className="w-20 h-[1px] bg-emerald-500 mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* 9. ARCHIVE COMPARISON (TECH SPECS TABLE) */}
      <section className="bg-white py-28 md:py-36">
        <div className="container-custom space-y-14 md:space-y-18">
          <div className="flex flex-col gap-6 border-b border-slate-200 pb-8 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4 max-w-3xl">
              <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-[9px] font-black uppercase tracking-[0.45em] text-emerald-600">
                Tech Matrix
              </span>
              <div className="space-y-3">
                <h2 className="text-5xl md:text-6xl font-black text-slate-950 uppercase italic tracking-tighter leading-[0.92]">
                  System Selection
                </h2>
                <p className="max-w-2xl text-sm md:text-base leading-relaxed text-slate-500">
                  Compare the core operational systems side by side across performance, modularity, protection, and deployment behavior.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 md:min-w-[360px]">
              {[
                { label: "Systems", value: "4" },
                { label: "Metrics", value: "10" },
                { label: "Coverage", value: "360°" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 text-center shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
                  <div className="text-[8px] font-black uppercase tracking-[0.42em] text-slate-400">{stat.label}</div>
                  <div className="mt-2 text-2xl font-black uppercase italic tracking-tighter text-slate-950">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
            <table className="w-full min-w-[1080px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="w-[22%] px-8 py-6 text-[10px] font-black uppercase tracking-[0.45em] text-slate-400">
                    Parameter
                  </th>
                  {[
                    { name: "Proto-01", note: "Base" },
                    { name: "Archive Elite", note: "Best Value", featured: true },
                    { name: "Nomad Core", note: "Travel" },
                    { name: "Aethel Module", note: "Premium" },
                  ].map((column) => (
                    <th
                      key={column.name}
                      className={`px-8 py-6 text-center ${column.featured ? 'bg-emerald-500/6' : ''}`}
                    >
                      <div className="space-y-2">
                        <div className={`text-2xl font-black uppercase italic tracking-tighter ${column.featured ? 'text-emerald-600' : 'text-slate-950'}`}>
                          {column.name}
                        </div>
                        <div className={`text-[9px] font-black uppercase tracking-[0.45em] ${column.featured ? 'text-emerald-500' : 'text-slate-400'}`}>
                          {column.note}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {[
                  { param: "Atmospheric Rating", p1: "7.5k", p2: "20k+", p3: "12k", p4: "24k+" },
                  { param: "Weight (g)", p1: "450", p2: "310", p3: "520", p4: "295" },
                  { param: "Utility Ports", p1: "02", p2: "08", p3: "04", p4: "10" },
                  { param: "Body Sync", p1: "Standard", p2: "Adaptive", p3: "Static", p4: "Predictive" },
                  { param: "Thermal Layer", p1: "Single", p2: "Triple", p3: "Double", p4: "Triple+" },
                  { param: "Impact Resistance", p1: "B+", p2: "A+", p3: "A", p4: "A++" },
                  { param: "Charge Time", p1: "6h", p2: "3.5h", p3: "5h", p4: "2.9h" },
                  { param: "Mobility Score", p1: "7.4", p2: "9.6", p3: "8.2", p4: "9.8" },
                  { param: "Best For", p1: "Daily base use", p2: "All-round premium", p3: "Transit & travel", p4: "High-frequency ops" },
                  { param: "Price Tier", p1: "$750", p2: "$1,450", p3: "$980", p4: "$2,100" },
                ].map((row, index) => (
                  <tr key={row.param} className={`group transition-colors duration-300 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} hover:bg-emerald-500/[0.03]`}>
                    <td className="px-8 py-5 align-middle">
                      <div className="text-[10px] font-black uppercase italic tracking-[0.34em] text-slate-500">
                        {row.param}
                      </div>
                    </td>
                    {[row.p1, row.p2, row.p3, row.p4].map((value, valueIndex) => {
                      const featured = valueIndex === 1;

                      return (
                        <td
                          key={valueIndex}
                          className={`px-8 py-5 text-center align-middle ${featured ? 'bg-emerald-500/[0.05]' : ''}`}
                        >
                          <div className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-black uppercase tracking-tighter ${featured ? 'text-emerald-600' : 'text-slate-950'} ${featured ? 'bg-emerald-500/10 ring-1 ring-emerald-500/15' : 'bg-transparent'}`}>
                            {value}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 text-[9px] font-black uppercase tracking-[0.45em] text-slate-400 md:flex-row md:items-center md:justify-between">
            <span>Focused comparison across four operational systems</span>
            <span className="text-emerald-600">Archive Elite highlighted as the balanced reference build</span>
          </div>
        </div>
      </section>

      {/* 10. GLOBAL VANGUARD DEPLOYMENT (MAP) */}
      <section className="relative overflow-hidden bg-slate-950 py-40">
        <div className="absolute inset-0 opacity-10 blur-sm pointer-events-none">
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Global BG" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_top,rgba(16,185,129,0.12),transparent_30%),radial-gradient(circle_at_right_center,rgba(255,255,255,0.04),transparent_25%)]" />

        <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          <div className="space-y-12">
            <motion.div 
              className="space-y-4 max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.45em] text-emerald-500">
                Logistics Network
              </span>
              <h2 className="text-6xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-[0.92]">
                Global Network.
              </h2>
            </motion.div>

            <motion.p 
              className="max-w-xl text-lg md:text-xl italic font-medium leading-relaxed text-slate-400"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Our deployment infrastructure spans leading technical hubs globally. Tap a city to rotate the earth toward that node, zoom into the route, and then return to the default global orbit.
            </motion.p>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.24, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {globeCities.map((city) => {
                const isActive = activeGlobeCity?.code === city.code;

                return (
                  <button
                    key={city.code}
                    type="button"
                    onClick={() => focusGlobeCity(city)}
                    className={`group relative flex items-center justify-between gap-4 rounded-[1.5rem] border px-5 py-5 text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${isActive ? 'border-emerald-500/40 bg-emerald-500/10 shadow-[0_16px_40px_rgba(16,185,129,0.12)]' : 'border-white/8 bg-white/5 hover:border-emerald-500/20 hover:bg-white/8'}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 h-2.5 w-2.5 rounded-full transition-all duration-300 ${isActive ? 'bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.9)]' : 'bg-white/30 group-hover:bg-emerald-400'}`} />
                      <div className="space-y-1">
                        <div className={`text-lg font-black uppercase italic tracking-tighter transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/80'}`}>
                          {city.label}
                        </div>
                        <div className="text-[8px] font-black uppercase tracking-[0.45em] text-slate-500">
                          {city.region}
                        </div>
                        <div className="text-[9px] font-medium uppercase tracking-[0.35em] text-slate-400">
                          {city.summary}
                        </div>
                      </div>
                    </div>

                    <HiOutlineArrowUpRight size={18} className={`shrink-0 transition-all duration-300 ${isActive ? 'text-emerald-400' : 'text-white/30 group-hover:text-emerald-400'}`} />
                  </button>
                );
              })}
            </motion.div>

            <motion.div 
              className="flex flex-wrap items-center gap-4 pt-2 text-[9px] font-black uppercase tracking-[0.45em] text-slate-500"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.36, duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
                Live route control
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white/30" />
                Auto orbit resumes after focus
              </span>
            </motion.div>
          </div>

          <div className="relative min-h-[680px] overflow-hidden rounded-[3rem] border border-white/10 bg-slate-900 shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.18),transparent_48%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_28%)]" />
            <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:56px_56px] mix-blend-overlay" />

            <div className="absolute left-6 top-6 z-20 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 backdrop-blur-xl">
              <div className="text-[8px] font-black uppercase tracking-[0.45em] text-emerald-500">Real-Time Globe</div>
              <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.3em] text-slate-400">Tap a city to route</div>
            </div>

            <div className="absolute right-6 top-6 z-20 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 backdrop-blur-xl text-right">
              <div className="text-[8px] font-black uppercase tracking-[0.45em] text-slate-400">Selected Node</div>
              <div className="mt-1 text-[10px] font-black uppercase italic tracking-tighter text-white">
                {activeGlobeCity ? activeGlobeCity.label : 'Global Orbit'}
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 lg:p-8">
              <div className="relative w-full max-w-[440px] aspect-square flex items-center justify-center">
                <Globe
                  ref={globeRef}
                  className="w-full h-full z-10"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    display: 'block',
                    transformOrigin: 'center center',
                    margin: '0 auto'
                  }}
                  backgroundColor="rgba(0,0,0,0)"
                  globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                  bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
                  showAtmosphere
                  atmosphereColor="#10b981"
                  atmosphereAltitude={0.18}
                  showGraticules
                  graticuleLineColor="rgba(255,255,255,0.12)"
                  pointsData={globeCities}
                  pointLat="lat"
                  pointLng="lng"
                  pointAltitude={(point) => (point.code === activeGlobeCity?.code ? 0.06 : 0.02)}
                  pointRadius={(point) => (point.code === activeGlobeCity?.code ? 0.32 : 0.22)}
                  pointResolution={6}
                  pointColor={(point) => (point.code === activeGlobeCity?.code ? '#10b981' : 'rgba(255,255,255,0.72)')}
                  pointLabel={(point) => `${point.label} · ${point.region}`}
                  ringsData={activeGlobeCity ? [activeGlobeCity] : []}
                  ringLat="lat"
                  ringLng="lng"
                  ringColor={() => 'rgba(16,185,129,0.95)'}
                  ringMaxRadius={4}
                  ringPropagationSpeed={1.8}
                  ringRepeatPeriod={1400}
                  onPointClick={focusGlobeCity}
                  rendererConfig={{ antialias: true, alpha: true }}
                />
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_24%,rgba(2,6,23,0.18)_100%)]" />
            <div className="pointer-events-none absolute inset-0 rounded-[3rem] ring-1 ring-inset ring-white/10" />

            <div className="absolute left-6 bottom-6 z-20 max-w-sm rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4 backdrop-blur-xl">
              <div className="text-[8px] font-black uppercase tracking-[0.45em] text-slate-500">Route State</div>
              <div className="mt-2 text-sm font-black uppercase italic tracking-tighter text-white">
                {activeGlobeCity ? `${activeGlobeCity.label} locked` : 'Global view active'}
              </div>
              <div className="mt-2 text-[9px] font-medium uppercase tracking-[0.3em] text-slate-400">
                Slow orbit, focus zoom, auto return
              </div>
            </div>

            <div className="absolute right-6 bottom-6 z-20 grid gap-3 sm:grid-cols-2">
              {[
                { label: "Orbit", value: "Cinematic" },
                { label: "Mode", value: activeGlobeCity ? "Focused" : "Idle" },
              ].map((item) => (
                <div key={item.label} className="rounded-[1.25rem] border border-white/10 bg-slate-950/70 px-4 py-3 backdrop-blur-xl">
                  <div className="text-[8px] font-black uppercase tracking-[0.45em] text-slate-500">{item.label}</div>
                  <div className="mt-1 text-[10px] font-black uppercase italic tracking-tighter text-white">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 11. STREET ARCHIVES (LIVE 3D EDITORIAL GALLERY) */}
      <section className="py-40 bg-white relative overflow-hidden">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="container-custom space-y-24 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b-2 border-slate-950 pb-12">
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.6em]"
              >
                Visual Intelligence
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: 0.12, duration: 0.6 }}
                className="text-7xl md:text-8xl font-black text-slate-950 uppercase italic tracking-tighter leading-none"
              >
                Street <span className="text-emerald-500">Archives.</span>      
              </motion.h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 items-start">
            {[
              // COLUMN 1
              {
                parallax: [0, 0],
                items: [
                  { url: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=1000", aspect: "aspect-[3/5]" },
                  { url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1000", aspect: "aspect-square" }
                ]
              },
              // COLUMN 2
              {
                parallax: [0, -100],
                items: [
                  { url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1000", aspect: "aspect-square" },
                  { url: "https://images.unsplash.com/photo-1550928431-ee0ec6db30d3?auto=format&fit=crop&q=80&w=1000", aspect: "aspect-[3/4]" }
                ]
              },
              // COLUMN 3
              {
                parallax: [0, 80],
                items: [
                  { url: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=1000", aspect: "aspect-square" },
                  { url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000", aspect: "aspect-[4/5]" }
                ]
              },
              // COLUMN 4
              {
                parallax: [0, -40],
                items: [
                  { url: "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&q=80&w=1000", aspect: "aspect-[3/4]" },
                  { url: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80&w=1000", aspect: "aspect-square" }
                ]
              }
            ].map((column, colIdx) => (
              <ColumnSection key={colIdx} column={column} colIdx={colIdx} />    
            ))}
          </div>
        </div>
      </section>



      {/* 13. RESTRICTED PROTOCOLS (FAQ) */}
      <section className="relative overflow-hidden bg-white py-40">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.06),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.04),transparent_28%)]" />

        <div className="container-custom relative z-10 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20 items-start">
          <div className="space-y-10 lg:sticky lg:top-28">
            <div className="space-y-5 max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/8 px-4 py-2 text-[9px] font-black uppercase tracking-[0.45em] text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_14px_rgba(16,185,129,0.9)]" />
                Support System
              </span>
              <h2 className="text-6xl md:text-7xl font-black text-slate-950 uppercase italic tracking-tighter leading-[0.92]">
                Restricted <span className="text-emerald-500">Protocols.</span>
              </h2>
              <p className="text-slate-500 text-lg md:text-xl italic font-medium leading-relaxed max-w-lg">
                Authorized support for high-frequency gear maintenance, deployment queries, and controlled access workflows.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              {[
                { label: "Response", value: "24/7" },
                { label: "Coverage", value: "Global" },
              ].map((item) => (
                <div key={item.label} className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 px-5 py-5 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
                  <div className="text-[8px] font-black uppercase tracking-[0.45em] text-slate-400">{item.label}</div>
                  <div className="mt-3 text-2xl font-black uppercase italic tracking-tighter text-slate-950">{item.value}</div>
                </div>
              ))}
            </div>

          </div>

          <div className="rounded-[2.5rem] border border-slate-200/80 bg-slate-50/80 p-4 md:p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur-sm">
            <Accordion
              items={[
                { title: "Protocol 01: Shipping Logistics", content: "Global decentralized shipping nodes ensure delivery within 48-72 hours for all Archive members. Live tracking and route integrity remain active until handoff." },
                { title: "Protocol 02: Returns & Recalibration", content: "Unworn tactical gear can be returned for recalibration within 30 solar cycles. Authentication tags must remain intact for verification and re-issue." },
                { title: "Protocol 03: Security & Encryption", content: "All biological data and purchase metrics are encrypted using AES-256 standard and stored on private Vanguard servers with restricted access logging." },
                { title: "Protocol 04: Maintenance & Cleaning", content: "Laboratory-grade technical shells should be hand-washed with pH-neutral technical detergents only, then air-dried away from direct heat or UV exposure." }
              ]}
            />
          </div>
        </div>
      </section>

      {/* 15. VANGUARD VAULT (RELEASE ROADMAP) */}
      <section className="py-40 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-20 items-stretch">      
            <div className="md:w-1/3 space-y-10">
              <span className="text-emerald-600 text-[9px] font-black uppercase tracking-[0.5em]">Future Protocols</span>
              <h2 className="text-7xl font-black text-slate-950 uppercase italic tracking-tighter leading-none">The Vault.</h2>
              <p className="text-slate-500 text-lg italic leading-relaxed">A technical roadmap for the deployment of experimental hardware and archival accessories in the coming solar cycles.</p>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">    
              {[
                { phase: "Phase 01", date: "Q2 2026", task: "Biometric Shell Deployment", status: "Active" },
                { phase: "Phase 02", date: "Q3 2026", task: "Modular Core Interlink", status: "Testing" },
                { phase: "Phase 03", date: "Q4 2026", task: "Neural Mesh Fabrics", status: "Pending" },
                { phase: "Phase 04", date: "Q1 2027", task: "Atmospheric Seal V2", status: "Restricted" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 space-y-4 group transition-all duration-500 hover:border-emerald-500/20"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{item.phase}</span>
                    <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[8px] font-bold text-slate-400">{item.status}</span>
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">{item.task}</h4>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.date}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      
      {/* 14. TRANSMISSION (NEWSLETTER) */}
      <section className="py-40 bg-slate-950 relative overflow-hidden">
        <div className="container-custom text-center space-y-16 relative z-10 py-20">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.5em]">Network Access</span>
            <h2 className="text-6xl md:text-9xl font-black text-white uppercase italic tracking-tighter leading-none">
              Join the <br /><span className="text-emerald-500">Transmission.</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto italic">
              Get priority access to restricted drops, technical documentation, and experimental prototypes.
            </p>
          </motion.div>

          <TransmissionForm />
        </div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
      </section>
    </div>
  );
};

export default Home;