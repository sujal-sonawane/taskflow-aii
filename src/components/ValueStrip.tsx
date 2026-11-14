import React from 'react';
import { Layers, Flame, Users2, BarChart2 } from 'lucide-react';

export const ValueStrip: React.FC = () => {
  const values = [
    {
      title: 'Organized Workflows',
      description: 'Structured workspaces that eliminate clutter',
      icon: Layers,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    },
    {
      title: 'Smarter Priorities',
      description: 'Focus on high-impact objectives first',
      icon: Flame,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      title: 'Team Collaboration',
      description: 'Synchronized updates and shared context',
      icon: Users2,
      color: 'text-brand-600 bg-brand-50 border-brand-100',
    },
    {
      title: 'Clear Progress',
      description: 'Visual velocity and measurable momentum',
      icon: BarChart2,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
  ];

  return (
    <section className="relative py-10 bg-slate-900 border-y border-slate-800 text-white overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(124,58,237,0.1),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {values.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group flex items-center gap-4 p-4 rounded-xl bg-slate-850/60 border border-slate-800/80 hover:border-slate-700/80 hover:bg-slate-800/70 transition-all duration-200"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${item.color} group-hover:scale-105 transition-transform duration-200`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-100 tracking-tight group-hover:text-white transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

