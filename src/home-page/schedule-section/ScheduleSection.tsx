import { Header } from 'semantic-ui-react';
import React from 'react';
import ScrollableAnchor from '../../core/scrollable-anchor/ScrollableAnchor';
import { useContext, Fragment } from 'react';
import LanguageContext from '../../core/intl/LanguageContext';
import getKey from '../../core/intl/getKey';

import './ScheduleSection.scss';

const ScheduleSection = () => {
  const { messages, schedule } = useContext(LanguageContext);

  // Help with the Semantic UI table integration
  const modifiedSchedule =
    schedule && schedule.replace('<table>', '<table class="ui celled table">');

  return (
    <Fragment>
      <Header as="h2">
        <ScrollableAnchor text={getKey('home.page.schedule', messages)} />
      </Header>
      <div
        className="ScheduleSection__content"
        dangerouslySetInnerHTML={{ __html: modifiedSchedule }}
      />
    </Fragment>
  );
};

export default ScheduleSection;
