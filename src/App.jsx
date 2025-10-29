import { useEffect, useRef, useState } from 'react';
import Hero from './components/Hero';
import NavCards from './components/NavCards';
import StandardsView from './components/StandardsView';
import Footer from './components/Footer';

function App() {
  const [selected, setSelected] = useState('cereals');
  const [dark, setDark] = useState(false);
  const exploreRef = useRef(null);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [dark]);

  const handleExplore = () => {
    exploreRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-stone-50 text-stone-900 dark:from-stone-950 dark:via-stone-900 dark:to-stone-900 dark:text-stone-100">
      <Hero onExploreClick={handleExplore} dark={dark} setDark={setDark} />

      <div ref={exploreRef}>
        <NavCards onSelect={(key) => setSelected(key)} />
        <StandardsView selectedKey={selected} />
      </div>

      <Footer />
    </div>
  );
}

export default App;
