import React from 'react';
import {
  FolderPlus,
  SlidersHorizontal,
  CheckCircle,
  ListTodo,
  Sparkles,
  Calendar,
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Create Your Workspace',
      subtitle: 'Set up projects and organize your work.',
      description:
        'Create custom project hubs, invite team collaborators, and import your existing workflows with instant presets tailored for engineering, design, and operations.',
      icon: FolderPlus,
      color: 'from-violet-600 to-brand-600',
      preview: (
        <div className="bg-slate-900 text-slate-200 p-4 rounded-xl border border-slate-800 text-xs space-y-3 font-sans">
          <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
            <span className="font-semibold text-slate-300">New Project Hub</span>
            <span className="text-[10px] bg-brand-900/60 text-brand-300 px-2 py-0.5 rounded border border-brand-700/50">
              Template: Sprint 2026
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 bg-slate-800/80 p-2 rounded-lg text-slate-300">
              <span className="w-2 h-2 rounded-full bg-brand-400" />
              <span className="font-medium text-white">Q3 Product Redesign</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 p-2 rounded-lg text-slate-400">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span>Mobile App Performance</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span>4 Team Members</span>
            <span className="text-emerald-400 font-medium">Ready in 30s</span>
          </div>
        </div>
      ),
    },
    {
      step: '02',
      title: 'Plan and Prioritize',
      subtitle: 'Add tasks, set deadlines, and identify priorities.',
      description:
        'Input deliverables, configure milestones, and let TaskFlow’s AI scoring engine automatically rank your backlog by urgency, business value, and dependencies.',
      icon: SlidersHorizontal,
      color: 'from-brand-600 to-indigo-600',
      preview: (
        <div className="bg-slate-900 text-slate-200 p-4 rounded-xl border border-slate-800 text-xs space-y-3 font-sans">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" /> AI Priority Ranking
            </span>
            <span className="text-[10px] text-amber-400 font-mono">Top Priority #1</span>
          </div>
          <div className="space-y-2">
            <div className="bg-slate-800/90 p-2 rounded-lg border border-brand-500/30">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-medium text-white">Design Token Pipeline</span>
                <span className="text-[10px] text-rose-400 font-bold">Urgent</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" /> Tomorrow, 5 PM
                </span>
                <span>Impact: High</span>
              </div>
            </div>
            <div className="bg-slate-800/40 p-2 rounded-lg border border-slate-800 flex items-center justify-between text-slate-400 text-[11px]">
              <span>Update Staging Documentation</span>
              <span className="text-[10px] text-slate-400">Medium</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      step: '03',
      title: 'Track Your Progress',
      subtitle: 'Monitor completed tasks and keep projects moving.',
      description:
        'Watch tasks move across boards, review live team velocity, receive proactive deadline alerts, and maintain clear transparency across every milestone.',
      icon: CheckCircle,
      color: 'from-indigo-600 to-emerald-600',
      preview: (
        <div className="bg-slate-900 text-slate-200 p-4 rounded-xl border border-slate-800 text-xs space-y-3 font-sans">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-semibold text-slate-300">Sprint Health & Velocity</span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/40">
              On Schedule
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] text-slate-300">
              <span>Overall Completion</span>
              <span className="font-semibold text-emerald-400">84%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-brand-500 to-emerald-500 h-2 rounded-full w-[84%]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
            <div className="bg-slate-800/60 p-2 rounded-lg">
              <p className="text-slate-400 text-[10px]">Tasks Shipped</p>
              <p className="font-bold text-white text-sm">28 / 32</p>
            </div>
            <div className="bg-slate-800/60 p-2 rounded-lg">
              <p className="text-slate-400 text-[10px]">Days to Launch</p>
              <p className="font-bold text-white text-sm">3 Days</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-50 border-b border-slate-200/80 relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-100/60 border border-brand-200 text-brand-700 text-xs font-semibold mb-4">
            <ListTodo className="w-3.5 h-3.5 text-brand-600" />
            <span>Structured Execution Flow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            From scattered tasks to focused execution.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            A simple, repeatable framework designed to replace reactive fire-fighting with systematic clarity.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-card transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Step Pill & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xl sm:text-2xl font-black text-brand-600 bg-brand-50 px-3 py-1 rounded-xl border border-brand-100">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-slate-700" />
                    </div>
                  </div>

                  {/* Step Title & Subtitle */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-brand-600 mb-3">
                    {item.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Step Visual Preview Card */}
                <div className="mt-2">
                  {item.preview}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
