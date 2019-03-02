import * as React from 'react';
import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Header } from 'semantic-ui-react';
import getKey from '../../core/intl/getKey';
import LanguageContext from '../../core/intl/LanguageContext';
import environment from '../../environment/environment';
import MapIframe from './MapIframe';
import SponsorsSection from '../sponsors-section/SponsorsSection';

import './InformationSection.scss';

const InformationSection = () => {
  const { messages, information, language } = useContext(LanguageContext);

  const isRegistrationEnabled = environment.registration.enabled;
  const buttonText = isRegistrationEnabled
    ? getKey('register.now', messages)
    : getKey('home.page.startofregistration', messages);

  return (
    <Fragment>
      <div dangerouslySetInnerHTML={{ __html: information }} />
      <MapIframe />
      <SponsorsSection />
      <Header as="h2">{getKey('home.page.register', messages)}</Header>
      <div className="InformationSection__register-container">
        <Button
          disabled={!isRegistrationEnabled}
          color="black"
          as={Link}
          className="full-width"
          to={`/${language}/register`}
          data-testid="register-button"
        >
          {buttonText}
        </Button>
      </div>
    </Fragment>
  );
};

export default InformationSection;
