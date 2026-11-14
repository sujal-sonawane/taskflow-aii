export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: 'what-is-taskflow-ai',
    question: 'What is TaskFlow AI?',
    answer:
      'TaskFlow AI is an intelligent productivity and project management platform designed to eliminate daily busywork. It unifies project planning, automated task prioritization, deadline tracking, and team collaboration into a single, clutter-free workspace that surfaces what matters most.',
  },
  {
    id: 'is-there-a-free-plan',
    question: 'Is there a free plan?',
    answer:
      'Yes, our Starter plan is 100% free forever (₹0/month) with no credit card required. It includes full access to your personal workspace, core task management, up to three active projects, and community support.',
  },
  {
    id: 'can-i-use-it-with-my-team',
    question: 'Can I use it with my team?',
    answer:
      'TaskFlow AI Pro is specifically built for collaborative teams. It provides shared project boards, real-time activity updates, team workload insights, and role-based assignments so everyone stays synchronized without constant status calls.',
  },
  {
    id: 'do-i-need-technical-knowledge',
    question: 'Do I need technical knowledge?',
    answer:
      'Not at all. TaskFlow AI is crafted with an intuitive, modern interface that requires zero technical or configuration skills. You can set up your workspace, add tasks, and start organizing your work within less than two minutes.',
  },
];

