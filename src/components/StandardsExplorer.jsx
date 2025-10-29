import React, { useMemo, useState } from 'react';
import { BarChart3, FileDown } from 'lucide-react';

const numberFromLimit = (limit) => {
  if (typeof limit === 'number') return limit;
  if (!limit) return 0;
  // Extract first number from strings like "≤ 14%", "0–4 °C", "≤ 30 µg/kg"
  const match = String(limit).replace(/,/g, '.').match(/\d+(?:\.\d+)?/);
  return match ? parseFloat(match[0]) : 0;
};

const TableRow = ({ name, limit, note }) => (
  <tr className="border-b border-neutral-200/70 dark:border-neutral-800/70">
    <td className="py-2 px-3 text-sm text-neutral-800 dark:text-neutral-100 font-medium">{name}</td>
    <td className="py-2 px-3 text-sm text-neutral-700 dark:text-neutral-300">{limit}</td>
    <td className="py-2 px-3 text-xs text-neutral-500 dark:text-neutral-400">{note || '-'}</td>
  </tr>
);

const MiniBar = ({ value, max }) => {
  const width = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
      <div className="h-full bg-emerald-500 dark:bg-emerald-400" style={{ width: `${width}%` }} />
    </div>
  );
};

const StandardsExplorer = ({ category, data, searchQuery }) => {
  const [onlyKey, setOnlyKey] = useState(false);

  const filtered = useMemo(() => {
    const q = (searchQuery || '').toLowerCase();
    let arr = data.parameters;
    if (q) {
      arr = arr.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (onlyKey) {
      arr = arr.filter((p) => p.key === true);
    }
    return arr;
  }, [data.parameters, searchQuery, onlyKey]);

  const maxVal = useMemo(() => {
    return filtered.reduce((m, p) => Math.max(m, numberFromLimit(p.limit)), 0);
  }, [filtered]);

  const exportCSV = () => {
    const headers = ['Parameter', 'Limit', 'Notes'];
    const rows = filtered.map((p) => [p.name, String(p.limit), p.note || '']);
    const csv = [headers, ...rows].map((r) => r.map((x) => `"${String(x).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${category}_standards.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-neutral-800 dark:text-neutral-100">{data.title}</h3>
        <p className="mt-2 text-neutral-600 dark:text-neutral-300 max-w-3xl">{data.intro}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur">
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-200">
              <BarChart3 size={18} />
              <span className="font-semibold">FSSAI Standards Table</span>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                <input type="checkbox" checked={onlyKey} onChange={(e) => setOnlyKey(e.target.checked)} />
                Key parameters only
              </label>
              <button onClick={exportCSV} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white text-sm">
                <FileDown size={16} /> Export CSV
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left border-b border-neutral-200 dark:border-neutral-800">
                  <th className="py-2 px-3 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-semibold">Parameter</th>
                  <th className="py-2 px-3 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-semibold">Limit</th>
                  <th className="py-2 px-3 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <TableRow key={p.name} name={p.name} limit={p.limit} note={p.note} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 p-4 backdrop-blur">
            <div className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-2">Visual Limits</div>
            <div className="space-y-3">
              {filtered.slice(0, 8).map((p) => {
                const val = numberFromLimit(p.limit);
                return (
                  <div key={p.name}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-neutral-600 dark:text-neutral-300">{p.name}</span>
                      <span className="text-neutral-500 dark:text-neutral-400">{p.limit}</span>
                    </div>
                    <MiniBar value={val} max={maxVal || 1} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 p-4 backdrop-blur">
            <div className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-2">Notes & Glossary</div>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
              <li><span className="font-semibold">Aflatoxin:</span> Toxic metabolites from Aspergillus; limits in grains, milk (M1).</li>
              <li><span className="font-semibold">SNF:</span> Solids-not-fat fraction in milk (proteins, lactose, minerals).</li>
              <li><span className="font-semibold">TVBN:</span> Total volatile basic nitrogen indicating fish/meat freshness.</li>
              <li><span className="font-semibold">Acid Value:</span> mg KOH/g oil; higher values indicate hydrolytic rancidity.</li>
              <li><span className="font-semibold">Peroxide Value:</span> meq O2/kg; measures primary oxidation in oils.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StandardsExplorer;
