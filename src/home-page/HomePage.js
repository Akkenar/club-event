import React, { Fragment, useContext, useEffect } from 'react';
import InformationSection from '../information-section/InformationSection';
import { goToTop, setPageTitle } from '../page.lib';
import getKey from '../intl/getKey';
import { Header } from 'semantic-ui-react';
import LanguageContext from '../intl/LanguageContext';
import LazyImage from '../lazy-image/LazyImage';

import img from '../assets/img.jpg';
import imgwebp from '../assets/img.webp';

const HomePage = () => {
  const { messages } = useContext(LanguageContext);

  useEffect(() => {
    setPageTitle(getKey('home.page.title', messages));
    goToTop();
  });

  return (
    <Fragment>
      <Header as="h1">{getKey('home.page.title', messages)}</Header>
      <InformationSection />
      <LazyImage
        src={img}
        srcwebp={imgwebp}
        alt={''}
        width={200}
        height={200}
      />
    </Fragment>
  );
};

export default HomePage;
