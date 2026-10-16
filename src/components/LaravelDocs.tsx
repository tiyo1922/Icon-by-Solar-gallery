import React from 'react';
import { Copy, Code } from 'lucide-react';

interface LaravelDocsProps {
  showToast: (msg: string) => void;
}

export const LaravelDocs: React.FC<LaravelDocsProps> = ({ showToast }) => {
  const copyText = (txt: string, label: string) => {
    navigator.clipboard.writeText(txt);
    showToast(`Copied ${label} to clipboard!`);
  };

  return (
    <div className="docs-container">
      <div className="docs-header">
        <div className="docs-badge" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444' }}>
          <Code size={14} />
          <span>Laravel Blade Package v1.0.0</span>
        </div>
        <h1 className="docs-title">icon-by-solar/blade</h1>
        <p className="docs-lead">
          Official, idiomatic Laravel Blade icon component for Icon by Solar. Render 3,738 icons directly inside your
          Blade views with zero React dependencies, on-demand SVG disk reading, and full Tailwind CSS support.
        </p>
      </div>

      <section className="docs-section">
        <h2 className="docs-section-title">1. Installation</h2>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '16px 0 8px' }}>
          A. Official Packagist Installation
        </h3>
        <p className="docs-p">Install via Composer in any Laravel 9, 10, 11, or 12 project:</p>
        <div className="code-box">
          <button className="code-copy-btn" onClick={() => copyText('composer require icon-by-solar/blade', 'Composer require')}>
            <Copy size={14} /> Copy
          </button>
          <pre>composer require icon-by-solar/blade</pre>
        </div>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '24px 0 8px' }}>
          B. Direct GitHub VCS Repository (Pre-Packagist Indexing)
        </h3>
        <p className="docs-p">You can also install directly from the standalone GitHub repository:</p>
        <div className="code-box">
          <button className="code-copy-btn" onClick={() => copyText(`composer config repositories.blade vcs https://github.com/tiyo1922/icon-by-solar-blade.git
composer require icon-by-solar/blade:^1.0`, 'Composer VCS require')}>
            <Copy size={14} /> Copy
          </button>
          <pre>{`composer config repositories.blade vcs https://github.com/tiyo1922/icon-by-solar-blade.git
composer require icon-by-solar/blade:^1.0`}</pre>
        </div>
      </section>

      <section className="docs-section">
        <h2 className="docs-section-title">2. Usage in Blade Views</h2>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '16px 0 8px' }}>
          Outline Style (Default) with Tailwind CSS
        </h3>
        <div className="code-box">
          <button className="code-copy-btn" onClick={() => copyText('<x-icon-by-solar name="home" variant="outline" size="24" class="text-blue-600" />', 'Blade Outline')}>
            <Copy size={14} /> Copy
          </button>
          <pre>{`<x-icon-by-solar name="home" variant="outline" size="24" class="text-blue-600" />`}</pre>
        </div>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '24px 0 8px' }}>
          Bold Style with Explicit Hex Color
        </h3>
        <div className="code-box">
          <button className="code-copy-btn" onClick={() => copyText('<x-icon-by-solar name="bell-bing" variant="bold" size="32" color="#0342C9" />', 'Blade Bold')}>
            <Copy size={14} /> Copy
          </button>
          <pre>{`<x-icon-by-solar name="bell-bing" variant="bold" size="32" color="#0342C9" />`}</pre>
        </div>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '24px 0 8px' }}>
          Bold Duotone with Secondary Layer Customization
        </h3>
        <div className="code-box">
          <button className="code-copy-btn" onClick={() => copyText(`<x-icon-by-solar
    name="shield-check"
    variant="bold-duotone"
    size="28"
    color="#1E40AF"
    secondary-color="#93C5FD"
    secondary-opacity="0.7"
/>`, 'Blade Duotone')}>
            <Copy size={14} /> Copy
          </button>
          <pre>{`<x-icon-by-solar
    name="shield-check"
    variant="bold-duotone"
    size="28"
    color="#1E40AF"
    secondary-color="#93C5FD"
    secondary-opacity="0.7"
/>`}</pre>
        </div>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '24px 0 8px' }}>
          Component Tag Alias
        </h3>
        <p className="docs-p">
          You can use either <code>&lt;x-icon-by-solar&gt;</code> or <code>&lt;x-solar-icon&gt;</code> interchangeably:
        </p>
        <div className="code-box">
          <pre>{`<x-solar-icon name="camera" variant="outline" size="20" class="text-gray-500" />`}</pre>
        </div>
      </section>

      <section className="docs-section">
        <h2 className="docs-section-title">3. Attributes Reference</h2>
        <div className="table-wrap">
          <table className="docs-table">
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>name</code></td>
                <td><code>string</code></td>
                <td><em>(Required)</em></td>
                <td>Canonical icon name or alias (e.g. <code>home</code>, <code>chat-square-arrow</code>).</td>
              </tr>
              <tr>
                <td><code>variant</code></td>
                <td><code>string</code></td>
                <td><code>'outline'</code></td>
                <td>Style variant: <code>outline</code>, <code>bold</code>, or <code>bold-duotone</code>.</td>
              </tr>
              <tr>
                <td><code>size</code></td>
                <td><code>int | string</code></td>
                <td><code>24</code></td>
                <td>Width and height in pixels or CSS units.</td>
              </tr>
              <tr>
                <td><code>color</code></td>
                <td><code>string</code></td>
                <td><code>'currentColor'</code></td>
                <td>Primary color. Allows Tailwind text utilities to cascade naturally.</td>
              </tr>
              <tr>
                <td><code>secondary-color</code></td>
                <td><code>string</code></td>
                <td><code>null</code></td>
                <td>Override color for duotone secondary layer.</td>
              </tr>
              <tr>
                <td><code>secondary-opacity</code></td>
                <td><code>float | string</code></td>
                <td><code>null</code></td>
                <td>Opacity override for duotone elements (e.g. <code>0.6</code>).</td>
              </tr>
              <tr>
                <td><code>class</code></td>
                <td><code>string</code></td>
                <td><code>null</code></td>
                <td>CSS classes merged to root &lt;svg&gt;.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="docs-section">
        <h2 className="docs-section-title">4. Publishing Configuration (Optional)</h2>
        <div className="code-box">
          <pre>php artisan vendor:publish --tag="icon-by-solar-config"</pre>
        </div>
      </section>
    </div>
  );
};
