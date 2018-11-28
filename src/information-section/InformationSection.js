import React, { Fragment, useContext } from 'react';
import LanguageContext from '../intl/LanguageContext';
import getKey from '../intl/getKey';
import { Link } from 'react-router-dom';
import { Button, Header, Message } from 'semantic-ui-react';
import configuration from '../configuration';

import './InformationSection.scss';

const InformationSection = () => {
  const { messages, language } = useContext(LanguageContext);

  return (
    <Fragment>
      <div dangerouslySetInnerHTML={{ __html: messages.information }} />
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
        <Message warning>
          {getKey('home.page.startofregistration', messages)}
        </Message>
      )}
    </Fragment>
  );
};

export default InformationSection;
