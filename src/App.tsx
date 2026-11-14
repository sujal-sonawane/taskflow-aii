import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ValueStrip } from './components/ValueStrip';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { ProductPreview } from './components/ProductPreview';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'pro'>('pro');

  const scrollToContact = (plan?: 'starter' | 'pro') => {
    if (plan) {
      setSelectedPlan(plan);
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPricingPlan = (planId: 'starter' | 'pro') => {
    setSelectedPlan(planId);
    scrollToContact(planId);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      {/* Sticky Top Navigation */}
      <Navbar onGetStartedClick={() => scrollToContact('starter')} />

      {/* Main Page Content */}
      <main className="flex-grow">
        {/* Hero Section with Interactive Dashboard Illustration */}
        <Hero
          onStartForFree={() => scrollToContact('starter')}
          onExploreFeatures={scrollToFeatures}
        />

        {/* Trust / Value Proposition Strip */}
        <ValueStrip />

        {/* Core Product Features */}
        <Features />

        {/* 3-Step 'How It Works' Section */}
        <HowItWorks />

        {/* Interactive Deep-Dive Product Preview Dashboard */}
        <ProductPreview />

        {/* Transparent Pricing Plans */}
        <Pricing onSelectPlan={handleSelectPricingPlan} />

        {/* Accessible Frequently Asked Questions Accordion */}
        <FAQ />

        {/* Validated Contact / Demo Request Form */}
        <Contact
          selectedPlan={selectedPlan}
          onPlanChange={(plan) => setSelectedPlan(plan)}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
