import React, { useMemo, useState } from 'react';
import HeaderNav from './components/HeaderNav';
import HeroSection from './components/HeroSection';
import CategoryGrid from './components/CategoryGrid';
import StandardsExplorer from './components/StandardsExplorer';

const CATEGORIES = [
  { id: 'cereals', label: 'Cereals & Millets', desc: 'Wheat, rice, maize, millets' },
  { id: 'pulses', label: 'Pulses (Legumes)', desc: 'Chana, moong, urad, lentils' },
  { id: 'oils', label: 'Oilseeds & Edible Oils', desc: 'Groundnut, mustard, sunflower' },
  { id: 'milk', label: 'Milk & Milk Products', desc: 'Milk, curd, paneer, ghee' },
  { id: 'meat', label: 'Meat, Poultry & Fish', desc: 'Chicken, mutton, fish' },
  { id: 'fruits', label: 'Fruits & Vegetables', desc: 'Fresh and processed produce' },
  { id: 'spices', label: 'Spices & Condiments', desc: 'Turmeric, pepper, cumin' },
  { id: 'processed', label: 'Processed Foods', desc: 'Snacks, beverages, canned' },
  { id: 'regulations', label: 'Regulations', desc: 'FSSR 2011 & updates' },
  { id: 'resources', label: 'Student Resources', desc: 'MCQs, quizzes, PDFs' },
];

const CATEGORY_DATA = {
  cereals: {
    title: 'Cereals & Millets — Key Standards',
    intro:
      'Staple grains including wheat, rice, maize, and diverse millets. Standards focus on moisture, extraneous matter, damage/infestation, mycotoxins, and heavy metals to ensure safe storage and consumption.',
    parameters: [
      { name: 'Moisture %', limit: '≤ 12–14%', note: 'Lower helps storage stability', key: true },
      { name: 'Extraneous Matter %', limit: '≤ 1%', note: 'Stones, chaff, dust', key: true },
      { name: 'Damaged/Weevilled Grains %', limit: '≤ 3%', note: 'Visual grading' },
      { name: 'Uric Acid (mg/kg)', limit: '≤ 100 mg/kg', note: 'Rodent infestation marker', key: true },
      { name: 'Aflatoxin (µg/kg)', limit: '≤ 30 µg/kg', note: 'Mycotoxin limit', key: true },
      { name: 'Total Ash %', limit: '≤ 1.5%', note: 'Mineral residue' },
      { name: 'Protein % (Wheat)', limit: '11–13%', note: 'Varietal dependence' },
      { name: 'Lead (mg/kg)', limit: '≤ 2.5 mg/kg', note: 'Heavy metal limit' },
    ],
  },
  pulses: {
    title: 'Pulses (Legumes) — Key Standards',
    intro:
      'Protein-rich legumes like chana, moong, urad, and lentils. Standards include moisture, foreign matter, broken and discoloured seeds, mycotoxins, and absence of toxic seeds or added colours.',
    parameters: [
      { name: 'Moisture %', limit: '≤ 14%', note: 'Drying improves shelf life', key: true },
      { name: 'Foreign Matter %', limit: '≤ 1%', note: 'Inorganic/organic impurities', key: true },
      { name: 'Broken Grains %', limit: '≤ 3%', note: 'Hulling/handling losses' },
      { name: 'Damaged/Discoloured %', limit: '≤ 3%', note: 'Visual grading' },
      { name: 'Uric Acid (mg/kg)', limit: '≤ 100 mg/kg', note: 'Infestation indicator' },
      { name: 'Protein %', limit: '20–25%', note: 'Varies by pulse', key: true },
      { name: 'Fat %', limit: '≤ 2%', note: 'Generally low fat' },
      { name: 'Ash %', limit: '≤ 3%', note: 'Mineral residue' },
      { name: 'Aflatoxin (µg/kg)', limit: '≤ 30 µg/kg', note: 'Mycotoxin limit', key: true },
    ],
  },
  oils: {
    title: 'Oilseeds & Edible Oils — Key Standards',
    intro:
      'Covers refined oils and fats such as mustard, sunflower, soybean, and ghee. Key indices: acid and peroxide values, moisture, unsaponifiable matter, and absence of contamination or rancidity.',
    parameters: [
      { name: 'Moisture % (oils)', limit: '≤ 0.25%', note: 'Very low to avoid hydrolysis', key: true },
      { name: 'Acid Value (mg KOH/g)', limit: '≤ 0.5', note: 'Refined oils', key: true },
      { name: 'Peroxide Value (meq/kg)', limit: '≤ 10', note: 'Primary oxidation', key: true },
      { name: 'Unsaponifiable Matter %', limit: '≤ 1%', note: 'Purity indicator' },
      { name: 'Appearance', limit: 'Clear & bright', note: 'No sediment' },
      { name: 'Rancidity', limit: 'Absent', note: 'No off-odour/flavour' },
      { name: 'Mineral/Argemone Oil', limit: 'Absent', note: 'Adulteration check', key: true },
    ],
  },
  milk: {
    title: 'Milk & Milk Products — Key Standards',
    intro:
      'Fluid milk and derivatives like ghee, curd, and paneer. Focus on fat/SNF for type, microbial safety for pasteurized milk, and purity indices for ghee.',
    parameters: [
      { name: 'Fat/SNF (Cow milk)', limit: '≥ 3.2% / 8.3%', note: 'Region-specific minima', key: true },
      { name: 'Fat/SNF (Buffalo milk)', limit: '≥ 6% / 9%', note: 'Higher richness', key: true },
      { name: 'Acidity (as lactic acid)', limit: '0.13–0.18%', note: 'Freshness indicator' },
      { name: 'TPC (CFU/ml)', limit: '≤ 50,000', note: 'Pasteurized milk', key: true },
      { name: 'Coliforms (per ml)', limit: '≤ 10', note: 'Hygiene indicator' },
      { name: 'Yeast/Mould (per g)', limit: '≤ 50', note: 'Fermented products' },
      { name: 'Aflatoxin M1 (µg/kg)', limit: '≤ 0.5', note: 'Carryover from feed', key: true },
      { name: 'Ghee Moisture %', limit: '≤ 0.3%', note: 'Purity index' },
      { name: 'Reichert Value', limit: '26–28', note: 'Volatile FA in ghee' },
      { name: 'Preservatives/Neutralizers', limit: 'Absent', note: 'No adulterants', key: true },
    ],
  },
  meat: {
    title: 'Meat, Poultry & Fish — Key Standards',
    intro:
      'Fresh and frozen meats and fish. Standards center on composition, freshness indicators (TVBN, histamine), pH, microbial safety, and proper storage temperature.',
    parameters: [
      { name: 'Moisture %', limit: '68–77%', note: 'Typical composition', key: true },
      { name: 'Protein %', limit: '17–23%', note: 'Species dependent', key: true },
      { name: 'Fat %', limit: '8–12%', note: 'Cut dependent' },
      { name: 'pH', limit: '5.8–6.2', note: 'Post-mortem pH' },
      { name: 'TVBN (mg/100g)', limit: '≤ 30', note: 'Freshness indicator', key: true },
      { name: 'Histamine (mg/kg, fish)', limit: '≤ 100', note: 'Scombroid fish risk', key: true },
      { name: 'Microbial Safety', limit: 'No Salmonella, E. coli, Listeria', note: 'Absence in 25 g' },
      { name: 'Storage Temp', limit: 'Chilled 0–4 °C; Frozen ≤ –18 °C', note: 'Cold chain' },
    ],
  },
  fruits: {
    title: 'Fruits & Vegetables — Key Standards',
    intro:
      'Quality parameters emphasize cleanliness, maturity, pesticide residues, and compositional indices like TSS and acidity for juices and processed produce.',
    parameters: [
      { name: 'Clean & Sound', limit: 'Free from decay/insects', note: 'Wholesome' },
      { name: 'Pesticide Residues', limit: 'Within limits', note: 'As per MRLs', key: true },
      { name: 'Maturity/Ripeness', limit: 'Proper for type', note: 'Commodity specific' },
      { name: 'TSS (Juices) %', limit: '≥ 10%', note: 'Total soluble solids', key: true },
      { name: 'Acidity %', limit: '≤ 1%', note: 'As citric acid' },
      { name: 'Drained Weight % (canned)', limit: '≥ 50%', note: 'Net content' },
      { name: 'Lead (mg/kg)', limit: '≤ 2', note: 'Heavy metal limit', key: true },
      { name: 'Artificial Colouring', limit: 'Not permitted', note: 'Natural waxing limits apply' },
    ],
  },
  spices: {
    title: 'Spices & Condiments — Key Standards',
    intro:
      'Whole and ground spices such as turmeric, chilli, pepper, and cumin. Focus on moisture, ash, volatile oil, marker compounds, mycotoxins, and freedom from extraneous matter.',
    parameters: [
      { name: 'Moisture %', limit: '≤ 10–12%', note: 'Dry to prevent mould', key: true },
      { name: 'Total Ash %', limit: '≤ 7–9%', note: 'Inorganic residue' },
      { name: 'Acid-Insoluble Ash %', limit: '≤ 1%', note: 'Siliceous matter', key: true },
      { name: 'Volatile Oil %', limit: '≥ 0.3–2%', note: 'Aroma quality', key: true },
      { name: 'Curcumin % (turmeric)', limit: '≥ 2%', note: 'Colour/quality marker' },
      { name: 'Piperine % (pepper)', limit: '≥ 3%', note: 'Pungency marker' },
      { name: 'Aflatoxin (µg/kg)', limit: '≤ 30 µg/kg', note: 'Mycotoxin limit', key: true },
      { name: 'Extraneous Matter %', limit: '≤ 1%', note: 'Foreign matter' },
      { name: 'Artificial Colours', limit: 'Not permitted', note: 'No Sudan dyes' },
    ],
  },
  processed: {
    title: 'Processed Foods — Snapshot',
    intro:
      'Includes packaged snacks, beverages, and canned foods. Standards vary widely; ensure label compliance, additive limits, and microbiological criteria as per product category.',
    parameters: [
      { name: 'Label Compliance', limit: 'As per FSSR 2011', note: 'Ingredients, allergens', key: true },
      { name: 'Additives', limit: 'Within category limits', note: 'INS numbers' },
      { name: 'Microbial Load', limit: 'As per product', note: 'TPC, coliforms' },
      { name: 'Packaging Integrity', limit: 'No leaks/swells', note: 'Canned goods' },
    ],
  },
  regulations: {
    title: 'Regulations — FSSR 2011 & Updates',
    intro:
      'Browse official standards and latest advisories. Use this section to download notifications and understand amendments relevant to each food category.',
    parameters: [
      { name: 'FSSR 2011', limit: 'Link: https://fssai.gov.in/', note: 'Official portal', key: true },
      { name: 'Latest Notifications', limit: 'Advisories & updates', note: 'Keep track for exams' },
      { name: 'Category PDFs', limit: 'Download summaries', note: 'Study offline' },
    ],
  },
  resources: {
    title: 'Student Resources — Practice & Revision',
    intro:
      'Ace your exams with topic-wise MCQs, flashcards, quick notes, and mini case studies such as moisture testing in wheat or aflatoxin in milk powder.',
    parameters: [
      { name: 'Flashcards', limit: 'Key terms & limits', note: 'Quick revision', key: true },
      { name: 'MCQs', limit: 'Topic-wise quizzes', note: 'Timed practice' },
      { name: 'Case Studies', limit: 'Realistic scenarios', note: 'Apply standards' },
      { name: 'Export', limit: 'Tables to CSV', note: 'Offline study' },
    ],
  },
};

function App() {
  const [selected, setSelected] = useState('cereals');
  const [search, setSearch] = useState('');

  const categories = useMemo(() => CATEGORIES, []);
  const currentData = CATEGORY_DATA[selected];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <HeaderNav onSearch={setSearch} />
      <HeroSection />
      <CategoryGrid categories={categories} selectedId={selected} onSelect={setSelected} />
      <StandardsExplorer category={selected} data={currentData} searchQuery={search} />

      <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-neutral-500 dark:text-neutral-400">
          References: FSSR (2011) and subsequent amendments • Codex • BIS. Educational use for Food Engineering students.
        </div>
      </footer>
    </div>
  );
}

export default App;
