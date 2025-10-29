import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-amber-50 to-stone-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-900" />
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-800 dark:text-neutral-100">
              Understand, Analyze, and Apply FSSAI Food Quality Standards
            </h1>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl">
              A modern learning portal for Food Engineering students. Explore category-wise standards, visualize limits, and prepare for exams with concise, exam-focused resources.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 text-sm">Cereals & Millets</span>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 text-sm">Milk & Milk Products</span>
              <span className="px-3 py-1 rounded-full bg-stone-200 text-stone-800 dark:bg-stone-800 dark:text-stone-200 text-sm">Spices & Condiments</span>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur p-6 shadow-sm">
              <div className="h-full w-full grid grid-cols-3 gap-3">
                <div className="col-span-2 bg-gradient-to-br from-emerald-200/40 to-emerald-400/20 dark:from-emerald-900/30 dark:to-emerald-700/20 rounded-xl" />
                <div className="space-y-3">
                  <div className="h-8 rounded-md bg-amber-200/40 dark:bg-amber-900/30" />
                  <div className="h-8 rounded-md bg-amber-200/40 dark:bg-amber-900/30" />
                  <div className="h-8 rounded-md bg-amber-200/40 dark:bg-amber-900/30" />
                  <div className="h-8 rounded-md bg-amber-200/40 dark:bg-amber-900/30" />
                </div>
              </div>
              <div className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">Dashboard preview • Earth-tone theme</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
