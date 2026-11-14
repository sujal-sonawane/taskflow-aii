import React, { useState } from 'react';
import {
  Kanban,
  ListFilter,
  BarChart2,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  category: string;
  progress: number;
  tasksDone: number;
  totalTasks: number;
  status: 'In Progress' | 'Review' | 'On Track' | 'Needs Attention';
  dueDate: string;
}

interface TaskItem {
  id: string;
  title: string;
  project: string;
  assignee: { name: string; initials: string; color: string };
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Completed' | 'In Progress' | 'In Review' | 'Backlog';
  dueDate: string;
}

export const ProductPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'board' | 'list' | 'analytics'>('board');
  const [selectedProjectFilter, setSelectedProjectFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const projects: Project[] = [
    {
      id: 'core-app',
      name: 'TaskFlow Web App v2.5',
      category: 'Product Engineering',
      progress: 82,
      tasksDone: 28,
      totalTasks: 34,
      status: 'On Track',
      dueDate: 'Nov 24',
    },
    {
      id: 'design-system',
      name: 'Design System & Tokens',
      category: 'UI/UX Architecture',
      progress: 94,
      tasksDone: 47,
      totalTasks: 50,
      status: 'Review',
      dueDate: 'Nov 18',
    },
    {
      id: 'api-migration',
      name: 'Cloud Event Broker Sync',
      category: 'Infrastructure',
      progress: 65,
      tasksDone: 13,
      totalTasks: 20,
      status: 'In Progress',
      dueDate: 'Dec 02',
    },
    {
      id: 'onboarding',
      name: 'User Onboarding Flow',
      category: 'Growth & Ops',
      progress: 45,
      tasksDone: 9,
      totalTasks: 20,
      status: 'Needs Attention',
      dueDate: 'Dec 08',
    },
  ];

  const tasks: TaskItem[] = [
    {
      id: 't-1',
      title: 'Implement optimistic UI for task priority updates',
      project: 'core-app',
      assignee: { name: 'Elena Rostova', initials: 'ER', color: 'bg-brand-600' },
      priority: 'Critical',
      status: 'In Progress',
      dueDate: 'Tomorrow',
    },
    {
      id: 't-2',
      title: 'Audit WCAG 2.1 AA color contrast for dark surfaces',
      project: 'design-system',
      assignee: { name: 'Marcus Chen', initials: 'MC', color: 'bg-indigo-600' },
      priority: 'High',
      status: 'In Review',
      dueDate: 'Today, 4 PM',
    },
    {
      id: 't-3',
      title: 'Benchmark client-side caching & debounce delays',
      project: 'api-migration',
      assignee: { name: 'Devon Vance', initials: 'DV', color: 'bg-emerald-600' },
      priority: 'High',
      status: 'In Progress',
      dueDate: 'Nov 21',
    },
    {
      id: 't-4',
      title: 'Publish interactive keyboard shortcut cheatsheet',
      project: 'onboarding',
      assignee: { name: 'Aisha Patel', initials: 'AP', color: 'bg-purple-600' },
      priority: 'Medium',
      status: 'Backlog',
      dueDate: 'Nov 25',
    },
    {
      id: 't-5',
      title: 'Configure automated linting & TypeScript typecheck CI',
      project: 'core-app',
      assignee: { name: 'Sarah Lin', initials: 'SL', color: 'bg-amber-600' },
      priority: 'Medium',
      status: 'Completed',
      dueDate: 'Completed',
    },
  ];

  const weeklyData = [
    { day: 'Mon', tasks: 12, hours: 6.2, completionRate: '92%' },
    { day: 'Tue', tasks: 16, hours: 7.5, completionRate: '95%' },
    { day: 'Wed', tasks: 19, hours: 8.1, completionRate: '98%' },
    { day: 'Thu', tasks: 14, hours: 6.8, completionRate: '90%' },
    { day: 'Fri', tasks: 17, hours: 7.2, completionRate: '94%' },
    { day: 'Sat', tasks: 6, hours: 3.1, completionRate: '100%' },
    { day: 'Sun', tasks: 4, hours: 2.0, completionRate: '100%' },
  ];

  const filteredTasks = tasks.filter((t) => {
    const matchesProject =
      selectedProjectFilter === 'all' || t.project === selectedProjectFilter;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.assignee.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProject && matchesSearch;
  });

  const getPriorityBadge = (priority: TaskItem['priority']) => {
    switch (priority) {
      case 'Critical':
        return 'bg-rose-50 text-rose-700 border-rose-200/80';
      case 'High':
        return 'bg-amber-50 text-amber-700 border-amber-200/80';
      case 'Medium':
        return 'bg-blue-50 text-blue-700 border-blue-200/80';
      case 'Low':
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusBadge = (status: TaskItem['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
      case 'In Progress':
        return 'bg-brand-50 text-brand-700 border-brand-200/80';
      case 'In Review':
        return 'bg-purple-50 text-purple-700 border-purple-200/80';
      case 'Backlog':
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <section id="product-preview" className="py-24 bg-white border-b border-slate-200/80 relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-50 border border-brand-200/70 text-brand-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Interactive Platform Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            An interface designed for deep focus and speed.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Explore the live interface preview below. Switch between board views, inspect project velocity, and test interactive project filtering.
          </p>
        </div>

        {/* Big Dashboard Showcase Container */}
        <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-900 text-slate-100 shadow-2xl overflow-hidden">
          
          {/* Header Bar with Tabs and Search */}
          <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('board')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'board'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Kanban className="w-3.5 h-3.5" />
                <span>Sprint Board</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('list')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'list'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span>Task List</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('analytics')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'analytics'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5" />
                <span>Productivity Insights</span>
              </button>
            </div>

            {/* Project Filter & Search */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter tasks..."
                  className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500 w-36 sm:w-44"
                />
              </div>

              <select
                value={selectedProjectFilter}
                onChange={(e) => setSelectedProjectFilter(e.target.value)}
                aria-label="Filter tasks by project"
                className="bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-brand-500"
              >
                <option value="all">All Projects (4)</option>
                <option value="core-app">TaskFlow Web App</option>
                <option value="design-system">Design System</option>
                <option value="api-migration">Cloud Event Broker</option>
                <option value="onboarding">User Onboarding</option>
              </select>
            </div>

          </div>

          {/* Project Progress Overview Strip */}
          <div className="p-4 sm:p-5 bg-slate-900/80 border-b border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Active Project Pipelines
              </span>
              <span className="text-xs text-brand-400 font-medium">
                4 Active • 1 In Review
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() =>
                    setSelectedProjectFilter(
                      selectedProjectFilter === proj.id ? 'all' : proj.id
                    )
                  }
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedProjectFilter === proj.id
                      ? 'bg-slate-800 border-brand-500 ring-1 ring-brand-500'
                      : 'bg-slate-850/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-slate-400 font-medium truncate">
                      {proj.category}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        proj.status === 'Review'
                          ? 'bg-purple-950 text-purple-300 border border-purple-800'
                          : proj.status === 'On Track'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : proj.status === 'Needs Attention'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-blue-950 text-blue-300 border border-blue-800'
                      }`}
                    >
                      {proj.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-100 truncate mb-2">
                    {proj.name}
                  </h4>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>{proj.tasksDone}/{proj.totalTasks} tasks</span>
                      <span className="font-semibold text-slate-200">{proj.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-brand-500 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${proj.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Content View */}
          <div className="p-4 sm:p-6 bg-slate-900/50">
            
            {/* TAB 1: KANBAN SPRINT BOARD */}
            {activeTab === 'board' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Column 1: In Progress */}
                <div className="bg-slate-950/80 rounded-xl p-3.5 border border-slate-800">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-400" />
                      <span className="text-xs font-bold text-slate-200">In Progress</span>
                    </div>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                      2 Tasks
                    </span>
                  </div>
                  
                  <div className="space-y-2.5">
                    {filteredTasks
                      .filter((t) => t.status === 'In Progress')
                      .map((task) => (
                        <div
                          key={task.id}
                          className="bg-slate-900 p-3 rounded-lg border border-slate-800 hover:border-brand-500/50 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`text-[9px] font-bold px-2 py-0.5 rounded border ${getPriorityBadge(
                                task.priority
                              )}`}
                            >
                              {task.priority}
                            </span>
                            <span className="text-[10px] text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {task.dueDate}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-slate-200 leading-snug mb-3">
                            {task.title}
                          </p>
                          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`w-5 h-5 rounded-full ${task.assignee.color} text-[9px] font-bold text-white flex items-center justify-center`}
                              >
                                {task.assignee.initials}
                              </span>
                              <span className="text-[11px] text-slate-400 truncate max-w-[100px]">
                                {task.assignee.name}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-500">
                              {task.project}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Column 2: In Review */}
                <div className="bg-slate-950/80 rounded-xl p-3.5 border border-slate-800">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      <span className="text-xs font-bold text-slate-200">Review</span>
                    </div>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                      1 Task
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {filteredTasks
                      .filter((t) => t.status === 'In Review')
                      .map((task) => (
                        <div
                          key={task.id}
                          className="bg-slate-900 p-3 rounded-lg border border-slate-800 hover:border-brand-500/50 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`text-[9px] font-bold px-2 py-0.5 rounded border ${getPriorityBadge(
                                task.priority
                              )}`}
                            >
                              {task.priority}
                            </span>
                            <span className="text-[10px] text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {task.dueDate}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-slate-200 leading-snug mb-3">
                            {task.title}
                          </p>
                          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`w-5 h-5 rounded-full ${task.assignee.color} text-[9px] font-bold text-white flex items-center justify-center`}
                              >
                                {task.assignee.initials}
                              </span>
                              <span className="text-[11px] text-slate-400 truncate max-w-[100px]">
                                {task.assignee.name}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-500">
                              {task.project}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Column 3: Completed */}
                <div className="bg-slate-950/80 rounded-xl p-3.5 border border-slate-800">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-xs font-bold text-slate-200">Completed</span>
                    </div>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                      1 Task
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {filteredTasks
                      .filter((t) => t.status === 'Completed')
                      .map((task) => (
                        <div
                          key={task.id}
                          className="bg-slate-900 p-3 rounded-lg border border-slate-800/70 opacity-90"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                              Verified Done
                            </span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          </div>
                          <p className="text-xs font-medium text-slate-300 leading-snug mb-3 line-through">
                            {task.title}
                          </p>
                          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`w-5 h-5 rounded-full ${task.assignee.color} text-[9px] font-bold text-white flex items-center justify-center`}
                              >
                                {task.assignee.initials}
                              </span>
                              <span className="text-[11px] text-slate-400">
                                {task.assignee.name}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-500">
                              {task.project}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: DETAILED TASK LIST */}
            {activeTab === 'list' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-3">Task Deliverable</th>
                      <th className="py-3 px-3">Project</th>
                      <th className="py-3 px-3">Assignee</th>
                      <th className="py-3 px-3">Priority</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Deadline</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredTasks.map((task) => (
                      <tr key={task.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-3 font-medium text-slate-200">
                          {task.title}
                        </td>
                        <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">
                          {task.project}
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-5 h-5 rounded-full ${task.assignee.color} text-[9px] font-bold text-white flex items-center justify-center`}
                            >
                              {task.assignee.initials}
                            </span>
                            <span className="text-slate-300 text-[11px]">
                              {task.assignee.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded border ${getPriorityBadge(
                              task.priority
                            )}`}
                          >
                            {task.priority}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded border ${getStatusBadge(
                              task.status
                            )}`}
                          >
                            {task.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right text-slate-400 font-medium">
                          {task.dueDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 3: PRODUCTIVITY INSIGHTS & WEEKLY CHART */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                
                {/* Metric Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Weekly Output</p>
                    <p className="text-xl font-extrabold text-white mt-1">94 Tasks</p>
                    <p className="text-[11px] text-emerald-400 font-medium mt-0.5">+24% vs last week</p>
                  </div>
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Average Velocity</p>
                    <p className="text-xl font-extrabold text-white mt-1">18.8 / day</p>
                    <p className="text-[11px] text-brand-400 font-medium mt-0.5">Optimal pace</p>
                  </div>
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">On-Time Rate</p>
                    <p className="text-xl font-extrabold text-emerald-400 mt-1">96.8%</p>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">Top quartile</p>
                  </div>
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Focus Deep Work</p>
                    <p className="text-xl font-extrabold text-white mt-1">37.4 hrs</p>
                    <p className="text-[11px] text-indigo-400 font-medium mt-0.5">3.8h unblocked/dev</p>
                  </div>
                </div>

                {/* CSS Weekly Productivity Bar Chart */}
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">
                        Sprint Velocity by Day (Tasks Completed)
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Hover over each bar to inspect completion rate and focus hours.
                      </p>
                    </div>
                    <span className="text-xs text-brand-400 font-mono font-semibold">
                      Nov 06 – Nov 12
                    </span>
                  </div>

                  <div className="flex items-end justify-between gap-2 sm:gap-4 h-48 pt-6 pb-2 border-b border-slate-800">
                    {weeklyData.map((item) => {
                      const maxTasks = 20;
                      const heightPercent = Math.round((item.tasks / maxTasks) * 100);
                      return (
                        <div
                          key={item.day}
                          className="flex-1 flex flex-col items-center gap-2 group relative h-full justify-end"
                        >
                          {/* Tooltip on hover */}
                          <div className="absolute -top-12 bg-slate-800 text-white text-[10px] py-1 px-2 rounded-md border border-slate-700 shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                            <strong>{item.tasks} tasks</strong> • {item.hours} hrs ({item.completionRate})
                          </div>

                          {/* Bar */}
                          <div
                            className="w-full max-w-[48px] bg-gradient-to-t from-brand-700 to-brand-500 rounded-t-md group-hover:from-brand-600 group-hover:to-brand-400 transition-all duration-300"
                            style={{ height: `${heightPercent}%` }}
                          />

                          {/* Label */}
                          <span className="text-[11px] font-semibold text-slate-400 group-hover:text-white transition-colors">
                            {item.day}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-brand-500 inline-block" />
                      Completed Sprint Deliverables
                    </span>
                    <span>Total Team Hours: 40.9 hrs</span>
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Bottom Quick Action Footer */}
          <div className="bg-slate-950 px-5 py-3 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Workspace connected • Showing live simulated environment</span>
            </div>
            <div className="text-slate-500 text-[11px]">
              TaskFlow Engine v2.5.4
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
