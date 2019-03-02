import { Button, Header } from 'semantic-ui-react';
import * as React from 'react';
import ScrollableAnchor from '../../core/scrollable-anchor/ScrollableAnchor';
import { useContext } from 'react';
import LanguageContext from '../../core/intl/LanguageContext';
import getKey from '../../core/intl/getKey';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';

import './RegisterSection.scss';

const RegisterSection = () => {
  const { messages, language } = useContext(LanguageContext);

  return (
    <Fragment>
      <Header as="h2">
        <ScrollableAnchor text={getKey('home.page.register', messages)} />
      </Header>
      <div className="RegisterSection__container">
        <Button
          color="black"
          as={Link}
          className="full-width"
          to={`/${language}/register`}
          data-testid="register-button"
        >
          {getKey('register.now', messages)}
        </Button>
      </div>
    </Fragment>
  );
};

export default RegisterSection;
