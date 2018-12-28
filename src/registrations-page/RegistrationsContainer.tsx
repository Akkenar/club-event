import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { ApiResponse, Results } from '../core/api.type';
import LanguageContext from '../core/intl/LanguageContext';
import Loader from '../core/loader/Loader';
import { Registration } from '../register-page/register.type';
import { getRegistrations } from './registrations.service';

const INITIAL_STATE: Registration[] = [];

const RegistrationsContainer = () => {
  const [registrations, setRegistrations] = useState(INITIAL_STATE);
  const { messages, language } = useContext(LanguageContext);

  useEffect(() => {
    if (registrations === INITIAL_STATE) {
      getRegistrations().then(setRegistrations);
    }
  });

  if ((registrations as ApiResponse).result === Results.UNAUTHORIZED) {
    // Probably because not logged.
    return <Redirect to={`/${language}/login`} />;
  }

  if (registrations === INITIAL_STATE) {
    // The page is loading.
    return <Loader />;
  }

  // Different bits of the page.
  return <div className="Registrations__Total">{registrations.length}</div>;
};

export default RegistrationsContainer;
