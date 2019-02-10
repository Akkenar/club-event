import { Fragment, useContext, useState } from 'react';
import * as React from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import { formatDate } from '../core/date.lib';
import getKey from '../core/intl/getKey';
import LanguageContext from '../core/intl/LanguageContext';
import OrderRecap from '../core/order-recap/OrderRecap';
import { Registration } from '../register-page/register.type';

import './RegistrationsDetails.scss';

interface RegistrationsDetailsProps {
  registrations: Registration[];
}

const INITIAL_STATE: Registration | null = null;

const getDetails = (
  registration: Registration,
  details: Registration | null,
) => {
  // To satisfy Typescript constraint, details can be null.
  if (!details) {
    return null;
  }

  // Not the current registration.
  if (registration !== details) {
    return null;
  }

  return (
    <Table.Row data-testid={`details-for-${details.id}`}>
      <Table.Cell colSpan={5}>
        <OrderRecap registration={details} />
      </Table.Cell>
    </Table.Row>
  );
};

const RegistrationsDetails = ({ registrations }: RegistrationsDetailsProps) => {
  const { messages } = useContext(LanguageContext);
  const [details, setDetails] = useState(INITIAL_STATE);

  if (!registrations || !registrations.length) {
    return null;
  }

  const showDetails = (registration: any) => () => {
    if (details === registration) {
      // Close the details
      setDetails(INITIAL_STATE);
    } else {
      setDetails(registration);
    }
  };

  return (
    <Table celled={true} compact={true}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            {getKey('registrations.reference', messages)}
          </Table.HeaderCell>
          <Table.HeaderCell>
            {getKey('registrations.date', messages)}
          </Table.HeaderCell>
          <Table.HeaderCell>
            {getKey('register.form.counts.total', messages)}
          </Table.HeaderCell>
          <Table.HeaderCell>
            {getKey('registrations.identification', messages)}
          </Table.HeaderCell>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {registrations.map(registration => (
          <Fragment key={registration.id}>
            <Table.Row>
              <Table.Cell>{registration.reference}</Table.Cell>
              <Table.Cell>{formatDate(registration.date)}</Table.Cell>
              <Table.Cell>CHF {registration.total}</Table.Cell>
              <Table.Cell>
                <strong>
                  {registration.firstName} {registration.lastName}
                </strong>
                <address>
                  <div>
                    {registration.street} {registration.no}
                  </div>
                  <div>
                    {registration.npa} {registration.locality}
                  </div>
                </address>
              </Table.Cell>
              <Table.Cell collapsing={true}>
                <Button
                  data-testid={`details-${registration.id}`}
                  color="black"
                  icon={true}
                  onClick={showDetails(registration)}
                  title={getKey('registrations.details', messages)}
                >
                  {registration === details ? (
                    <Icon name="minus" />
                  ) : (
                    <Icon name="magnify" />
                  )}
                </Button>
              </Table.Cell>
            </Table.Row>
            {getDetails(registration, details)}
          </Fragment>
        ))}
      </Table.Body>
    </Table>
  );
};

export default RegistrationsDetails;
