import React, { Fragment, useContext, useEffect } from 'react';
import InformationSection from '../information-section/InformationSection';
import { setPageTitle } from '../page.lib';
import getKey from '../intl/getKey';
import { Header } from 'semantic-ui-react';
import LanguageContext from '../intl/LanguageContext';

const HomePage = () => {
  const { messages } = useContext(LanguageContext);

  useEffect(() => {
    setPageTitle(getKey('home.page.title', messages));
  });

  return (
    <Fragment>
      <Header as="h1">{getKey('home.page.title', messages)}</Header>
      <InformationSection />
    </Fragment>
  );
};

export default HomePage;
