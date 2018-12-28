import * as React from 'react';
import { useContext } from 'react';
import { Button, Icon, Segment } from 'semantic-ui-react';
import getKey from '../core/intl/getKey';
import LanguageContext from '../core/intl/LanguageContext';
import { Registration } from '../register-page/register.type';

import { exportToCsv } from './csv.lib';
import './RegistrationsOverview.scss';

interface RegistrationsOverviewProps {
  registrations: Registration[];
}
const RegistrationsOverview = ({
  registrations,
}: RegistrationsOverviewProps) => {
  const { messages } = useContext(LanguageContext);

  const save = () => exportToCsv(registrations);

  return (
    <Segment className="RegistrationsOverview">
      <div
        data-testid="registrations-total"
        className="RegistrationsOverview__Total"
      >
        <strong>{getKey('registrations.total', messages)}:</strong>{' '}
        {registrations.length}
      </div>
      <div className="RegistrationsOverview__Export">
        <Button icon={true} onClick={save} data-testid="download-registrations">
          <Icon name="download" />
        </Button>
      </div>
    </Segment>
  );
};

export default RegistrationsOverview;
