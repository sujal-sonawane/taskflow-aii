import React from 'react';
import {
  Sparkles,
  Calendar,
  Users2,
  BarChart3,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { featuresData, type FeatureItem } from '../data/features';

export const Features: React.FC = () => {
  const getIcon = (iconName: FeatureItem['iconName']) => {
    switch (iconName) {
      case 'sparkles':
        return <Sparkles className="w-6 h-6 text-brand-600" />;
      case 'calendar':
        return <Calendar className="w-6 h-6 text-indigo-600" />;
      case 'users':
        return <Users2 className="w-6 h-6 text-purple-600" />;
      case 'chart':
        return <BarChart3 className="w-6 h-6 text-emerald-600" />;
    }
  };

  const getMicroPreview = (id: string) => {
    switch (id) {
      case 'ai-prioritization':
        return (
          <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">Urgency & Impact Matrix</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700">
                AI Score: 98/100
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 bg-white p-2 rounded-lg border border-slate-200/60 shadow-2xs">
              <span className="font-medium text-slate-800 truncate mr-2">Release v2.0 Candidate</span>
              <span className="text-rose-600 font-semibold shrink-0">Urgent</span>
            </div>
          </div>
        );
      case 'deadline-planning':
        return (
          <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">Milestone Timeline</span>
              <span className="text-[10px] text-indigo-600 font-bold flex items-center gap-1">
                <Clock className="w-3 h-3" /> 2 Days Buffer
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div className="bg-indigo-600 h-2 rounded-full w-3/4" />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Kickoff</span>
              <span className="font-semibold text-slate-600">Review (Today)</span>
              <span>Launch</span>
            </div>
          </div>
        );
      case 'team-collaboration':
        return (
          <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex -space-x-1.5 overflow-hidden">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white ring-2 ring-white">
                  AL
                </span>
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white ring-2 ring-white">
                  SK
                </span>
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white ring-2 ring-white">
                  MR
                </span>
              </div>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Synced Just Now
              </span>
            </div>
            <p className="text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-200/60 shadow-2xs">
              <strong className="text-slate-800">Sarah K:</strong> Handed off design tokens to frontend team.
            </p>
          </div>
        );
      case 'productivity-insights':
        return (
          <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">Sprint Throughput</span>
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +34% Velocity
              </span>
            </div>
            <div className="flex items-end gap-1.5 h-10 pt-1">
              <div className="flex-1 bg-emerald-200 rounded-t h-4" />
              <div className="flex-1 bg-emerald-300 rounded-t h-6" />
              <div className="flex-1 bg-emerald-400 rounded-t h-7" />
              <div className="flex-1 bg-emerald-500 rounded-t h-9" />
              <div className="flex-1 bg-emerald-600 rounded-t h-10" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="features" className="py-24 bg-white border-b border-slate-200/70 relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/70 text-brand-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Engineered for Execution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Everything you need to move work forward.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            A unified system that eliminates mental clutter, coordinates team priorities, and turns chaotic to-do lists into decisive progress.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuresData.map((feature) => (
            <div
              key={feature.id}
              className="group relative bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-brand-300 shadow-sm hover:shadow-card transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Icon & Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                    {getIcon(feature.iconName)}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                    {feature.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                  {feature.title}
                </h3>

                {/* Short Desc (Assignment specified) */}
                <p className="text-xs font-semibold text-brand-700 mb-2">
                  {feature.shortDesc}
                </p>

                {/* Deep description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Realistic Micro Feature Preview */}
              <div>
                {getMicroPreview(feature.id)}
                
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-brand-600 transition-colors">
                  <span>{feature.metric}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
