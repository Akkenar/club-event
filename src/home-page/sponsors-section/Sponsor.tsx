import React from 'react';
import LazyImage from '../../core/lazy-image/LazyImage';

import './Sponsor.scss';

interface SponsorProps {
  name: string;
  logo: string;
  url: string;
}

const Sponsor = ({ url, name, logo }: SponsorProps) => {
  return (
    <div className="Sponsor">
      <div className="Sponsor__name">{name}</div>
      <a href={url} target="_blank" className="Sponsor__link">
        <LazyImage
          className="Sponsor__logo"
          src={logo}
          alt={name}
          withLegend={false}
        />
      </a>
    </div>
  );
};

export default Sponsor;
