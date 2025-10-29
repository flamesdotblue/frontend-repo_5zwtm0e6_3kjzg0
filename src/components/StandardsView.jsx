import { useMemo, useState } from 'react';
import { Download, Search } from 'lucide-react';

// Minimal representative data captured from the prompt. Values are typical upper limits or ranges.
const CATEGORY_DATA = {
  cereals: {
    title: 'Cereals & Millets',
    intro: 'Staple grains rich in carbohydrates and dietary fibre. Used for flour, cooked grains, malt, flakes and fermented products.',
    examples: ['Wheat', 'Rice', 'Maize', 'Ragi', 'Jowar', 'Bajra'],
    standards: [
      { parameter: 'Moisture %', limit: '≤ 12–14', value: 13, unit: '%' },
      { parameter: 'Extraneous Matter %', limit: '≤ 1', value: 0.8, unit: '%' },
      { parameter: 'Damaged/Weevilled %', limit: '≤ 3', value: 2.2, unit: '%' },
      { parameter: 'Uric Acid (mg/kg)', limit: '≤ 100', value: 60, unit: 'mg/kg' },
      { parameter: 'Aflatoxin (µg/kg)', limit: '≤ 30', value: 12, unit: 'µg/kg' },
      { parameter: 'Total Ash %', limit: '≤ 1.5', value: 1.2, unit: '%' },
      { parameter: 'Protein % (wheat)', limit: '11–13', value: 12, unit: '%' },
      { parameter: 'Lead (mg/kg)', limit: '≤ 2.5', value: 0.7, unit: 'mg/kg' },
    ],
    glossaryKeys: ['Aflatoxin', 'Uric Acid', 'Ash', 'Protein']
  },
  pulses: {
    title: 'Pulses (Legumes)',
    intro: 'Protein-rich seeds consumed whole or split; used for dals, flours and fermented products.',
    examples: ['Chana', 'Moong', 'Urad', 'Arhar', 'Masoor', 'Peas'],
    standards: [
      { parameter: 'Moisture %', limit: '≤ 14', value: 12.5, unit: '%' },
      { parameter: 'Foreign Matter %', limit: '≤ 1', value: 0.6, unit: '%' },
      { parameter: 'Broken Grains %', limit: '≤ 3', value: 2, unit: '%' },
      { parameter: 'Damaged/Discoloured %', limit: '≤ 3', value: 1.5, unit: '%' },
      { parameter: 'Uric Acid (mg/kg)', limit: '≤ 100', value: 50, unit: 'mg/kg' },
      { parameter: 'Protein %', limit: '20–25', value: 22, unit: '%' },
      { parameter: 'Fat %', limit: '≤ 2', value: 1.2, unit: '%' },
      { parameter: 'Total Ash %', limit: '≤ 3', value: 2.1, unit: '%' },
      { parameter: 'Aflatoxin (µg/kg)', limit: '≤ 30', value: 10, unit: 'µg/kg' },
    ],
    glossaryKeys: ['Aflatoxin', 'Protein']
  },
  oils: {
    title: 'Oilseeds & Edible Oils',
    intro: 'Lipid-rich foods and refined oils for cooking and processing. Quality assessed by rancidity indicators and purity.',
    examples: ['Groundnut', 'Mustard', 'Sunflower', 'Sesame', 'Soybean', 'Ghee'],
    standards: [
      { parameter: 'Moisture % (oils)', limit: '≤ 0.25', value: 0.1, unit: '%' },
      { parameter: 'Acid Value (mg KOH/g)', limit: '≤ 0.5 (refined)', value: 0.2, unit: 'mg KOH/g' },
      { parameter: 'Peroxide Value (meq/kg)', limit: '≤ 10', value: 4, unit: 'meq/kg' },
      { parameter: 'Unsaponifiable Matter %', limit: '≤ 1', value: 0.6, unit: '%' },
      { parameter: 'Appearance', limit: 'Clear & bright; no rancidity', value: 'Complies', unit: '' },
    ],
    glossaryKeys: ['Acid Value', 'Peroxide Value']
  },
  milk: {
    title: 'Milk & Milk Products',
    intro: 'Nutrient-dense emulsions used fresh and fermented. Safety and compositional criteria are critical for public health.',
    examples: ['Cow Milk', 'Buffalo Milk', 'Ghee', 'Paneer', 'Curd', 'Milk Powder'],
    standards: [
      { parameter: 'Fat % (Cow/Buffalo)', limit: '≥ 3.2 / ≥ 6.0', value: 4, unit: '%' },
      { parameter: 'SNF % (Cow/Buffalo)', limit: '≥ 8.3 / ≥ 9.0', value: 8.8, unit: '%' },
      { parameter: 'Acidity % (as lactic acid)', limit: '0.13–0.18', value: 0.15, unit: '%' },
      { parameter: 'TPC (CFU/ml)', limit: '≤ 50,000 (pasteurized)', value: 20000, unit: 'CFU/ml' },
      { parameter: 'Coliforms (per ml)', limit: '≤ 10', value: 5, unit: 'per ml' },
      { parameter: 'Aflatoxin M₁ (µg/kg)', limit: '≤ 0.5', value: 0.2, unit: 'µg/kg' },
      { parameter: 'Ghee Moisture %', limit: '≤ 0.3', value: 0.2, unit: '%' },
    ],
    glossaryKeys: ['SNF', 'TPC', 'Aflatoxin']
  },
  meat: {
    title: 'Meat, Poultry & Fish',
    intro: 'Perishable protein foods requiring strict temperature control and hygiene.',
    examples: ['Chicken', 'Mutton', 'Fish', 'Prawns', 'Beef', 'Pork'],
    standards: [
      { parameter: 'Moisture %', limit: '68–77', value: 72, unit: '%' },
      { parameter: 'Protein %', limit: '17–23', value: 20, unit: '%' },
      { parameter: 'Fat %', limit: '8–12', value: 10, unit: '%' },
      { parameter: 'pH', limit: '5.8–6.2', value: 6.0, unit: '' },
      { parameter: 'TVBN (mg/100g)', limit: '≤ 30', value: 18, unit: 'mg/100g' },
      { parameter: 'Histamine (mg/kg)', limit: '≤ 100 (fish)', value: 40, unit: 'mg/kg' },
      { parameter: 'Microbial Safety', limit: 'No Salmonella/E. coli/Listeria', value: 'Complies', unit: '' },
    ],
    glossaryKeys: ['TVBN']
  },
  fruits: {
    title: 'Fruits & Vegetables',
    intro: 'Minimally processed plant foods; standards emphasize wholesomeness and residues.',
    examples: ['Apple', 'Banana', 'Mango', 'Tomato', 'Potato', 'Spinach'],
    standards: [
      { parameter: 'Clean & sound', limit: 'Free from decay/infestation', value: 'Complies', unit: '' },
      { parameter: 'TSS % (juices)', limit: '≥ 10', value: 12, unit: '%' },
      { parameter: 'Acidity %', limit: '≤ 1', value: 0.6, unit: '%' },
      { parameter: 'Drained weight % (canned)', limit: '≥ 50', value: 55, unit: '%' },
      { parameter: 'Lead (mg/kg)', limit: '≤ 2', value: 0.4, unit: 'mg/kg' },
    ],
    glossaryKeys: []
  },
  spices: {
    title: 'Spices & Condiments',
    intro: 'Aromatic plant parts; quality assessed by moisture, ash and marker compounds.',
    examples: ['Turmeric', 'Chilli', 'Pepper', 'Cumin', 'Coriander', 'Cardamom'],
    standards: [
      { parameter: 'Moisture %', limit: '≤ 10–12', value: 10, unit: '%' },
      { parameter: 'Total Ash %', limit: '≤ 7–9', value: 7.5, unit: '%' },
      { parameter: 'Acid-Insoluble Ash %', limit: '≤ 1', value: 0.5, unit: '%' },
      { parameter: 'Volatile Oil %', limit: '≥ 0.3–2', value: 1.2, unit: '%' },
      { parameter: 'Aflatoxin (µg/kg)', limit: '≤ 30', value: 8, unit: 'µg/kg' },
    ],
    glossaryKeys: ['Aflatoxin']
  },
};

const GLOSSARY = {
  Aflatoxin: 'Toxic metabolites from Aspergillus species; strict limits due to carcinogenicity.',
  'Aflatoxin M₁': 'Hydroxylated metabolite of aflatoxin B₁ found in milk; very low tolerance limits.',
  'Acid Value': 'Measure of free fatty acids in fats/oils; higher values indicate hydrolytic rancidity.',
  'Peroxide Value': 'Indicator of primary oxidation in fats/oils; higher values indicate rancidity.',
  TVBN: 'Total volatile basic nitrogen; freshness index for fish/meat.',
  'SNF': 'Solids-Not-Fat in milk (proteins, lactose, minerals); used with fat% to type milk.',
  TPC: 'Total Plate Count; general microbial load indicator.',
  'Uric Acid': 'Marker of insect contamination in cereals and pulses.',
  Ash: 'Mineral residue after complete combustion of organic matter.',
  Protein: 'Macronutrient essential for growth; varies by commodity and type.',
};

function toNumber(value) {
  if (typeof value === 'number') return value;
  return NaN; // Non-numeric values are not charted
}

function exportCSV(rows, filename = 'fssai_standards.csv') {
  const header = Object.keys(rows[0] || {}).join(',');
  const body = rows.map(r => Object.values(r).map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
  const csv = header + '\n' + body;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function StandardsView({ selectedKey }) {
  const [query, setQuery] = useState('');
  const category = CATEGORY_DATA[selectedKey] || CATEGORY_DATA.cereals;

  const filteredStandards = useMemo(() => {
    if (!query.trim()) return category.standards;
    const q = query.toLowerCase();
    return category.standards.filter(s => s.parameter.toLowerCase().includes(q));
  }, [query, category]);

  const numericForChart = filteredStandards
    .map(s => ({ ...s, num: toNumber(s.value) }))
    .filter(s => !Number.isNaN(s.num));

  const maxValue = Math.max(10, ...numericForChart.map(s => s.num));

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">{category.title}</h3>
        <p className="mt-2 max-w-3xl text-stone-700 dark:text-stone-300">{category.intro}</p>
        <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">Examples: {category.examples.join(', ')}</p>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-3 py-2 shadow-sm dark:border-stone-700 dark:bg-stone-800">
          <Search className="h-4 w-4 text-stone-500" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search parameter (e.g., Aflatoxin)"
            className="w-64 max-w-full bg-transparent text-sm text-stone-800 placeholder-stone-400 focus:outline-none dark:text-stone-100"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => exportCSV(category.standards, `${selectedKey}_standards.csv`)}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm text-white shadow hover:bg-emerald-700"
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-800 shadow hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
          >
            Print / PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table */}
        <div className="lg:col-span-2 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm dark:border-stone-700 dark:bg-stone-900">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="bg-stone-50 text-stone-700 dark:bg-stone-800 dark:text-stone-200">
                  <th className="px-4 py-3 font-semibold">Parameter</th>
                  <th className="px-4 py-3 font-semibold">Limit</th>
                  <th className="px-4 py-3 font-semibold">Example Value</th>
                  <th className="px-4 py-3 font-semibold">Unit</th>
                </tr>
              </thead>
              <tbody>
                {filteredStandards.map((row, idx) => (
                  <tr key={idx} className="border-t border-stone-100 text-stone-800 dark:border-stone-800 dark:text-stone-100">
                    <td className="px-4 py-3 whitespace-nowrap">{row.parameter}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{row.limit}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{row.value}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{row.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart */}
        <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-700 dark:bg-stone-900">
          <h4 className="mb-2 font-semibold text-stone-900 dark:text-stone-100">Visual Limits</h4>
          <p className="mb-4 text-xs text-stone-600 dark:text-stone-400">Numeric parameters only (scaled to max of shown values)</p>
          <div className="space-y-3">
            {numericForChart.map((row, idx) => {
              const width = Math.max(4, Math.min(100, (row.num / maxValue) * 100));
              return (
                <div key={idx}>
                  <div className="flex items-center justify-between text-xs text-stone-700 dark:text-stone-300">
                    <span className="truncate pr-2">{row.parameter}</span>
                    <span>{row.value} {row.unit}</span>
                  </div>
                  <div className="mt-1 h-2.5 w-full rounded-full bg-stone-100 dark:bg-stone-800">
                    <div
                      className="h-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-amber-400"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {numericForChart.length === 0 && (
              <p className="text-sm text-stone-600 dark:text-stone-400">No numeric parameters to plot.</p>
            )}
          </div>

          {/* Glossary */}
          <div className="mt-6">
            <h5 className="mb-2 font-semibold text-stone-900 dark:text-stone-100">Notes & Glossary</h5>
            <ul className="space-y-2 text-sm">
              {category.glossaryKeys.map((key) => (
                <li key={key} className="rounded-md border border-stone-200 bg-stone-50 p-2 dark:border-stone-700 dark:bg-stone-800">
                  <span className="font-medium text-stone-800 dark:text-stone-100">{key}: </span>
                  <span className="text-stone-700 dark:text-stone-300">{GLOSSARY[key]}</span>
                </li>
              ))}
              {category.glossaryKeys.length === 0 && (
                <li className="text-stone-600 dark:text-stone-400">No special notes for this view.</li>
              )}
            </ul>
            <p className="mt-3 text-xs text-stone-500 dark:text-stone-400">Refer official FSSR 2011 and amendments for legal definitions and full schedules.</p>
          </div>
        </div>
      </div>

      {/* Resources anchor */}
      <div id="resources" className="mt-12 rounded-xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-900">
        <h4 className="text-lg font-semibold text-stone-900 dark:text-stone-100">Student Resources</h4>
        <ul className="mt-3 list-disc pl-5 text-sm text-stone-700 dark:text-stone-300">
          <li>Flashcards & MCQs by category (Cereals, Pulses, Oils, Milk, Meat, Spices).</li>
          <li>Quizzes: Test your knowledge on FSSAI parameters.</li>
          <li>Case studies: Wheat moisture testing, Aflatoxin in milk powder.</li>
          <li>Export tables as CSV or use Print for PDF.</li>
          <li>
            Regulations quick links: <a className="text-emerald-700 underline dark:text-emerald-300" href="https://www.fssai.gov.in/" target="_blank" rel="noreferrer">FSSAI</a> • <a className="text-emerald-700 underline dark:text-emerald-300" href="https://fssai.gov.in/cms/food-safety-and-standards-regulations.php" target="_blank" rel="noreferrer">FSSR 2011</a>
          </li>
        </ul>
      </div>
    </section>
  );
}
