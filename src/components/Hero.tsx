import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Check,
  TrendingUp,
  LayoutDashboard,
  Calendar,
  Layers,
  Bot,
  Flame,
} from 'lucide-react';

interface HeroProps {
  onStartForFree: () => void;
  onExploreFeatures: () => void;
}

interface DemoTask {
  id: number;
  title: string;
  category: string;
  priority: 'Urgent' | 'High' | 'Medium';
  completed: boolean;
  dueTime: string;
}

export const Hero: React.FC<HeroProps> = ({ onStartForFree, onExploreFeatures }) => {
  const [tasks, setTasks] = useState<DemoTask[]>([
    {
      id: 1,
      title: 'Finalize quarterly architecture roadmap',
      category: 'Product Ops',
      priority: 'Urgent',
      completed: true,
      dueTime: '11:30 AM',
    },
    {
      id: 2,
      title: 'Review team pull requests for v2.4 sprint',
      category: 'Core Platform',
      priority: 'High',
      completed: true,
      dueTime: '2:00 PM',
    },
    {
      id: 3,
      title: 'Synchronize customer onboarding funnel metrics',
      category: 'Analytics',
      priority: 'Medium',
      completed: false,
      dueTime: '4:30 PM',
    },
    {
      id: 4,
      title: 'Approve final interactive dashboard design tokens',
      category: 'UI/UX Design',
      priority: 'High',
      completed: false,
      dueTime: '5:45 PM',
    },
  ]);

  const [activeSidebarItem, setActiveSidebarItem] = useState('tasks');

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-brand-100/40 via-brand-50/20 to-transparent pointer-events-none -z-10 blur-3xl" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-48 left-10 w-80 h-80 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Copy, CTAs */}
          <div className="lg:col-span-5 text-center lg:text-left">
            {/* Intelligent Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Next-Generation Productivity Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-6">
              Less Busywork.{' '}
              <span className="bg-gradient-to-r from-brand-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                More Breakthroughs.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              TaskFlow AI brings your projects, priorities, and deadlines into one intelligent workspace.
              Plan smarter, collaborate better, and get meaningful work done.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-10">
              <button
                onClick={onStartForFree}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-brand-600 hover:bg-brand-700 active:scale-[0.98] transition-all duration-200 shadow-md shadow-brand-500/25 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <span>Start for Free</span>
                <ArrowRight className="w-4 h-4 text-brand-200 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreFeatures}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:text-slate-900 border border-slate-200/90 active:scale-[0.98] transition-all duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                <span>Explore Features</span>
              </button>
            </div>

            {/* Micro feature points */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                Free forever Starter plan
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                Instant 2-minute setup
              </span>
            </div>
          </div>

          {/* Right Column: Custom CSS Dashboard Illustration / Realistic Preview */}
          <div className="lg:col-span-7">
            <div className="relative mx-auto max-w-2xl lg:max-w-none">
              
              {/* Outer decorative glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-500/20 via-indigo-500/20 to-purple-500/20 rounded-2xl sm:rounded-3xl blur-xl opacity-70" />

              {/* Main Dashboard Preview Container */}
              <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-2xl shadow-slate-900/10 overflow-hidden">
                
                {/* Browser-style Top Bar */}
                <div className="bg-slate-900 px-4 py-3 sm:py-3.5 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-3 text-[11px] sm:text-xs font-mono text-slate-400 font-medium">
                      app.taskflowai.workspace/overview
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Sync
                    </span>
                  </div>
                </div>

                {/* Dashboard Inner Layout */}
                <div className="grid grid-cols-12 min-h-[460px]">
                  
                  {/* Mini Sidebar */}
                  <div className="hidden sm:flex sm:col-span-3 bg-slate-900/95 text-slate-300 p-4 flex-col justify-between border-r border-slate-800 text-xs">
                    <div className="space-y-4">
                      {/* Workspace profile */}
                      <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                        <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-xs">
                          TF
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-semibold text-slate-200 truncate">Sprint Studio</p>
                          <p className="text-[10px] text-slate-400">Product Team</p>
                        </div>
                      </div>

                      {/* Navigation links */}
                      <nav className="space-y-1">
                        <button
                          type="button"
                          onClick={() => setActiveSidebarItem('tasks')}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                            activeSidebarItem === 'tasks'
                              ? 'bg-brand-600/30 text-brand-300 border border-brand-500/30'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                          }`}
                        >
                          <LayoutDashboard className="w-3.5 h-3.5" />
                          <span>Today's Flow</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveSidebarItem('priorities')}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                            activeSidebarItem === 'priorities'
                              ? 'bg-brand-600/30 text-brand-300 border border-brand-500/30'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                          }`}
                        >
                          <Flame className="w-3.5 h-3.5 text-amber-400" />
                          <span>Priorities</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveSidebarItem('deadlines')}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                            activeSidebarItem === 'deadlines'
                              ? 'bg-brand-600/30 text-brand-300 border border-brand-500/30'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                          }`}
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Deadlines</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveSidebarItem('projects')}
                          className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                            activeSidebarItem === 'projects'
                              ? 'bg-brand-600/30 text-brand-300 border border-brand-500/30'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                          }`}
                        >
                          <Layers className="w-3.5 h-3.5" />
                          <span>Projects</span>
                        </button>
                      </nav>
                    </div>

                    {/* Bottom AI Assistant Status */}
                    <div className="bg-slate-800/70 rounded-xl p-2.5 border border-slate-700/60">
                      <div className="flex items-center gap-1.5 text-brand-300 font-semibold mb-1">
                        <Bot className="w-3.5 h-3.5" />
                        <span className="text-[11px]">AI Copilot</span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-tight">
                        Analyzing 14 sprint dependencies...
                      </p>
                    </div>
                  </div>

                  {/* Main Preview Content */}
                  <div className="col-span-12 sm:col-span-9 p-4 sm:p-5 flex flex-col justify-between bg-slate-50/60">
                    <div>
                      {/* Welcome & Progress Row */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200/80">
                        <div>
                          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                            Good morning, Alex 👋
                          </h2>
                          <p className="text-xs text-slate-500">
                            Here is your prioritized execution plan for Wednesday.
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200/60">
                            {progressPercent}% Complete
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-200 rounded-full h-2 mb-4 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-brand-600 to-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>

                      {/* AI Task Suggestion Card */}
                      <div className="mb-4 bg-gradient-to-r from-brand-50 via-purple-50/70 to-indigo-50 border border-brand-200/70 rounded-xl p-3 shadow-xs">
                        <div className="flex items-start gap-2.5">
                          <div className="p-1.5 rounded-lg bg-brand-600 text-white shrink-0 mt-0.5">
                            <Sparkles className="w-3.5 h-3.5" />
                          </div>
                          <div className="text-xs">
                            <span className="font-semibold text-brand-900 block mb-0.5">
                              AI Focus Recommendation
                            </span>
                            <p className="text-slate-600 text-[11px] leading-relaxed">
                              Sprint 14 code freeze in 48 hours. Suggest completing{' '}
                              <strong className="text-slate-800">Roadmap finalization</strong> before afternoon team sync.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Task List */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-1">
                          <span>Today's Priority Tasks (Click to toggle)</span>
                          <span>{completedCount}/{tasks.length} Done</span>
                        </div>

                        {tasks.map((task) => (
                          <div
                            key={task.id}
                            role="checkbox"
                            tabIndex={0}
                            aria-checked={task.completed}
                            aria-label={`Task: ${task.title}, Priority: ${task.priority}`}
                            onClick={() => toggleTask(task.id)}
                            onKeyDown={(e) => {
                              if (e.key === ' ' || e.key === 'Enter') {
                                e.preventDefault();
                                toggleTask(task.id);
                              }
                            }}
                            className={`group flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                              task.completed
                                ? 'bg-slate-100/70 border-slate-200 text-slate-400'
                                : 'bg-white border-slate-200/90 hover:border-brand-300 hover:shadow-xs text-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0 pr-2">
                              <span
                                className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                                  task.completed
                                    ? 'bg-brand-600 border-brand-600 text-white'
                                    : 'border-slate-300 group-hover:border-brand-500 bg-white'
                                }`}
                              >
                                {task.completed && <CheckCircle2 className="w-3 h-3 text-white" />}
                              </span>
                              <span
                                className={`text-xs font-medium truncate ${
                                  task.completed ? 'line-through text-slate-400' : 'text-slate-800'
                                }`}
                              >
                                {task.title}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                                  task.priority === 'Urgent'
                                    ? 'bg-rose-50 text-rose-600 border border-rose-200/60'
                                    : task.priority === 'High'
                                    ? 'bg-amber-50 text-amber-600 border border-amber-200/60'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {task.priority}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Split Widget: Upcoming Deadlines & Productivity Overview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-200/80">
                      {/* Deadlines Widget */}
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase font-bold text-slate-400">Next Milestone</p>
                          <p className="text-xs font-bold text-slate-800 truncate">Q3 Sprint Launch</p>
                          <p className="text-[10px] text-indigo-600 font-medium">Due in 2 days</p>
                        </div>
                      </div>

                      {/* Productivity Stat Widget */}
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase font-bold text-slate-400">Weekly Output</p>
                          <p className="text-xs font-bold text-slate-800">+28% Velocity</p>
                          <p className="text-[10px] text-emerald-600 font-medium">42 tasks shipped</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

