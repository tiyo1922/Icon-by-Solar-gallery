import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Icon by Solar Gallery Data Integrity', () => {
  const dataPath = path.resolve(process.cwd(), 'public/data/icons.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  it('indexes exactly 1,246 canonical icons', () => {
    expect(data.icons.length).toBe(1246);
    expect(data.totalIcons).toBe(1246);
  });

  it('indexes exactly 3,738 variants across 3 styles', () => {
    expect(data.totalVariants).toBe(3738);
    for (const icon of data.icons) {
      expect(icon.variants).toContain('outline');
      expect(icon.variants).toContain('bold');
      expect(icon.variants).toContain('bold-duotone');
    }
  });

  it('indexes all 37 categories', () => {
    expect(data.categories.length).toBe(37);
  });

  it('maps digit-prefixed icon 4k canonically', () => {
    const icon4k = data.icons.find((i: any) => i.id === '4k');
    expect(icon4k).toBeDefined();
    expect(icon4k.name.toLowerCase()).toBe('4k');
    expect(icon4k.category).toBe('Essentional, UI');
  });

  it('supports search query matching canonical name, title, and alias', () => {
    const search = (query: string) => {
      const q = query.toLowerCase();
      return data.icons.filter((item: any) => {
        return (
          item.id.includes(q) ||
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.aliases.some((a: string) => a.includes(q))
        );
      });
    };

    expect(search('home').length).toBeGreaterThan(0);
    expect(search('bell').length).toBeGreaterThan(0);
    expect(search('arrow').length).toBeGreaterThan(0);
    expect(search('4k').length).toBeGreaterThan(0);
  });

  it('verifies all 3,738 SVG files exist in public/svg/', () => {
    const svgDir = path.resolve(process.cwd(), 'public/svg');
    for (const variant of ['outline', 'bold', 'bold-duotone']) {
      const vDir = path.join(svgDir, variant);
      expect(fs.existsSync(vDir)).toBe(true);
      const files = fs.readdirSync(vDir).filter((f: string) => f.endsWith('.svg'));
      expect(files.length).toBe(1246);
    }
  });
});
