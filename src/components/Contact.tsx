import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  Mail,
  User,
  RotateCcw,
} from 'lucide-react';

interface ContactProps {
  selectedPlan: 'starter' | 'pro';
  onPlanChange: (plan: 'starter' | 'pro') => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  plan?: string;
  message?: string;
}

export const Contact: React.FC<ContactProps> = ({ selectedPlan, onPlanChange }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedSnapshot, setSubmittedSnapshot] = useState<{
    name: string;
    email: string;
    plan: 'starter' | 'pro';
    message: string;
  } | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Please enter a valid full name (at least 2 characters).';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g., name@example.com).';
    }

    // Plan validation
    if (!selectedPlan) {
      newErrors.plan = 'Please select an interested plan.';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Please provide a brief message or project description.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePlanSelect = (plan: 'starter' | 'pro') => {
    onPlanChange(plan);
    if (errors.plan) {
      setErrors((prev) => ({ ...prev, plan: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      plan: true,
      message: true,
    });

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate realistic frontend submission without external APIs
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmittedSnapshot({
        ...formData,
        plan: selectedPlan,
      });
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      message: '',
    });
    onPlanChange('pro');
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
    setSubmittedSnapshot(null);
  };

  return (
    <section id="contact" className="py-24 bg-white border-b border-slate-200/80 relative scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-50 border border-brand-200/70 text-brand-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Ready to make your work flow?
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Send us a message or request a live demonstration. We typically respond within 24 hours.
          </p>
        </div>

        {/* Main Form or Success Container */}
        <div className="bg-slate-50/70 rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-card">
          {isSubmitted && submittedSnapshot ? (
            /* Success Message Card */
            <div className="py-8 px-4 text-center max-w-xl mx-auto animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                Inquiry Received Successfully!
              </h3>
              <p className="text-sm text-slate-600 mb-8 leading-relaxed">
                Thank you, <strong className="text-slate-900">{submittedSnapshot.name}</strong>. We've logged your request for the{' '}
                <span className="font-bold text-brand-600 uppercase">
                  {submittedSnapshot.plan} Plan
                </span>. A confirmation has been simulated for{' '}
                <strong className="text-slate-900">{submittedSnapshot.email}</strong>.
              </p>

              {/* Inquiry Summary Box */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 text-left text-xs space-y-2 mb-8 shadow-xs">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Contact:</span>
                  <span className="font-semibold text-slate-800">{submittedSnapshot.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Email:</span>
                  <span className="font-semibold text-slate-800">{submittedSnapshot.email}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Selected Plan:</span>
                  <span className="font-bold text-brand-600 uppercase">{submittedSnapshot.plan}</span>
                </div>
                <div className="pt-1">
                  <span className="text-slate-500 block mb-1">Message Preview:</span>
                  <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg italic">
                    "{submittedSnapshot.message}"
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 active:scale-[0.98] transition-all shadow-xs"
              >
                <RotateCcw className="w-4 h-4 text-slate-500" />
                <span>Submit Another Inquiry</span>
              </button>
            </div>
          ) : (
            /* Interactive Contact Form */
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur('name')}
                      placeholder="e.g. Alex Morgan"
                      aria-invalid={touched.name && !!errors.name}
                      aria-describedby={touched.name && errors.name ? "name-error" : undefined}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white border transition-colors focus:outline-none ${
                        touched.name && errors.name
                          ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-200'
                          : 'border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500'
                      }`}
                    />
                  </div>
                  {touched.name && errors.name && (
                    <p id="name-error" className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur('email')}
                      placeholder="alex@company.com"
                      aria-invalid={touched.email && !!errors.email}
                      aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white border transition-colors focus:outline-none ${
                        touched.email && errors.email
                          ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-200'
                          : 'border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500'
                      }`}
                    />
                  </div>
                  {touched.email && errors.email && (
                    <p id="email-error" className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </p>
                  )}
                </div>

              </div>

              {/* Plan Selection (Segmented Control) */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                  Interested Plan <span className="text-rose-500">*</span>
                </label>
                <div
                  role="radiogroup"
                  aria-label="Interested Plan"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  
                  {/* Starter Option */}
                  <div
                    role="radio"
                    aria-checked={selectedPlan === 'starter'}
                    tabIndex={0}
                    onClick={() => handlePlanSelect('starter')}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        handlePlanSelect('starter');
                      }
                    }}
                    className={`cursor-pointer rounded-2xl p-4 border transition-all flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                      selectedPlan === 'starter'
                        ? 'bg-white border-brand-500 ring-2 ring-brand-500/20 shadow-xs'
                        : 'bg-white/60 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          selectedPlan === 'starter'
                            ? 'border-brand-600 bg-brand-600'
                            : 'border-slate-300'
                        }`}
                      >
                        {selectedPlan === 'starter' && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Starter Plan</p>
                        <p className="text-xs text-slate-500">₹0 / month • Personal workspace</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      Free
                    </span>
                  </div>

                  {/* Pro Option */}
                  <div
                    role="radio"
                    aria-checked={selectedPlan === 'pro'}
                    tabIndex={0}
                    onClick={() => handlePlanSelect('pro')}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        handlePlanSelect('pro');
                      }
                    }}
                    className={`cursor-pointer rounded-2xl p-4 border transition-all flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                      selectedPlan === 'pro'
                        ? 'bg-white border-brand-500 ring-2 ring-brand-500/20 shadow-xs'
                        : 'bg-white/60 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          selectedPlan === 'pro'
                            ? 'border-brand-600 bg-brand-600'
                            : 'border-slate-300'
                        }`}
                      >
                        {selectedPlan === 'pro' && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Pro Plan</p>
                        <p className="text-xs text-slate-500">₹499 / month • Advanced AI & Teams</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                      Popular
                    </span>
                  </div>

                </div>
                {touched.plan && errors.plan && (
                  <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.plan}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
                  Message / Project Needs <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur('message')}
                    placeholder="Tell us about your team size, workflow challenges, or key deadlines..."
                    aria-invalid={touched.message && !!errors.message}
                    aria-describedby={touched.message && errors.message ? "message-error" : undefined}
                    className={`w-full p-4 rounded-xl text-sm bg-white border transition-colors focus:outline-none ${
                      touched.message && errors.message
                        ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-200'
                        : 'border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500'
                    }`}
                  />
                </div>
                {touched.message && errors.message && (
                  <p id="message-error" className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl font-bold text-sm sm:text-base text-white bg-slate-900 hover:bg-brand-600 active:scale-[0.99] transition-all duration-200 shadow-md hover:shadow-brand-500/25 flex items-center justify-center gap-2 disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Processing Request...</span>
                    </span>
                  ) : (
                    <>
                      <span>Send Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-slate-500 mt-3">
                  Frontend demonstration • Validation and simulated submission handled via React state.
                </p>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
};
