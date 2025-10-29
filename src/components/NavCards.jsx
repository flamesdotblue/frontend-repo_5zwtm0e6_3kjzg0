import { Wheat, Fish, Apple, Droplet, BookOpenCheck, ShieldCheck, FlaskConical } from 'lucide-react';

const cards = [
  { key: 'cereals', title: 'Cereals & Millets', icon: Wheat, color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200' },
  { key: 'pulses', title: 'Pulses (Legumes)', icon: FlaskConical, color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200' },
  { key: 'oils', title: 'Oilseeds & Edible Oils', icon: Droplet, color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200' },
  { key: 'milk', title: 'Milk & Milk Products', icon: ShieldCheck, color: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200' },
  { key: 'meat', title: 'Meat, Poultry & Fish', icon: Fish, color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200' },
  { key: 'fruits', title: 'Fruits & Vegetables', icon: Apple, color: 'bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-200' },
  { key: 'spices', title: 'Spices & Condiments', icon: FlaskConical, color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200' },
  { key: 'processed', title: 'Processed Foods', icon: ShieldCheck, color: 'bg-stone-100 text-stone-800 dark:bg-stone-900/40 dark:text-stone-200' },
  { key: 'regulations', title: 'Regulations', icon: ShieldCheck, color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200' },
  { key: 'resources', title: 'Student Resources', icon: BookOpenCheck, color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200' },
];

export default function NavCards({ onSelect }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-stone-800 dark:text-stone-100">Quick Access</h2>
        <p className="text-sm text-stone-600 dark:text-stone-400">Tap a card to view category standards</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {cards.map(({ key, title, icon: Icon, color }) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`group relative overflow-hidden rounded-xl p-4 text-left shadow-sm transition hover:shadow-md ${color}`}
          >
            <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-white/20 opacity-50" />
            <Icon className="h-6 w-6" />
            <p className="mt-3 font-semibold leading-tight">{title}</p>
            <span className="mt-1 block text-xs opacity-70">View details</span>
          </button>
        ))}
      </div>
    </section>
  );
}
