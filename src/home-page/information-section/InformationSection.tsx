import * as React from 'react';
import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Message } from 'semantic-ui-react';
import * as configuration from '../../configuration.json';
import getKey from '../../core/intl/getKey';
import LanguageContext from '../../core/intl/LanguageContext';
import MapIframe from './MapIframe';

import './InformationSection.scss';

const InformationSection = () => {
  const { messages, language } = useContext(LanguageContext);

  return (
    <Fragment>
      <div dangerouslySetInnerHTML={{ __html: messages.information }} />
      <MapIframe />
      <Header as="h2">{getKey('home.page.register', messages)}</Header>
      {configuration.registration.enabled ? (
        <div className="InformationSection__register-container">
          <Button
            color="black"
            as={Link}
            className="full-width"
            to={`/${language}/register`}
          >
            {getKey('register.now', messages)}
          </Button>
        </div>
      ) : (
        <Message warning={true}>
          {getKey('home.page.startofregistration', messages)}
        </Message>
      )}
    </Fragment>
  );
};

export default InformationSection;
