import React, { Fragment, useContext, useEffect } from 'react';
import InformationSection from '../information-section/InformationSection';
import { goToTop, setPageTitle } from '../page.lib';
import getKey from '../intl/getKey';
import { Header } from 'semantic-ui-react';
import LanguageContext from '../intl/LanguageContext';
import LazyImage from '../lazy-image/LazyImage';

import imgTop from '../assets/Arnaud-Conne-2017_5.jpg';
import imgwebpTop from '../assets/Arnaud-Conne-2017_5.webp';
import Logo from '../logo/Logo';

const HomePage = () => {
  const { messages } = useContext(LanguageContext);

  useEffect(() => {
    setPageTitle(getKey('home.page.title', messages));
    goToTop();
  });

  return (
    <Fragment>
      <Header as="h1">{getKey('home.page.title', messages)}</Header>
      <Logo big />
      <InformationSection />
      <LazyImage
        width={320}
        src={imgTop}
        srcwebp={imgwebpTop}
        alt={'Photo: Arnaud Conne'}
      />
    </Fragment>
  );
};

export default HomePage;
