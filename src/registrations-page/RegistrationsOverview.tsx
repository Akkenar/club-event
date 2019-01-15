import { Fragment, useState } from 'react';
import * as React from 'react';
import { useContext } from 'react';
import { Button, Icon, Segment } from 'semantic-ui-react';
import getKey from '../core/intl/getKey';
import LanguageContext from '../core/intl/LanguageContext';
import { Registration } from '../register-page/register.type';
import { exportToCsv } from './csv.lib';
import RegistrationsDownloadHelp from './RegistrationsDownloadHelp';
import RegistrationsProducts from './RegistrationsProducts';

import './RegistrationsOverview.scss';

interface RegistrationsOverviewProps {
  registrations: Registration[];
}

const RegistrationsOverview = ({
  registrations,
}: RegistrationsOverviewProps) => {
  const { messages } = useContext(LanguageContext);
  const [showProducts, setShowProducts] = useState(false);

  const save = () => exportToCsv(registrations);
  const toggleProducts = () => setShowProducts(!showProducts);
  const hasRegistrations = !!registrations && !!registrations.length;

  return (
    <Segment>
      <div className="RegistrationsOverview">
        <div
          data-testid="registrations-total"
          className="RegistrationsOverview__Total"
        >
          <strong>{getKey('registrations.total', messages)}:</strong>{' '}
          {hasRegistrations ? registrations.length : '0'}
        </div>
        {hasRegistrations ? (
          <Fragment>
            <div className="RegistrationsOverview_MoreDetails">
              <Button
                className="RegistrationsOverview__Button"
                icon={true}
                color="vk"
                onClick={toggleProducts}
                data-testid="toggle-products"
                title={getKey('registrations.details', messages)}
              >
                {showProducts ? <Icon name="minus" /> : <Icon name="magnify" />}
              </Button>
            </div>
            <div className="RegistrationsOverview__Export">
              <Button
                className="RegistrationsOverview__Button"
                labelPosition="right"
                color="vk"
                icon={true}
                onClick={save}
                data-testid="download-registrations"
                title={getKey('registrations.download', messages)}
              >
                {getKey('registrations.download', messages)}
                <Icon name="download" />
              </Button>
              <RegistrationsDownloadHelp className="RegistrationsOverview__Button" />
            </div>
          </Fragment>
        ) : null}
      </div>
      {showProducts ? (
        <RegistrationsProducts registrations={registrations} />
      ) : null}
    </Segment>
  );
};

export default RegistrationsOverview;
