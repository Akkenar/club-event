import { useContext } from 'react';
import * as React from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import getKey from '../core/intl/getKey';
import LanguageContext from '../core/intl/LanguageContext';
import { Registration } from '../register-page/register.type';

import './RegistrationsDetails.scss';

interface RegistrationsDetailsProps {
  registrations: Registration[];
}
const RegistrationsDetails = ({ registrations }: RegistrationsDetailsProps) => {
  const { messages } = useContext(LanguageContext);

  if (!registrations || !registrations.length) {
    return null;
  }
  return (
    <Table celled={true} striped={true}>
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
            {getKey('register.form.lastName', messages)}
          </Table.HeaderCell>
          <Table.HeaderCell>
            {getKey('register.form.firstName', messages)}
          </Table.HeaderCell>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {registrations.map(registration => (
          <Table.Row key={registration.id}>
            <Table.Cell>{registration.reference}</Table.Cell>
            <Table.Cell>{registration.date}</Table.Cell>
            <Table.Cell>{registration.total} CHF</Table.Cell>
            <Table.Cell>{registration.lastName}</Table.Cell>
            <Table.Cell>{registration.firstName}</Table.Cell>
            <Table.Cell collapsing={true}>
              <Button color="black" icon={true}>
                <Icon name="magnify" />
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default RegistrationsDetails;
