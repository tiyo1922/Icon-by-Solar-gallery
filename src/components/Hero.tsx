import React from 'react';
import { Search, Sparkles, Code, Terminal, Compass } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeroProps {
  totalIcons: number;
  totalVariants: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Hero: React.FC<HeroProps> = ({
  totalIcons,
  totalVariants,
  searchQuery,
  setSearchQuery,
  setActiveTab,
}) => {
  return (
    <section className="hero-section">
      <div className="hero-glow" />
      <div className="hero-content">
        <div className="hero-pill">
          <Sparkles size={14} />
          <span>v1.0.3 Official Release — Outline, Bold & Bold Duotone</span>
        </div>

        <h1 className="hero-title">
          Explore <span className="hero-title-gradient">{totalVariants.toLocaleString()}+</span> Solar Icons
          <br />Crafted for Developers
        </h1>

        <p className="hero-subtitle">
          Pixel-perfect icons across 3 curated styles and 37 categories. Fully optimized with zero React runtime bloat
          and native Laravel Blade server rendering.
        </p>

        <div className="search-bar-wrap">
          <Search size={20} className="search-icon-left" />
          <input
            type="text"
            className="search-input"
            placeholder="Search icons by name, category, or keyword (e.g. home, bell, 4k, arrow)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            id="hero-search-input"
          />
          <span className="search-shortcut-badge">/</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
          <button
            className="empty-btn"
            style={{ padding: '6px 14px', fontSize: '0.8125rem' }}
            onClick={() => {
              const el = document.getElementById('catalog-controls');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Compass size={14} />
            <span>Explore Catalog</span>
          </button>
          <button
            className="nav-btn"
            style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
            onClick={() => setActiveTab('react')}
          >
            <Terminal size={14} />
            <span>React Guide</span>
          </button>
          <button
            className="nav-btn"
            style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
            onClick={() => setActiveTab('laravel')}
          >
            <Code size={14} />
            <span>Laravel Guide</span>
          </button>
        </div>

        <div className="hero-stats">
          <div className="hero-stat-item">
            <span className="hero-stat-num">{totalIcons.toLocaleString()}</span>
            <span className="hero-stat-label">Unique Icons</span>
          </div>
          <div style={{ width: '1px', height: '32px', background: 'var(--border)' }} />
          <div className="hero-stat-item">
            <span className="hero-stat-num">3</span>
            <span className="hero-stat-label">Styles (Outline, Bold, Duotone)</span>
          </div>
          <div style={{ width: '1px', height: '32px', background: 'var(--border)' }} />
          <div className="hero-stat-item">
            <span className="hero-stat-num">37</span>
            <span className="hero-stat-label">Curated Categories</span>
          </div>
        </div>
      </div>
    </section>
  );
};
