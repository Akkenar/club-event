import * as React from 'react';
import { useContext } from 'react';
import LanguageContext from '../../core/intl/LanguageContext';

const InformationSection = () => {
  const { information } = useContext(LanguageContext);

  return <div dangerouslySetInnerHTML={{ __html: information }} />;
};

export default InformationSection;
