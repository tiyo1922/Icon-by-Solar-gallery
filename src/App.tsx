import { useState, useEffect } from 'react';
import { ActiveTab, IconItem, IconVariant, CategoryInfo, IconsIndexData } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { IconModal } from './components/IconModal';
import { ReactDocs } from './components/ReactDocs';
import { LaravelDocs } from './components/LaravelDocs';
import { AboutView } from './components/AboutView';
import { Toast } from './components/Toast';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('icons');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [icons, setIcons] = useState<IconItem[]>([]);
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [totalVariants, setTotalVariants] = useState<number>(3738);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedVariant, setSelectedVariant] = useState<IconVariant>('outline');

  const [selectedIcon, setSelectedIcon] = useState<IconItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 2800);
  };

  useEffect(() => {
    fetch('./data/icons.json')
      .then((r) => r.json())
      .then((data: IconsIndexData) => {
        setIcons(data.icons);
        setCategories(data.categories);
        setTotalVariants(data.totalVariants);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load icons.json', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && activeTab === 'icons' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        const input = document.getElementById('hero-search-input');
        if (input) input.focus();
      } else if (e.key === 'Escape' && selectedIcon) {
        setSelectedIcon(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, selectedIcon]);

  return (
    <>
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        setTheme={setTheme}
      />

      <main style={{ flex: 1 }}>
        {activeTab === 'icons' && (
          <>
            <Hero
              totalIcons={icons.length || 1246}
              totalVariants={totalVariants || 3738}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setActiveTab={setActiveTab}
            />

            {loading ? (
              <div style={{ textAlign: 'center', padding: '64px', color: 'var(--text-muted)' }}>
                Loading icon catalog...
              </div>
            ) : (
              <Catalog
                icons={icons}
                categories={categories}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedVariant={selectedVariant}
                setSelectedVariant={setSelectedVariant}
                onSelectIcon={(icon) => setSelectedIcon(icon)}
              />
            )}
          </>
        )}

        {activeTab === 'react' && <ReactDocs showToast={showToast} />}
        {activeTab === 'laravel' && <LaravelDocs showToast={showToast} />}
        {activeTab === 'about' && <AboutView />}
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <strong>Icon by Solar</strong> • Curated SVG icon collection for developers.
            <div style={{ fontSize: '0.75rem', marginTop: '4px', color: 'var(--text-dim)' }}>
              Artwork by 480 Design (CC BY 4.0) • Code & Library under MIT License.
            </div>
          </div>
          <div className="footer-links">
            <button className="footer-link" onClick={() => setActiveTab('icons')}>Icons</button>
            <button className="footer-link" onClick={() => setActiveTab('react')}>React</button>
            <button className="footer-link" onClick={() => setActiveTab('laravel')}>Laravel</button>
            <button className="footer-link" onClick={() => setActiveTab('about')}>About</button>
            <a
              href="https://github.com/tiyo1922/Icon-by-Solar"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>

      <IconModal
        icon={selectedIcon}
        initialVariant={selectedVariant}
        onClose={() => setSelectedIcon(null)}
        showToast={showToast}
      />

      <Toast message={toastMessage} />
    </>
  );
}
