import React, { useRef } from "react";
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
  HiOutlineCamera,
  HiOutlineQuestionMarkCircle
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Accordion from "../components/ui/Accordion";

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

        {/* Corner Icon */}
        <div className="absolute top-8 right-8 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center scale-75 group-hover:scale-100">
          <HiOutlineCamera size={24} className="text-white" />
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

const Home = () => {

  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="bg-white overflow-hidden relative">
      {/* GLOBAL SYSTEM OVERLAYS */}
      <div className="noise-overlay" />

      {/* SCROLL PROGRESS INDICATOR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 z-[100] origin-left shadow-[0_0_15px_#10b981]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* SYSTEM HUD (TOP RIGHT) */}
      <div className="fixed top-24 right-10 z-[60] hidden xl:flex flex-col items-end gap-2 blend-soft-light mix-blend-difference pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="text-[8px] font-bold text-white uppercase tracking-widest opacity-40 italic">ARCHIVE_SYNC_ACTIVE</span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <div className="text-[8px] font-bold text-white uppercase tracking-widest opacity-40 italic">NODE: VANGUARD_TOKYO_01</div>
        <div className="text-[8px] font-bold text-white uppercase tracking-widest opacity-40 italic">STABILIZATION: 99.82%</div>
      </div>
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        <motion.div
          style={{ y: y1 }}
          className="absolute inset-0 z-0 opacity-40"
        >
          <img
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070"
            alt="Technical Background"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/60 to-slate-950" />
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

          <div className="absolute inset-0 z-[-1] flex items-center justify-center opacity-10 select-none overflow-hidden">
            <div className="text-[20rem] font-black text-white mix-blend-overlay rotate-12 blur-2xl">
              SYSTEM_4.0
            </div>
          </div>


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
            <Button as={Link} to="/about" variant="outline" className="rounded-full px-12 h-20 border-white/20 text-white hover:bg-emerald-500 hover:text-slate-950 hover:border-emerald-500 transition-premium">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {[
              { icon: HiOutlineCpuChip, title: "Precision Crafted", desc: "Every module is engineered with sub-millimeter accuracy for peak performance." },
              { icon: HiOutlineShieldCheck, title: "Tactical Resilience", desc: "Materials tested in extreme urban environments to ensure lifelong durability." },
              { icon: HiOutlineGlobeAlt, title: "Universal Sync", desc: "Seamlessly integrated into any technical rotation, from baseline to peak loadout." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-8 group"
              >
                <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-900 group-hover:bg-emerald-500 group-hover:text-white transition-premium">
                  <item.icon size={32} />
                </div>
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
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
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
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
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
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
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
      <section className="py-40 bg-slate-950 overflow-hidden relative z-0 mt-[-1px]">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-emerald-500 text-[9px] font-black uppercase tracking-[0.5em]">Internal Breakdown</span>
              <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter leading-none">
                X-RAY <span className="text-emerald-500">Analysis.</span>
              </h2>
            </div>

            <div className="space-y-10">
              {[
                { icon: HiOutlineIdentification, title: "Biometric Integration", desc: "Sensors that adapt to your body's thermal output in real-time." },
                { icon: HiOutlineWrenchScrewdriver, title: "Modular Architecture", desc: "Connect varying utility pouches and extensions with seamless ease." },
                { icon: HiOutlineBeaker, title: "Synthetic Membranes", desc: "Three-layer Gore-Tex Pro technical shell for peak atmospheric resistance." }
              ].map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-8 group"
                >
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-premium">
                    <feat.icon size={24} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-black text-white uppercase italic tracking-tighter">{feat.title}</h4>
                    <p className="text-slate-400 text-sm italic font-medium leading-relaxed">{feat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[3/4] overflow-hidden rounded-[4rem] border border-white/10"
            >
              <img src="https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover grayscale brightness-200 opacity-20" alt="Tech Diagram" />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />

              {/* Floating Labels */}
              {[
                { top: "20%", left: "30%", label: "Thermal Lining" },
                { top: "45%", left: "60%", label: "Tactical Pouch P01" },
                { top: "75%", left: "25%", label: "Elastic Cinch System" }
              ].map((pin, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
                  style={{ top: pin.top, left: pin.left }}
                  className="absolute z-20 flex flex-col items-center"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981]" />
                  <div className="w-[1px] h-10 bg-emerald-500" />
                  <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] font-black uppercase text-emerald-500 whitespace-nowrap">
                    {pin.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <div className="absolute -inset-10 bg-emerald-500/5 blur-[100px] pointer-events-none" />
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
            <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-premium" />
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
            <Button as={Link} to="/shop" className="rounded-full px-12 bg-slate-950 text-white group overflow-hidden relative border-none">
              <span className="relative z-10 flex items-center gap-3 group-hover:text-slate-950 transition-colors duration-500">Inspect Specs <HiOutlineFingerPrint size={20} /></span>
              <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
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
            {[
              { img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=1000", title: "MK-01", type: "Base Layer" },
              { img: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1000", title: "MK-02", type: "Utility Vest" },
              { img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1000", title: "MK-03", type: "Cargo System" }
            ].map((mod, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -20 }}
                className="relative aspect-[4/5] rounded-[3rem] overflow-hidden group shadow-2xl shadow-slate-200"
              >
                <img src={mod.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={mod.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 text-left space-y-1">
                  <span className="text-emerald-400 font-black text-[9px] uppercase tracking-widest">{mod.type}</span>
                  <h4 className="text-4xl font-black text-white italic tracking-tighter">{mod.title}</h4>
                </div>
                <Button variant="secondary" className="absolute bottom-10 right-10 w-12 h-12 rounded-full p-0 flex items-center justify-center shadow-lg border-none">
                  <HiOutlineArrowUpRight size={20} />
                </Button>
              </motion.div>
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
      <section className="py-40 bg-white">
        <div className="container-custom space-y-20">
          <div className="text-center space-y-4">
            <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.5em]">Tech Matrix</span>
            <h2 className="text-6xl font-black text-slate-950 uppercase italic tracking-tighter uppercase leading-none">System Selection</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b-2 border-slate-950">
                  <th className="py-10 text-[10px] font-black uppercase tracking-widest text-slate-400">Parameter</th>
                  <th className="py-10 text-2xl font-black uppercase italic tracking-tighter">Proto-01</th>
                  <th className="py-10 text-2xl font-black uppercase italic tracking-tighter text-emerald-500">Archive Elite</th>
                  <th className="py-10 text-2xl font-black uppercase italic tracking-tighter">Nomad Core</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { param: "Atmospheric Rating", p1: "7.5k", p2: "20k+", p3: "12k" },
                  { param: "Weight (g)", p1: "450", p2: "310", p3: "520" },
                  { param: "Utility Ports", p1: "02", p2: "08", p3: "04" },
                  { param: "Body Sync", p1: "Standard", p2: "Adaptive", p3: "Static" }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 group hover:bg-slate-50 transition-colors">
                    <td className="py-8 font-bold uppercase italic tracking-tight text-slate-500">{row.param}</td>
                    <td className="py-8 font-black uppercase tracking-tighter">{row.p1}</td>
                    <td className="py-8 font-black uppercase tracking-tighter text-emerald-600">{row.p2}</td>
                    <td className="py-8 font-black uppercase tracking-tighter">{row.p3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 10. GLOBAL VANGUARD DEPLOYMENT (MAP) */}
      <section className="py-40 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 blur-sm pointer-events-none">
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Global BG" />
        </div>
        <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.5em]">Logistics Network</span>
              <h2 className="text-7xl font-black text-white uppercase italic tracking-tighter leading-none">Global Network.</h2>
            </div>
            <p className="text-slate-400 text-xl italic font-medium leading-relaxed">
              Our deployment infrastructure spans leading technical hubs globally. Priority shipping routed through secure Vanguard nodes in under 48 hours.
            </p>
            <div className="grid grid-cols-2 gap-10">
              {["Tokyo-01", "Berlin-IX", "Brooklyn-04", "Seoul-Core"].map((city) => (
                <div key={city} className="flex items-center gap-4 text-white hover:text-emerald-500 transition-colors cursor-crosshair">
                  <HiOutlineMapPin size={24} className="text-emerald-500" />
                  <span className="text-xs font-black uppercase tracking-widest">{city}</span>
                </div>
              ))}
            </div>
            <Button variant="secondary" className="rounded-full px-12 mt-10 shadow-lg">Locate Terminal</Button>
          </div>

          <div className="relative aspect-square flex items-center justify-center">
            {/* Main Glow Rings */}
            <div className="absolute inset-0 border-[2px] border-emerald-500/10 rounded-full animate-pulse-slow" />
            <div className="absolute inset-10 border-[1px] border-white/5 rounded-full" />
            <div className="absolute inset-20 border-[1px] border-white/5 rounded-full" />

            <div className="relative flex items-center justify-center">
              {/* Ping Animations */}
              <div className="absolute w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_50px_#10b981] animate-ping" />
              <div className="absolute w-1 h-1 rounded-full bg-emerald-500" />
              <div className="absolute w-40 h-40 border border-emerald-500/20 rounded-full animate-ping" style={{ animationDuration: '4s' }} />

              {/* The Vanguard Node Logo */}
              <div className="relative z-10 group-hover:scale-110 transition-transform duration-1000">
                <HiOutlineCubeTransparent size={180} className="text-emerald-500/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <HiOutlineGlobeAlt size={100} className="text-white/20 animate-pulse-slow" />
                </div>
              </div>
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
                viewport={{ once: true }}
                className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.6em]"
              >
                Visual Intelligence
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-7xl md:text-8xl font-black text-slate-950 uppercase italic tracking-tighter leading-none"
              >
                Street <span className="text-emerald-500">Archives.</span>
              </motion.h2>
            </div>
            <Button variant="secondary" className="rounded-full px-12 h-16 border-2 border-slate-950 hover:bg-slate-950 hover:text-white transition-all duration-500">
              Access All Captures
            </Button>
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
      <section className="py-40 bg-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.5em]">Support System</span>
              <h2 className="text-6xl font-black text-slate-950 uppercase italic tracking-tighter leading-none uppercase">Restricted Protocols.</h2>
            </div>
            <p className="text-slate-500 text-xl italic font-medium leading-relaxed max-w-lg">
              Authorized support for high-frequency gear maintenance and deployment queries.
            </p>
            <Button variant="primary" className="rounded-full px-12 bg-slate-950 text-white hover:bg-emerald-500 hover:text-slate-950 border-none transition-premium">Direct Terminal Access</Button>
          </div>

          <div>
            <Accordion
              items={[
                { title: "Protocol 01: Shipping Logistics", content: "Global decentralized shipping nodes ensure delivery within 48-72 hours for all Archive members." },
                { title: "Protocol 02: Returns & Recalibration", content: "Unworn tactical gear can be returned for recalibration within 30 solar cycles. Authentication tags must remain intact." },
                { title: "Protocol 03: Security & Encryption", content: "All biological data and purchase metrics are encrypted using AES-256 standard and stored on private Vanguard servers." },
                { title: "Protocol 04: Maintenance & Cleaning", content: "Laboratory-grade technical shells should be hand-washed with pH-neutral technical detergents only." }
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
                  className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 space-y-4 group transition-premium hover:border-emerald-500/20"
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

      {/* 16. SYSTEM ARCHITECTURE (VISUAL BLUEPRINT) */}
      <section className="py-40 bg-slate-900 relative overflow-hidden">
        <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.5em]">System Architecture</span>
            <h2 className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none">Core Engineering.</h2>
            <div className="space-y-6">
              {[
                "Advanced Thermal Regulation (ATR-4)",
                "Integrated Utility Pouching (IUP)",
                "Reinforced Modular Seams (RMS)",
                "Atmospheric Resistance Grade-01"
              ].map((spec, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-10 h-[1px] bg-emerald-500 group-hover:w-20 transition-all" />
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-xs group-hover:text-white transition-colors">{spec}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              className="w-[600px] h-[600px] border border-white/5 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
              className="w-[400px] h-[400px] border border-emerald-500/10 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
            <div className="relative z-10 p-10 bg-slate-950/80 backdrop-blur-3xl rounded-[4rem] border border-white/10 shadow-3xl">
              <img src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=1000" className="w-full h-96 object-cover rounded-[3rem] opacity-40 grayscale" alt="Architecture" />
              <div className="absolute inset-x-20 bottom-20 h-1 bg-emerald-500/20" />
            </div>
          </div>
        </div>
      </section>

      {/* 14. TRANSMISSION (NEWSLETTER) */}
      <section className="py-40 bg-slate-950 relative overflow-hidden">
        <div className="container-custom text-center space-y-16 relative z-10 py-20">
          <div className="space-y-6">
            <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.5em]">Network Access</span>
            <h2 className="text-6xl md:text-9xl font-black text-white uppercase italic tracking-tighter leading-none">
              Join the <br /><span className="text-emerald-500">Transmission.</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto italic">
              Get priority access to restricted drops, technical documentation, and experimental prototypes.
            </p>
          </div>

          <div className="max-w-xl mx-auto flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="AUTHENTICATE EMAIL..."
              className="flex-1 px-10 py-6 rounded-full bg-white/5 border border-white/10 text-white font-bold tracking-widest text-xs focus:ring-2 focus:ring-emerald-500 transition-all outline-none focus:bg-white/10"
            />
            <Button variant="primary" className="rounded-full px-12">
              Initiate
            </Button>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
      </section>
    </div>
  );
};

export default Home;


