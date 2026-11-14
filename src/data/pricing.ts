export interface PricingPlan {
  id: 'starter' | 'pro';
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaText: string;
  popular?: boolean;
  badge?: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'STARTER',
    price: '₹0',
    period: '/ month',
    description: 'Ideal for independent professionals and freelancers streamlining daily individual projects.',
    features: [
      'Personal workspace',
      'Basic task management',
      'Three active projects',
      'Basic productivity overview',
      'Community support',
    ],
    ctaText: 'Get Started',
    popular: false,
  },
  {
    id: 'pro',
    name: 'PRO',
    price: '₹499',
    period: '/ month',
    description: 'Designed for ambitious teams and growing organizations needing advanced AI prioritization.',
    features: [
      'Unlimited projects',
      'Advanced task prioritization',
      'Productivity insights',
      'Team collaboration',
      'Priority support',
    ],
    ctaText: 'Choose Pro',
    popular: true,
    badge: 'Recommended for Teams',
  },
];

