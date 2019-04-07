import * as React from 'react';
import { Fragment, useContext, useState } from 'react';
import { Button, Icon, Label, Table } from 'semantic-ui-react';
import { formatDate } from '../core/date.lib';
import getKey from '../core/intl/getKey';
import LanguageContext from '../core/intl/LanguageContext';
import OrderRecap from '../core/order-recap/OrderRecap';
import {
  Registration,
  RegistrationStatus,
} from '../register-page/register.type';

import './RegistrationsDetails.scss';

interface RegistrationsDetailsProps {
  registrations: Registration[];
}

const INITIAL_STATE: Registration | null = null;

function getCancelledClassName(registration: Registration): string | undefined {
  return registration.status === RegistrationStatus.INACTIVE
    ? 'RegistrationsDetails__Row--inactive'
    : undefined;
}

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
      <Table.Cell colSpan={5} className={getCancelledClassName(details)}>
        <OrderRecap registration={details} />
      </Table.Cell>
    </Table.Row>
  );
};

const RegistrationsDetails = ({ registrations }: RegistrationsDetailsProps) => {
  const { messages } = useContext(LanguageContext);
  const [displayedDetails, setDisplayedDetails] = useState<Registration | null>(
    INITIAL_STATE,
  );

  if (!registrations || !registrations.length) {
    return null;
  }

  const showDetails = (registration: Registration) => () => {
    if (displayedDetails === registration) {
      // Close the details
      setDisplayedDetails(INITIAL_STATE);
    } else {
      setDisplayedDetails(registration);
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
            <Table.Row className={getCancelledClassName(registration)}>
              <Table.Cell>
                {registration.reference}
                {registration.status === RegistrationStatus.INACTIVE ? (
                  <Label
                    as="span"
                    color="red"
                    tag={true}
                    style={{ marginLeft: '2em' }}
                  >
                    {getKey('registrations.inactive', messages)}
                  </Label>
                ) : null}
              </Table.Cell>
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
                  {registration === displayedDetails ? (
                    <Icon name="minus" />
                  ) : (
                    <Icon name="magnify" />
                  )}
                </Button>
              </Table.Cell>
            </Table.Row>
            {getDetails(registration, displayedDetails)}
          </Fragment>
        ))}
      </Table.Body>
    </Table>
  );
};

export default RegistrationsDetails;
