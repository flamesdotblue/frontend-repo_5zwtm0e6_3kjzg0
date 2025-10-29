import React from 'react';
import { Leaf, Apple, Fish, FlaskConical, Droplet, BookOpen, BarChart3, FileDown, Layers } from 'lucide-react';

const ICONS = {
  cereals: Layers,
  pulses: Leaf,
  oils: Droplet,
  milk: FlaskConical,
  meat: Fish,
  fruits: Apple,
  spices: BookOpen,
  processed: BarChart3,
  regulations: FileDown,
  resources: BookOpen,
};

const CategoryGrid = ({ categories, selectedId, onSelect }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-xl sm:text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">Quick Access</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {categories.map((cat) => {
          const Icon = ICONS[cat.id] || Leaf;
          const active = selectedId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`group relative p-4 rounded-xl border text-left transition focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                active
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
                  : 'bg-white/70 dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800 hover:border-emerald-300'
              }`}
            >
              <div className={`w-10 h-10 inline-flex items-center justify-center rounded-lg mb-3 ${
                active ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200'
              }`}>
                <Icon size={18} />
              </div>
              <div className="font-semibold text-neutral-800 dark:text-neutral-100 text-sm sm:text-base">{cat.label}</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">{cat.desc}</div>
              {active && (
                <span className="absolute right-3 top-3 text-emerald-600 dark:text-emerald-300 text-xs">Selected</span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryGrid;
