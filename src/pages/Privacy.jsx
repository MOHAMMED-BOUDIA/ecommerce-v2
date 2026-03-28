import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineShieldCheck } from 'react-icons/hi2';
import { useSEO } from '../hooks/useSEO';

const Privacy = () => {
  useSEO({
    title: 'Privacy Policy - VANGUARD',
    description: 'VANGUARD Privacy Policy - Learn how we protect and handle your personal data.',
    keywords: 'privacy, policy, data protection, GDPR',
    canonical: 'https://vanguard.store/privacy',
  });

  const sections = [
    {
      title: 'Information We Collect',
      content: 'We collect information you provide directly to us, such as when you create an account, make a purchase, or contact our support team. This includes your name, email address, shipping address, payment information, and order history.',
    },
    {
      title: 'How We Use Your Information',
      content: 'Your information is used to process orders, improve our services, send marketing communications (with your consent), prevent fraud, and provide customer support. We never sell your personal data to third parties.',
    },
    {
      title: 'Data Security',
      content: 'We implement advanced security measures to protect your personal information, including encryption, secure servers, and regular security audits. Your payment information is processed through PCI-DSS compliant payment gateways.',
    },
    {
      title: 'Your Rights',
      content: 'You have the right to access, update, or delete your personal information at any time. You can manage your preferences in your account settings or contact our privacy team for assistance.',
    },
    {
      title: 'Contact Us',
      content: 'If you have questions about our privacy practices, please contact us at privacy@vanguard.store. We respond to all inquiries within 48 hours.',
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
            <HiOutlineShieldCheck size={32} className="text-emerald-500" />
          </div>
          <div className="space-y-3">
            <h1 className="text-6xl md:text-7xl font-black text-slate-950 uppercase italic tracking-tighter">
              Privacy <span className="text-emerald-500">Policy</span>
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Your privacy is our priority. Learn how VANGUARD protects and handles your personal information.
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
          className="space-y-8"
        >
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
              className="p-8 bg-slate-50 rounded-2xl border border-slate-200 hover:border-emerald-500/30 transition-all duration-500"
            >
              <h2 className="text-2xl font-black text-slate-950 uppercase italic mb-4 tracking-tight">
                {section.title}
              </h2>
              <p className="text-slate-700 leading-relaxed font-medium">
                {section.content}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 p-8 bg-emerald-50 rounded-2xl border border-emerald-200"
        >
          <h3 className="text-xl font-black text-slate-950 uppercase italic mb-2">Need to Contact Us?</h3>
          <p className="text-slate-700 mb-4">
            Questions about our privacy practices or data handling? Our privacy team is ready to help.
          </p>
          <a
            href="mailto:privacy@vanguard.store"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-emerald-600 transition-all duration-300"
          >
            Contact Privacy Team
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
