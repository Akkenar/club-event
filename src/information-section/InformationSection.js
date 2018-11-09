import React, { useContext } from 'react';
import LanguageContext from '../intl/LanguageContext';

const InformationSection = () => {
  const { messages } = useContext(LanguageContext);

  return <div dangerouslySetInnerHTML={{ __html: messages.information }} />;
};

export default InformationSection;
