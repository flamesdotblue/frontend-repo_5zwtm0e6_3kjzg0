import { motion } from 'framer-motion';

export default function Hero({ onExploreClick, dark, setDark }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-amber-500/10 to-stone-300/40" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24">
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-emerald-800 dark:text-emerald-300"
            >
              FSSAI Food Standards – Student Portal
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-4 text-base sm:text-lg text-stone-700 dark:text-stone-300 max-w-2xl"
            >
              Understand, Analyze, and Apply FSSAI Food Quality Standards. Explore key parameters, 
              visual comparisons, and exam-oriented resources curated for Food Engineering students.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={onExploreClick}
                className="inline-flex items-center rounded-lg bg-emerald-600 px-5 py-3 text-white shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                Explore Standards
              </button>
              <a
                href="#resources"
                className="rounded-lg border border-stone-300 bg-white/60 px-5 py-3 text-stone-800 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:border-stone-700 dark:bg-stone-800/60 dark:text-stone-100"
              >
                Student Resources
              </a>
            </motion.div>
          </div>
          <div className="hidden sm:block">
            <button
              onClick={() => setDark(!dark)}
              className="rounded-full border border-stone-300 bg-white/70 px-4 py-2 text-sm text-stone-800 shadow hover:bg-white dark:border-stone-700 dark:bg-stone-800/70 dark:text-stone-100"
              aria-label="Toggle dark mode"
            >
              {dark ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-4 opacity-90">
          <div className="h-2 rounded-full bg-emerald-500/60" />
          <div className="h-2 rounded-full bg-amber-400/60" />
          <div className="h-2 rounded-full bg-stone-400/60" />
        </div>
      </div>
    </section>
  );
}
