import * as React from 'react';
import { Fragment, useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { ApiResponse, Results } from '../core/api.type';
import { DEFAULT_LANGUAGE } from '../core/intl/getDefaultLanguage';
import LanguageContext from '../core/intl/LanguageContext';
import Loader from '../core/loader/Loader';
import { Registration } from '../register-page/register.type';
import { getRegistrations } from './registrations.service';
import RegistrationsDetails from './RegistrationsDetails';
import RegistrationsOverview from './RegistrationsOverview';

const INITIAL_STATE: Registration[] = [];

const RegistrationsContainer = () => {
  const [registrations, setRegistrations] = useState(INITIAL_STATE);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    if (registrations === INITIAL_STATE) {
      getRegistrations().then(setRegistrations);
    }
  });

  if ((registrations as ApiResponse).result === Results.UNAUTHORIZED) {
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
