import React, { useState, useMemo } from 'react';
import { IconItem, IconVariant, CategoryInfo } from '../types';
import { IconCard } from './IconCard';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface CatalogProps {
  icons: IconItem[];
  categories: CategoryInfo[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedVariant: IconVariant;
  setSelectedVariant: (v: IconVariant) => void;
  onSelectIcon: (icon: IconItem) => void;
}

const ITEMS_PER_PAGE = 72;

export const Catalog: React.FC<CatalogProps> = ({
  icons,
  categories,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedVariant,
  setSelectedVariant,
  onSelectIcon,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredIcons = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return icons.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (!q) return true;
      if (item.id.toLowerCase().includes(q)) return true;
      if (item.name.toLowerCase().includes(q)) return true;
      if (item.category.toLowerCase().includes(q)) return true;
      return item.aliases.some((alias) => alias.includes(q));
    });
  }, [icons, searchQuery, selectedCategory]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedVariant]);

  const totalPages = Math.ceil(filteredIcons.length / ITEMS_PER_PAGE);
  const paginatedIcons = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredIcons.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredIcons, currentPage]);

  return (
    <div className="catalog-container" id="catalog-controls">
      <div className="category-bar">
        <button
          className={`category-pill ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          All Categories ({icons.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.name}
            className={`category-pill ${selectedCategory === cat.name ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.name)}
          >
            {cat.name} ({cat.count})
          </button>
        ))}
      </div>

      <div className="controls-bar">
        <div className="variant-filters">
          <button
            className={`variant-btn ${selectedVariant === 'outline' ? 'active' : ''}`}
            onClick={() => setSelectedVariant('outline')}
          >
            Outline ({filteredIcons.length})
          </button>
          <button
            className={`variant-btn ${selectedVariant === 'bold' ? 'active' : ''}`}
            onClick={() => setSelectedVariant('bold')}
          >
            Bold ({filteredIcons.length})
          </button>
          <button
            className={`variant-btn ${selectedVariant === 'bold-duotone' ? 'active' : ''}`}
            onClick={() => setSelectedVariant('bold-duotone')}
          >
            Bold Duotone ({filteredIcons.length})
          </button>
        </div>

        <div className="results-meta">
          Showing <strong>{filteredIcons.length}</strong> icons
          {selectedCategory !== 'all' && ` in "${selectedCategory}"`}
          {searchQuery && ` matching "${searchQuery}"`}
        </div>
      </div>

      {paginatedIcons.length > 0 ? (
        <>
          <div className="icon-grid">
            {paginatedIcons.map((icon) => (
              <IconCard
                key={icon.id}
                icon={icon}
                variant={selectedVariant}
                onClick={() => onSelectIcon(icon)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination-bar">
              <button
                className="page-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft size={16} />
              </button>

              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: '0 8px' }}>
                Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
              </span>

              <button
                className="page-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="empty-state">
          <h3 className="empty-title">No icons found</h3>
          <p className="empty-desc">
            We couldn't find any icons matching your current search or category filter.
          </p>
          <button
            className="empty-btn"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          >
            <RotateCcw size={16} />
            <span>Reset Filters</span>
          </button>
        </div>
      )}
    </div>
  );
};
