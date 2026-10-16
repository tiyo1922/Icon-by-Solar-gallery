import React, { useState, useEffect } from 'react';
import { X, Copy, Download } from 'lucide-react';
import { IconItem, IconVariant } from '../types';

interface IconModalProps {
  icon: IconItem | null;
  initialVariant: IconVariant;
  onClose: () => void;
  showToast: (msg: string) => void;
}

export const IconModal: React.FC<IconModalProps> = ({
  icon,
  initialVariant,
  onClose,
  showToast,
}) => {
  if (!icon) return null;

  const [variant, setVariant] = useState<IconVariant>(initialVariant);
  const [size, setSize] = useState<number>(36);
  const [color, setColor] = useState<string>('#1C274C');
  const [secondaryColor, setSecondaryColor] = useState<string>('#3B82F6');
  const [secondaryOpacity, setSecondaryOpacity] = useState<number>(0.4);
  const [canvasBg, setCanvasBg] = useState<'light' | 'dark' | 'slate' | 'check'>('light');
  const [codeTab, setCodeTab] = useState<'react' | 'blade' | 'svg'>('react');
  const [rawSvg, setRawSvg] = useState<string>('');

  useEffect(() => {
    setVariant(initialVariant);
  }, [initialVariant, icon]);

  useEffect(() => {
    fetch(`./svg/${variant}/${icon.id}.svg`)
      .then((r) => r.text())
      .then((txt) => {
        setRawSvg(txt);
      })
      .catch((err) => console.error('Failed to load SVG', err));
  }, [variant, icon]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied ${label} to clipboard!`);
  };

  const getRenderedSvg = () => {
    if (!rawSvg) return '';
    let svg = rawSvg;

    if (variant === 'bold-duotone') {
      svg = svg.replace(/<([a-z]+)([^>]*)>/gi, (_, tag, attrs) => {
        const hasOpacity = /\bopacity=(["'])([^"']+)\1/i.test(attrs);
        if (hasOpacity) {
          let newAttrs = attrs.replace(/\bopacity=(["'])[^"']+\1/i, `opacity="${secondaryOpacity}"`);
          if (/\bfill=(["'])((?!none)[^"']+)\1/i.test(newAttrs)) {
            newAttrs = newAttrs.replace(/\bfill=(["'])((?!none)[^"']+)\1/i, `fill="${secondaryColor}"`);
          } else {
            newAttrs += ` fill="${secondaryColor}"`;
          }
          return `<${tag}${newAttrs}>`;
        } else {
          let newAttrs = attrs.replace(/\bfill=(["'])((?!none)[^"']+)\1/i, `fill="${color}"`);
          return `<${tag}${newAttrs}>`;
        }
      });
    } else if (variant === 'bold') {
      svg = svg.replace(/fill="([^"]+)"/g, (match, val) => {
        if (val.toLowerCase() === 'white' || val.toLowerCase() === '#fefeff' || val.toLowerCase() === '#fbfcff') {
          return match;
        }
        return `fill="${color}"`;
      });
    } else {
      svg = svg.replace(/fill="([^"]+)"/g, (match, val) => {
        if (val === 'none') return match;
        return `fill="${color}"`;
      });
      svg = svg.replace(/stroke="([^"]+)"/g, (match, val) => {
        if (val === 'none') return match;
        return `stroke="${color}"`;
      });
    }

    svg = svg.replace(/<svg\b([^>]*)>/i, `<svg width="${size}" height="${size}" $1>`);
    return svg;
  };

  const pascalName = icon.pascal;
  const isDigitPrefixed = /^[0-9]/.test(icon.id);
  const reactComponentName = isDigitPrefixed
    ? `Icon${pascalName}${variant.charAt(0).toUpperCase() + variant.slice(1).replace('-', '')}`
    : `Solar${pascalName}${variant.charAt(0).toUpperCase() + variant.slice(1).replace('-', '')}`;

  const reactSnippet = `// 1. Selective Import (Recommended for tree-shaking)
import { ${reactComponentName} } from '@icon-by-solar/react/icons/${icon.id}';

export function IconExample() {
  return <${reactComponentName} size={${size}} color="${color}" />;
}`;

  const bladeSnippet = `{{-- 1. Standard Component --}}
<x-icon-by-solar
    name="${icon.id}"
    variant="${variant}"
    size="${size}"
    color="${color}"
/>

{{-- 2. Brief Tag Alias --}}
<x-solar-icon name="${icon.id}" variant="${variant}" size="${size}" />`;

  const downloadSvgFile = () => {
    const blob = new Blob([rawSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `solar-${icon.id}-${variant}.svg`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Downloaded solar-${icon.id}-${variant}.svg`);
  };

  const colorPresets = ['#1C274C', '#2563EB', '#4F46E5', '#7C3AED', '#059669', '#D97706', '#E11D48', '#0F172A'];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <h3>{icon.name}</h3>
            <div className="modal-subtitle">
              Category: {icon.category} • Canonical: <code>{icon.id}</code>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="preview-col">
            <div className={`preview-canvas theme-${canvasBg}`}>
              <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                dangerouslySetInnerHTML={{ __html: getRenderedSvg() }}
              />
            </div>

            <div className="canvas-toggles">
              <button
                className={`canvas-btn ${canvasBg === 'light' ? 'active' : ''}`}
                onClick={() => setCanvasBg('light')}
              >
                Light
              </button>
              <button
                className={`canvas-btn ${canvasBg === 'dark' ? 'active' : ''}`}
                onClick={() => setCanvasBg('dark')}
              >
                Dark
              </button>
              <button
                className={`canvas-btn ${canvasBg === 'slate' ? 'active' : ''}`}
                onClick={() => setCanvasBg('slate')}
              >
                Slate
              </button>
              <button
                className={`canvas-btn ${canvasBg === 'check' ? 'active' : ''}`}
                onClick={() => setCanvasBg('check')}
              >
                Grid
              </button>
            </div>

            <div className="control-group">
              <label className="control-label">Style Variant</label>
              <div className="variant-filters" style={{ width: '100%', justifyContent: 'space-between' }}>
                <button
                  className={`variant-btn ${variant === 'outline' ? 'active' : ''}`}
                  onClick={() => setVariant('outline')}
                >
                  Outline
                </button>
                <button
                  className={`variant-btn ${variant === 'bold' ? 'active' : ''}`}
                  onClick={() => setVariant('bold')}
                >
                  Bold
                </button>
                <button
                  className={`variant-btn ${variant === 'bold-duotone' ? 'active' : ''}`}
                  onClick={() => setVariant('bold-duotone')}
                >
                  Bold Duotone
                </button>
              </div>
            </div>

            <div className="control-group">
              <div className="control-label">
                <span>Primary Color</span>
                <code>{color}</code>
              </div>
              <div className="color-presets">
                {colorPresets.map((c) => (
                  <button
                    key={c}
                    className={`color-dot ${color === c ? 'active' : ''}`}
                    style={{ backgroundColor: c }}
                    onClick={() => setColor(c)}
                  />
                ))}
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  style={{ width: '28px', height: '28px', border: 'none', background: 'none', cursor: 'pointer' }}
                />
              </div>
            </div>

            {variant === 'bold-duotone' && (
              <>
                <div className="control-group">
                  <div className="control-label">
                    <span>Secondary Color</span>
                    <code>{secondaryColor}</code>
                  </div>
                  <div className="color-presets">
                    {['#3B82F6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'].map((c) => (
                      <button
                        key={c}
                        className={`color-dot ${secondaryColor === c ? 'active' : ''}`}
                        style={{ backgroundColor: c }}
                        onClick={() => setSecondaryColor(c)}
                      />
                    ))}
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      style={{ width: '28px', height: '28px', border: 'none', background: 'none', cursor: 'pointer' }}
                    />
                  </div>
                </div>

                <div className="control-group">
                  <div className="control-label">
                    <span>Secondary Opacity</span>
                    <code>{Math.round(secondaryOpacity * 100)}%</code>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={secondaryOpacity}
                    onChange={(e) => setSecondaryOpacity(Number(e.target.value))}
                    className="size-slider"
                  />
                </div>
              </>
            )}

            <div className="control-group">
              <div className="control-label">
                <span>Size</span>
                <code>{size}px</code>
              </div>
              <input
                type="range"
                min="16"
                max="96"
                step="4"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="size-slider"
              />
              <div className="size-chips">
                {[16, 20, 24, 32, 48, 64].map((s) => (
                  <button
                    key={s}
                    className={`size-chip ${size === s ? 'active' : ''}`}
                    onClick={() => setSize(s)}
                  >
                    {s}px
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="code-col">
            <div className="code-tabs">
              <button
                className={`code-tab-btn ${codeTab === 'react' ? 'active' : ''}`}
                onClick={() => setCodeTab('react')}
              >
                React JSX
              </button>
              <button
                className={`code-tab-btn ${codeTab === 'blade' ? 'active' : ''}`}
                onClick={() => setCodeTab('blade')}
              >
                Laravel Blade
              </button>
              <button
                className={`code-tab-btn ${codeTab === 'svg' ? 'active' : ''}`}
                onClick={() => setCodeTab('svg')}
              >
                Raw SVG
              </button>
            </div>

            {codeTab === 'react' && (
              <div className="code-box">
                <button
                  className="code-copy-btn"
                  onClick={() => copyToClipboard(reactSnippet, 'React Code')}
                >
                  <Copy size={14} />
                  <span>Copy</span>
                </button>
                <pre>{reactSnippet}</pre>
              </div>
            )}

            {codeTab === 'blade' && (
              <div className="code-box">
                <button
                  className="code-copy-btn"
                  onClick={() => copyToClipboard(bladeSnippet, 'Laravel Blade Code')}
                >
                  <Copy size={14} />
                  <span>Copy</span>
                </button>
                <pre>{bladeSnippet}</pre>
              </div>
            )}

            {codeTab === 'svg' && (
              <div className="code-box" style={{ maxHeight: '200px' }}>
                <button
                  className="code-copy-btn"
                  onClick={() => copyToClipboard(rawSvg, 'Raw SVG')}
                >
                  <Copy size={14} />
                  <span>Copy</span>
                </button>
                <pre>{rawSvg}</pre>
              </div>
            )}

            <div className="modal-actions">
              <button
                className="modal-action-btn primary"
                onClick={() => copyToClipboard(icon.id, 'Icon Name')}
              >
                <Copy size={16} />
                <span>Copy Name</span>
              </button>
              <button className="modal-action-btn" onClick={downloadSvgFile}>
                <Download size={16} />
                <span>Download SVG</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
