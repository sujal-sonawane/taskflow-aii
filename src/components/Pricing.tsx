import React from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { pricingPlans, type PricingPlan } from '../data/pricing';

interface PricingProps {
  onSelectPlan: (planId: 'starter' | 'pro') => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  return (
    <section id="pricing" className="py-24 bg-slate-50 border-b border-slate-200/80 relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-100/60 border border-brand-200 text-brand-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Transparent & Predictable</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Simple pricing. Serious productivity.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Start free as an individual, or unlock team collaboration and AI prioritizations with Pro.
          </p>
          <div className="mt-3 inline-block bg-amber-50 border border-amber-200/80 rounded-lg px-3 py-1 text-xs text-amber-800 font-medium">
            * Illustrative sample prices for demonstration purposes only.
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {pricingPlans.map((plan: PricingPlan) => {
            const isPopular = plan.popular;
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between ${
                  isPopular
                    ? 'bg-slate-900 text-white shadow-2xl border-2 border-brand-500 ring-4 ring-brand-500/20'
                    : 'bg-white text-slate-900 border border-slate-200/90 shadow-sm hover:shadow-card'
                }`}
              >
                {/* Popular badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-brand-600 text-white shadow-md">
                      <Sparkles className="w-3 h-3 text-brand-200" />
                      {plan.badge || 'Recommended'}
                    </span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Desc */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-md ${
                        isPopular
                          ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {plan.name}
                    </span>
                  </div>

                  <p
                    className={`text-xs sm:text-sm mb-6 ${
                      isPopular ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mb-8 pb-6 border-b border-slate-200/40">
                    <span className="text-4xl sm:text-5xl font-black tracking-tight">
                      {plan.price}
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        isPopular ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {plan.period}
                    </span>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3.5 mb-8">
                    <p
                      className={`text-xs font-bold uppercase tracking-wider ${
                        isPopular ? 'text-slate-400' : 'text-slate-400'
                      }`}
                    >
                      What's Included:
                    </p>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                            isPopular
                              ? 'bg-brand-500/20 text-brand-400'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className={isPopular ? 'text-slate-200' : 'text-slate-700'}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan Button */}
                <div>
                  <button
                    type="button"
                    onClick={() => onSelectPlan(plan.id)}
                    className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 ${
                      isPopular
                        ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/30 focus-visible:ring-brand-400'
                        : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm focus-visible:ring-slate-400'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p
                    className={`text-center text-[11px] mt-3 ${
                      isPopular ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {plan.id === 'starter'
                      ? 'No payment required • Instant setup'
                      : 'Selecting this opens the inquiry form below with Pro pre-selected'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security / Guarantee note */}
        <div className="mt-12 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Fictional SaaS prototype • All interactions simulated locally without real transactions</span>
        </div>

      </div>
    </section>
  );
};
