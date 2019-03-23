import * as React from 'react';
import { Fragment, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { DEFAULT_LANGUAGE } from '../core/intl/getDefaultLanguage';
import LanguageContext from '../core/intl/LanguageContext';
import Loader from '../core/loader/Loader';
import { Registration } from '../register-page/register.type';
import RegistrationsDetails from './RegistrationsDetails';
import RegistrationsOverview from './RegistrationsOverview';
import { useRegistrationsData } from './useRegistrationsData';

const INITIAL_STATE: Registration[] = [];

const RegistrationsContainer = () => {
  const { language } = useContext(LanguageContext);
  const { isNotAuthorized, registrations } = useRegistrationsData(
    INITIAL_STATE,
  );

  if (isNotAuthorized) {
    // Probably because not logged.
    return <Redirect to={`/${language || DEFAULT_LANGUAGE}/login`} />;
  }

  if (registrations === INITIAL_STATE) {
    // The page is loading.
    return <Loader />;
  }

  return (
    <Fragment>
      <RegistrationsOverview registrations={registrations} />
      <RegistrationsDetails registrations={registrations} />
    </Fragment>
  );
};

export default RegistrationsContainer;
