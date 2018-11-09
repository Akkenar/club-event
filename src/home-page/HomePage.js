import React, { Fragment, useEffect } from 'react';
import InformationSection from '../information-section/InformationSection';
import { setPageTitle } from '../page.lib';
import getKey from '../intl/getKey';
import { injectIntl } from 'react-intl';
import { Header } from 'semantic-ui-react';

const HomePage = props => {
  useEffect(() => {
    setPageTitle(getKey('home.page.title', props));
  });

  return (
    <Fragment>
      <Header as="h1">{getKey('home.page.title', props)}</Header>
      <InformationSection />
    </Fragment>
  );
};

export default injectIntl(HomePage);
