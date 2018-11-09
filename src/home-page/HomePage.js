import React, { useEffect } from 'react';
import InformationSection from '../information-section/InformationSection';
import { setPageTitle } from '../page.lib';
import getKey from '../intl/getKey';
import { injectIntl } from 'react-intl';

const HomePage = props => {
  useEffect(() => {
    setPageTitle(getKey('home.page.title', props));
  });

  return (
    <div>
      <InformationSection />
    </div>
  );
};

export default injectIntl(HomePage);
