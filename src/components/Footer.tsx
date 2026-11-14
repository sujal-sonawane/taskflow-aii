import React, { useState } from 'react';
import { Sparkles, Mail, Shield, FileText, X } from 'lucide-react';

export const Footer: React.FC = () => {
  const [modalContent, setModalContent] = useState<{
    title: string;
    body: string;
  } | null>(null);

  const navLinks = [
    { name: 'Product', href: '#product-preview' },
    { name: 'Features', href: '#features' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openLegalModal = (title: string, body: string) => {
    setModalContent({ title, body });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Column (2 cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#"
              className="inline-flex items-center gap-2.5 text-white group"
            >
              <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                TaskFlow<span className="text-brand-400"> AI</span>
              </span>
            </a>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              TaskFlow AI is an intelligent productivity and project management platform. We help individuals and high-velocity teams organize tasks, prioritize work, manage deadlines, collaborate, and monitor productivity.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-brand-400 shrink-0" />
              <a
                href="mailto:hello@taskflowai.example"
                className="hover:text-white transition-colors underline underline-offset-4 decoration-slate-700 hover:decoration-brand-400"
              >
                hello@taskflowai.example
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Platform Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="#product-preview"
                  onClick={(e) => handleLinkClick(e, '#product-preview')}
                  className="hover:text-white transition-colors"
                >
                  Interactive Demo
                </a>
              </li>
              <li>
                <span className="text-slate-500 hover:text-slate-400 cursor-pointer" onClick={() => openLegalModal('Product Changelog', 'TaskFlow AI v2.5 released with dynamic AI prioritization scoring, team timeline roadmaps, and custom workspace presets.')}>
                  Changelog v2.5
                </span>
              </li>
              <li>
                <span className="text-slate-500 hover:text-slate-400 cursor-pointer" onClick={() => openLegalModal('Documentation Hub', 'Comprehensive guides for sprint setup, AI ranking configuration, and project permission models.')}>
                  Documentation
                </span>
              </li>
              <li>
                <span className="text-slate-500 hover:text-slate-400 cursor-pointer flex items-center gap-1.5" onClick={() => openLegalModal('System Status', 'All TaskFlow AI services operational: 99.99% uptime observed across simulated nodes.')}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  System Status
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Compliance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() =>
                    openLegalModal(
                      'Privacy Policy (Placeholder)',
                      'TaskFlow AI is a fictional frontend internship assignment prototype designed for SANKAR GROUP. No real user data or telemetry is collected, stored, or processed on any remote server.'
                    )
                  }
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-slate-500" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    openLegalModal(
                      'Terms of Service (Placeholder)',
                      'This project is developed solely as an educational frontend demonstration. Commercial SaaS features, payment interfaces, and AI outputs are simulated via React client-side state.'
                    )
                  }
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Terms of Service</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026 TaskFlow AI. All rights reserved. SANKAR GROUP Front-End Development Internship Assignment.
          </p>
          <div className="flex items-center gap-6">
            <span>Built with React, Vite, TypeScript & Tailwind CSS</span>
          </div>
        </div>

      </div>

      {/* Legal / Info Modal */}
      {modalContent && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setModalContent(null)}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full text-slate-200 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">{modalContent.title}</h3>
              <button
                type="button"
                onClick={() => setModalContent(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              {modalContent.body}
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setModalContent(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

