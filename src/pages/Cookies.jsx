import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineInformationCircle } from 'react-icons/hi2';
import { useSEO } from '../hooks/useSEO';

const Cookies = () => {
  useSEO({
    title: 'Cookie Policy - VANGUARD',
    description: 'VANGUARD Cookie Policy - Understand how we use cookies to enhance your experience.',
    keywords: 'cookies, cookie policy, tracking, analytics',
    canonical: 'https://vanguard.store/cookies',
  });

  const cookieTypes = [
    {
      title: 'Essential Cookies',
      description: 'Required for the website to function properly. These enable core functionality such as security, user authentication, and site navigation.',
      examples: 'Session tokens, CSRF tokens, authentication credentials',
    },
    {
      title: 'Performance Cookies',
      description: 'Allow us to analyze website performance and usage patterns. This helps us optimize your experience and identify technical issues.',
      examples: 'Analytics data, page load times, user behavior metrics',
    },
    {
      title: 'Functional Cookies',
      description: 'Remember your preferences and settings to provide a personalized experience across visits.',
      examples: 'Language preferences, theme settings, saved items',
    },
    {
      title: 'Marketing Cookies',
      description: 'Track your activity to deliver targeted content and advertisements. Used only with your consent.',
      examples: 'Conversion tracking, advertising pixels, retargeting data',
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-40 pb-20 px-6 sm:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-emerald-500/[0.03] to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 space-y-6"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
            <HiOutlineInformationCircle size={32} className="text-emerald-500" />
          </div>
          <div className="space-y-3">
            <h1 className="text-6xl md:text-7xl font-black text-slate-950 uppercase italic tracking-tighter">
              Cookie <span className="text-emerald-500">Policy</span>
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Understand how VANGUARD uses cookies to enhance your browsing experience and deliver personalized content.
            </p>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">
              Last Updated: March 2026
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 p-8 bg-slate-50 rounded-2xl border border-slate-200"
        >
          <h2 className="text-2xl font-black text-slate-950 uppercase italic mb-4 tracking-tight">
            What Are Cookies?
          </h2>
          <p className="text-slate-700 leading-relaxed font-medium">
            Cookies are small text files stored on your device that help websites remember your information and preferences. They enable us to provide a seamless, personalized experience while you browse VANGUARD. You can control cookie settings through your browser preferences at any time.
          </p>
        </motion.div>

        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-black text-slate-950 uppercase italic tracking-tight">
            Types of Cookies We Use
          </h2>
          {cookieTypes.map((cookie, index) => (
            <motion.div
              key={cookie.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
              className="p-8 bg-slate-50 rounded-2xl border border-slate-200 hover:border-emerald-500/30 transition-all duration-500"
            >
              <h3 className="text-xl font-black text-slate-950 uppercase italic mb-3 tracking-tight">
                {cookie.title}
              </h3>
              <p className="text-slate-700 leading-relaxed font-medium mb-3">
                {cookie.description}
              </p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black bg-white/50 inline-block px-3 py-1 rounded-full">
                Examples: {cookie.examples}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200">
            <h3 className="text-xl font-black text-slate-950 uppercase italic mb-3 tracking-tight">
              Controlling Cookies
            </h3>
            <p className="text-slate-700 leading-relaxed font-medium">
              Most browsers allow you to control cookies through your settings. You can delete existing cookies or block new ones. Note that disabling essential cookies may affect site functionality. Visit your browser's help section for specific instructions on managing cookies.
            </p>
          </div>

          <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200">
            <h3 className="text-xl font-black text-slate-950 uppercase italic mb-3 tracking-tight">
              Questions About Cookies?
            </h3>
            <p className="text-slate-700 leading-relaxed font-medium mb-4">
              For more information about our cookie practices, contact our privacy team.
            </p>
            <a
              href="mailto:cookies@vanguard.store"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-emerald-600 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cookies;
