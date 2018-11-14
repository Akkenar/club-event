import React, { useContext } from 'react';
import logo from '../assets/logo.svg';
import getKey from '../intl/getKey';
import LanguageContext from '../intl/LanguageContext';

import './Logo.scss';

const Logo = ({ height, width, inverted, big, className = '' }) => {
  const { messages } = useContext(LanguageContext);

  const invertedClassname = inverted ? 'Logo--inverted' : '';
  const bigClassname = big ? 'Logo--big' : '';
  return (
    <img
      className={`Logo ${invertedClassname} ${bigClassname} ${className}`.trim()}
      height={height}
      width={width}
      src={logo}
      alt={getKey('logo.alt', messages)}
      title={getKey('logo.alt', messages)}
    />
  );
};

export default Logo;
