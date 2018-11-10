import React, { Fragment, useContext } from 'react';
import LanguageContext from '../intl/LanguageContext';

import logo from '../logo.svg';
import getKey from '../intl/getKey';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import './InformationSection.scss';

const InformationSection = () => {
  const { messages, language } = useContext(LanguageContext);

  return (
    <Fragment>
      <div dangerouslySetInnerHTML={{ __html: messages.information }} />
      <img
        className="InformationSection__logo"
        src={logo}
        alt={getKey('header.logo', messages)}
      />
      <div className="InformationSection__register-container">
        <Button
          color="black"
          as={Link}
          className="InformationSection__register"
          to={`/register/${language}`}
        >
          {getKey('register.now', messages)}
        </Button>
      </div>
    </Fragment>
  );
};

export default InformationSection;
