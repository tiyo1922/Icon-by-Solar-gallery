# Icon by Solar Gallery

Interactive developer gallery and official documentation for **Icon by Solar** — a pixel-crafted icon system offering **3,738 icons** across **Outline**, **Bold**, and **Bold Duotone** styles in 37 categories.

Website: **[https://tiyo1922.github.io/Icon-by-Solar-gallery/](https://tiyo1922.github.io/Icon-by-Solar-gallery/)**  
Core Monorepo: **[https://github.com/tiyo1922/Icon-by-Solar](https://github.com/tiyo1922/Icon-by-Solar)**

---

## Features

- **3,738 Verified Icons:** 1,246 Outline + 1,246 Bold + 1,246 Bold Duotone icons.
- **Fast Client-Side Search:** Instant fuzzy searching across icon names, categories, and keywords with zero network lag.
- **Category Filter:** 37 distinct categories with quick-jump pills.
- **Interactive Inspector:**
  - Real-time SVG preview canvas with Dark, Light, Slate, and Checkerboard backgrounds.
  - Interactive color picker and palette presets.
  - Scalable size preview (16px to 96px).
  - Duotone layer secondary color and opacity customizer.
  - One-click copy for **React JSX**, **Laravel Blade**, **Raw SVG**, and icon name.
  - One-click **Download SVG** file.
- **Developer Documentation:**
  - Full documentation for **`@icon-by-solar/react`** (selective tree-shaking imports, TypeScript definitions, dynamic props).
  - Full documentation for **`icon-by-solar/blade`** (Blade components, Composer setup, Tailwind styling).
- **Zero Heavy Bundles:** Metadata-indexed on-demand SVG loading ensures instant page load and minimal memory footprint.

---

## Icon Count Summary

| Style Variant | Verified Icon Count | Source Resolution | Format |
| :--- | :--- | :--- | :--- |
| **Outline** | **1,246** | 24 x 24 | Scalable Vector Graphic (SVG) |
| **Bold** | **1,246** | 24 x 24 | Scalable Vector Graphic (SVG) |
| **Bold Duotone** | **1,246** | 24 x 24 | Scalable Vector Graphic (SVG) |
| **Total** | **3,738** | **24 x 24** | **100% Valid XML** |

---

## Quick Start: Packages

### 1. React (`@icon-by-solar/react`)

```bash
npm install @icon-by-solar/react
```

```tsx
import { SolarHomeOutline } from '@icon-by-solar/react/icons/home';
import { SolarBellBold } from '@icon-by-solar/react/icons/bell';

export function Header() {
  return (
    <div className="flex gap-4 items-center">
      <SolarHomeOutline size={24} className="text-blue-600" />
      <SolarBellBold size={24} color="#0342C9" />
    </div>
  );
}
```

### 2. Laravel Blade (`icon-by-solar/blade`)

```bash
composer require icon-by-solar/blade
```

```blade
{{-- Outline with Tailwind text utility --}}
<x-icon-by-solar name="home" variant="outline" size="24" class="text-blue-600" />

{{-- Bold with custom color --}}
<x-icon-by-solar name="bell-bing" variant="bold" size="32" color="#0342C9" />

{{-- Bold Duotone with secondary layer override --}}
<x-icon-by-solar
    name="shield-check"
    variant="bold-duotone"
    size="28"
    color="#1E40AF"
    secondary-color="#93C5FD"
    secondary-opacity="0.7"
/>

{{-- Brief alias tag --}}
<x-solar-icon name="camera" variant="outline" size="20" />
```

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/tiyo1922/Icon-by-Solar-gallery.git
cd Icon-by-Solar-gallery

# Install dependencies
npm install

# Run automated tests
npm run test

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## License & Attribution

- **Original Icon Artwork:** Solar Icon Set by **480 Design** under the **[Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)** license.
- **Software, Code & Tools:** Licensed under the **[MIT License](LICENSE)**.
- **Credit Title:** **Icon by Solar**.
