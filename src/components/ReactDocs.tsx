import React from 'react';
import { Copy, Terminal } from 'lucide-react';

interface ReactDocsProps {
  showToast: (msg: string) => void;
}

export const ReactDocs: React.FC<ReactDocsProps> = ({ showToast }) => {
  const copyText = (txt: string, label: string) => {
    navigator.clipboard.writeText(txt);
    showToast(`Copied ${label} to clipboard!`);
  };

  return (
    <div className="docs-container">
      <div className="docs-header">
        <div className="docs-badge">
          <Terminal size={14} />
          <span>React Package v1.0.3</span>
        </div>
        <h1 className="docs-title">@icon-by-solar/react</h1>
        <p className="docs-lead">
          Official, tree-shakeable React icon component library for Icon by Solar. Supporting 3,738 icons across Outline,
          Bold, and Bold Duotone styles with strict TypeScript definitions and zero runtime overhead.
        </p>
      </div>

      <section className="docs-section">
        <h2 className="docs-section-title">1. Installation</h2>
        <p className="docs-p">Install the package from npm using your preferred package manager:</p>

        <div className="code-box">
          <button className="code-copy-btn" onClick={() => copyText('npm install @icon-by-solar/react', 'npm install')}>
            <Copy size={14} /> Copy
          </button>
          <pre>npm install @icon-by-solar/react</pre>
        </div>

        <p className="docs-p">Or using yarn, pnpm, or bun:</p>
        <div className="code-box">
          <button className="code-copy-btn" onClick={() => copyText('pnpm add @icon-by-solar/react', 'pnpm install')}>
            <Copy size={14} /> Copy
          </button>
          <pre>pnpm add @icon-by-solar/react
# or: yarn add @icon-by-solar/react
# or: bun add @icon-by-solar/react</pre>
        </div>
      </section>

      <section className="docs-section">
        <h2 className="docs-section-title">2. Usage Patterns</h2>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '20px 0 8px' }}>
          Pattern A: Selective Import (Recommended for Optimal Tree-Shaking)
        </h3>
        <p className="docs-p">
          Import individual icons directly from their dedicated subpaths. This guarantees that your bundler only includes
          the exact SVGs you use, keeping your production JavaScript bundle as small as possible.
        </p>
        <div className="code-box">
          <button className="code-copy-btn" onClick={() => copyText(`import { SolarHomeOutline } from '@icon-by-solar/react/icons/home';
import { SolarBellBold } from '@icon-by-solar/react/icons/bell';

export function Header() {
  return (
    <div className="flex gap-4 items-center">
      <SolarHomeOutline size={24} className="text-blue-600" />
      <SolarBellBold size={24} color="#0342C9" />
    </div>
  );
}`, 'Selective Import Example')}>
            <Copy size={14} /> Copy
          </button>
          <pre>{`import { SolarHomeOutline } from '@icon-by-solar/react/icons/home';
import { SolarBellBold } from '@icon-by-solar/react/icons/bell';

export function Header() {
  return (
    <div className="flex gap-4 items-center">
      <SolarHomeOutline size={24} className="text-blue-600" />
      <SolarBellBold size={24} color="#0342C9" />
    </div>
  );
}`}</pre>
        </div>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '28px 0 8px' }}>
          Pattern B: Dynamic Component with Name Prop
        </h3>
        <p className="docs-p">
          You can also use the general <code>&lt;SolarIcon /&gt;</code> component and supply the icon name and variant dynamically:
        </p>
        <div className="code-box">
          <button className="code-copy-btn" onClick={() => copyText(`import { SolarIcon, registerIcons } from '@icon-by-solar/react';
import { SolarHome } from '@icon-by-solar/react/icons/home';

// Register the icons you plan to load dynamically
registerIcons([SolarHome]);

export function DynamicIcon({ name, variant }: { name: string; variant: 'outline' | 'bold' | 'bold-duotone' }) {
  return <SolarIcon name={name} variant={variant} size={28} color="currentColor" />;
}`, 'Dynamic Component Example')}>
            <Copy size={14} /> Copy
          </button>
          <pre>{`import { SolarIcon, registerIcons } from '@icon-by-solar/react';
import { SolarHome } from '@icon-by-solar/react/icons/home';

// Register the icons you plan to load dynamically
registerIcons([SolarHome]);

export function DynamicIcon({ name, variant }: { name: string; variant: 'outline' | 'bold' | 'bold-duotone' }) {
  return <SolarIcon name={name} variant={variant} size={28} color="currentColor" />;
}`}</pre>
        </div>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '28px 0 8px' }}>
          Pattern C: Barrel Import
        </h3>
        <p className="docs-p">
          For fast prototyping, you can import directly from the root package:
        </p>
        <div className="code-box">
          <pre>{`import { SolarHomeOutline, SolarBellBold, SolarShieldCheckBoldDuotone } from '@icon-by-solar/react';`}</pre>
        </div>
      </section>

      <section className="docs-section">
        <h2 className="docs-section-title">3. Props Reference</h2>
        <div className="table-wrap">
          <table className="docs-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>size</code></td>
                <td><code>number | string</code></td>
                <td><code>24</code></td>
                <td>Width and height in pixels or CSS units.</td>
              </tr>
              <tr>
                <td><code>color</code></td>
                <td><code>string</code></td>
                <td><code>'currentColor'</code></td>
                <td>Primary color. Allows Tailwind text utilities (e.g. <code>text-indigo-600</code>) to style the icon.</td>
              </tr>
              <tr>
                <td><code>className</code></td>
                <td><code>string</code></td>
                <td><code>undefined</code></td>
                <td>CSS class string merged to the root &lt;svg&gt;.</td>
              </tr>
              <tr>
                <td><code>style</code></td>
                <td><code>React.CSSProperties</code></td>
                <td><code>undefined</code></td>
                <td>Inline CSS styles merged to the root &lt;svg&gt;.</td>
              </tr>
              <tr>
                <td><code>aria-*</code></td>
                <td><code>string</code></td>
                <td><code>aria-hidden="true"</code></td>
                <td>Accessibility attributes automatically forwarded.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="docs-section">
        <h2 className="docs-section-title">4. Digit-Prefixed Icons (e.g. 4k)</h2>
        <p className="docs-p">
          Because JavaScript identifiers cannot begin with numbers, icons with names starting with digits are exported
          with valid aliases:
        </p>
        <div className="code-box">
          <pre>{`// All three exports are valid and refer to the 4k icon:
import { Icon4kOutline, FourKOutline, Solar4k } from '@icon-by-solar/react/icons/4k';`}</pre>
        </div>
      </section>
    </div>
  );
};
