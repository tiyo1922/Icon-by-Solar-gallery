import React from 'react';
import { IconItem, IconVariant } from '../types';

interface IconCardProps {
  icon: IconItem;
  variant: IconVariant;
  onClick: () => void;
}

export const IconCard: React.FC<IconCardProps> = ({ icon, variant, onClick }) => {
  const svgUrl = `./svg/${variant}/${icon.id}.svg`;

  return (
    <div className="icon-card" onClick={onClick} title={`${icon.name} (${variant})`}>
      <div className="card-icon-box">
        <img
          src={svgUrl}
          alt={icon.name}
          className="card-icon-img"
          loading="lazy"
        />
      </div>
      <span className="card-name">{icon.name}</span>
      <span className="card-cat">{icon.category}</span>
    </div>
  );
};
