import React from 'react';
import { injectIntl } from 'react-intl';

const InformationSection = ({ intl }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: intl.messages.information }} />
  );
};

export default injectIntl(InformationSection);
