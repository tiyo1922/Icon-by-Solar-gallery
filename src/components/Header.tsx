import React from 'react';
import { Sun, Moon, Github, Sparkles } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  theme,
  setTheme,
}) => {
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand-wrap" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('icons')}>
          <div className="brand-badge">
            <Sparkles size={20} />
          </div>
          <div>
            <span>Icon by Solar</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginLeft: '8px', fontWeight: 500 }}>
              Gallery
            </span>
          </div>
        </div>

        <nav className="nav-links">
          <button
            className={`nav-btn ${activeTab === 'icons' ? 'active' : ''}`}
            onClick={() => setActiveTab('icons')}
          >
            Icons
          </button>
          <button
            className={`nav-btn ${activeTab === 'react' ? 'active' : ''}`}
            onClick={() => setActiveTab('react')}
          >
            React
          </button>
          <button
            className={`nav-btn ${activeTab === 'laravel' ? 'active' : ''}`}
            onClick={() => setActiveTab('laravel')}
          >
            Laravel
          </button>
          <button
            className={`nav-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
        </nav>

        <div className="header-actions">
          <button
            className="action-icon-btn"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a
            href="https://github.com/tiyo1922/Icon-by-Solar-gallery"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-github"
          >
            <Github size={18} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
