import * as React from 'react';
import { useContext } from 'react';
import * as logo from '../../assets/logo.svg';
import getKey from '../intl/getKey';
import LanguageContext from '../intl/LanguageContext';

import './Logo.scss';

export interface LogoType {
  height?: number;
  width?: number;
  inverted?: boolean;
  big?: boolean;
  className?: string;
}

const Logo = ({ height, width, inverted, big, className = '' }: LogoType) => {
  const { messages } = useContext(LanguageContext);

  const invertedClassname = inverted ? 'Logo--inverted' : '';
  const bigClassname = big ? 'Logo--big' : '';
  return (
    <img
      className={`Logo ${invertedClassname} ${bigClassname} ${className}`.trim()}
      height={height}
      width={width}
      src={logo as any}
      alt={getKey('logo.alt', messages)}
      title={getKey('logo.alt', messages)}
    />
  );
};

export default Logo;
