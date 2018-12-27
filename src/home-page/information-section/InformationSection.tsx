import * as React from 'react';
import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Message } from 'semantic-ui-react';
import * as configuration from '../../configuration.json';
import getKey from '../../core/intl/getKey';
import LanguageContext from '../../core/intl/LanguageContext';

import './InformationSection.scss';

const InformationSection = () => {
  const { messages, language } = useContext(LanguageContext);

  return (
    <Fragment>
      <div dangerouslySetInnerHTML={{ __html: messages.information }} />
      <iframe
        title="Vallorbe"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2735.705437069773!2d6.377488315962078!3d46.71154597913546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478db3ee662c90db%3A0x172582dbb0e2b277!2sAuberge+Communale+de+Vallorbe!5e0!3m2!1sen!2sch!4v1541839403749"
        width="100%"
        height="600"
        frameBorder="0"
        style={{ border: 0, margin: '1em 0' }}
        allowFullScreen={true}
      />
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
