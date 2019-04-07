import { useEffect, useState } from 'react';
import { ApiResponse, Results } from '../core/api.type';
import { getRegistrations } from './registrations.service';
import { Registration } from '../register-page/register.type';

interface UseRegistrationsDataType {
  isNotAuthorized: boolean;
  registrations: Registration[];
}

export function useRegistrationsData(
  initialState: Registration[],
): UseRegistrationsDataType {
  const [registrations, setRegistrations] = useState(initialState);

  const isNotAuthorized =
    (registrations as ApiResponse).result === Results.UNAUTHORIZED;

  useEffect(() => {
    if (isNotAuthorized) {
      return;
    }

    let isCancelled = false;
    if (registrations === initialState) {
      getRegistrations().then(value => {
        if (!isCancelled) {
          setRegistrations(value);
        }
      });
    }

    // Don't update the state on an unmounted component.
    return () => {
      isCancelled = true;
    };
  }, [registrations, isNotAuthorized, initialState]);

  return {
    isNotAuthorized,
    registrations,
  };
}
