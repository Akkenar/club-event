import React, { Fragment, useContext } from 'react';
import LanguageContext from '../intl/LanguageContext';

import logo from '../assets/logo.svg';
import getKey from '../intl/getKey';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import './InformationSection.scss';

const InformationSection = () => {
  const { messages, language } = useContext(LanguageContext);

  return (
    <Fragment>
      <img
        className="InformationSection__logo"
        src={logo}
        alt={getKey('logo.alt', messages)}
      />
      <div dangerouslySetInnerHTML={{ __html: messages.information }} />
      <div className="InformationSection__register-container">
        <Button
          color="black"
          as={Link}
          className="full-width"
          to={`/register/${language}`}
        >
          {getKey('register.now', messages)}
        </Button>
      </div>
    </Fragment>
  );
};

export default InformationSection;
