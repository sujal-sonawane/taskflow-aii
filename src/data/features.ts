export interface FeatureItem {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  iconName: 'sparkles' | 'calendar' | 'users' | 'chart';
  badge: string;
  metric: string;
}

export const featuresData: FeatureItem[] = [
  {
    id: 'ai-prioritization',
    title: 'AI-Powered Task Prioritization',
    shortDesc: 'Organize tasks based on urgency and importance.',
    description: 'Dynamic scoring evaluates upcoming deadlines, project impact, and cross-task dependencies to highlight what truly deserves your focus right now.',
    iconName: 'sparkles',
    badge: 'Intelligent Ranking',
    metric: 'Dynamic impact scoring',
  },
  {
    id: 'deadline-planning',
    title: 'Smart Deadline Planning',
    shortDesc: 'Visualize deadlines and manage upcoming work.',
    description: 'Interactive timelines and bottleneck detection prevent last-minute scrambles, automatically flagging scheduling conflicts before they become blockers.',
    iconName: 'calendar',
    badge: 'Predictive Timelines',
    metric: 'Buffer risk warnings',
  },
  {
    id: 'team-collaboration',
    title: 'Team Collaboration',
    shortDesc: 'Keep tasks, updates, and responsibilities organized.',
    description: 'Centralized task ownership, context-aware handoffs, and shared workspaces ensure every team member stays aligned without endless status meetings.',
    iconName: 'users',
    badge: 'Contextual Sync',
    metric: 'Unified team handoffs',
  },
  {
    id: 'productivity-insights',
    title: 'Productivity Insights',
    shortDesc: 'Understand progress through simple visual reports.',
    description: 'Visual velocity dashboards and focus metrics provide clear visibility into team momentum, helping you celebrate wins and optimize workload balance.',
    iconName: 'chart',
    badge: 'Actionable Reporting',
    metric: 'Visual velocity & trends',
  },
];

