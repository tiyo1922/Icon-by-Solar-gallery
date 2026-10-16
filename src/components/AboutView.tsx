import React from 'react';
import { Shield, Sparkles, ExternalLink } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="docs-container">
      <div className="docs-header">
        <div className="docs-badge">
          <Sparkles size={14} />
          <span>About Icon by Solar</span>
        </div>
        <h1 className="docs-title">Crafted for Developer Velocity</h1>
        <p className="docs-lead">
          Icon by Solar provides 3,738 cohesive, versatile SVG icons across Outline, Bold, and Bold Duotone styles,
          distributed as native React components and Laravel Blade directives.
        </p>
      </div>

      <section className="docs-section">
        <h2 className="docs-section-title">License & Attribution</h2>
        <div style={{ background: 'var(--surface-card)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={20} color="var(--primary)" />
            Credit Title: Icon by Solar
          </h3>
          <p className="docs-p">
            • <strong>Original Artwork:</strong> Created by <strong>480 Design</strong> under the{' '}
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
              Creative Commons Attribution 4.0 International (CC BY 4.0) License
            </a>.
          </p>
          <p className="docs-p">
            • <strong>Code & Tooling:</strong> The React package, Laravel Blade package, generator tools, and gallery website
            are open source under the{' '}
            <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
              MIT License
            </a>.
          </p>
        </div>
      </section>

      <section className="docs-section">
        <h2 className="docs-section-title">Official Ecosystem Repositories</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <a
            href="https://github.com/tiyo1922/Icon-by-Solar"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', padding: '20px', background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}
          >
            <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '6px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              tiyo1922/Icon-by-Solar <ExternalLink size={14} />
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Core monorepo containing all 3,738 source SVGs, generator scripts, and automated test suites.
            </div>
          </a>

          <a
            href="https://github.com/tiyo1922/icon-by-solar-blade"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', padding: '20px', background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}
          >
            <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '6px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              tiyo1922/icon-by-solar-blade <ExternalLink size={14} />
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Standalone Composer distribution for Laravel Blade with auto-discovery and on-demand SVG loading.
            </div>
          </a>

          <a
            href="https://www.npmjs.com/package/@icon-by-solar/react"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', padding: '20px', background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}
          >
            <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '6px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              @icon-by-solar/react on npm <ExternalLink size={14} />
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Official npm package with tree-shakable selective imports and TypeScript declarations.
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};
