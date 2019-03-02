import * as React from 'react';
import { useContext, Fragment } from 'react';
import Sponsor from './Sponsor';
import { Header } from 'semantic-ui-react';
import getKey from '../../core/intl/getKey';
import LanguageContext from '../../core/intl/LanguageContext';
import ScrollableAnchor from '../../core/scrollable-anchor/ScrollableAnchor';

import logo1 from '../../assets/comptoir-des-techniques-verticales-logo.jpg';
import logo2 from '../../assets/vallorbe.jpg';
import logo3 from '../../assets/logo_grottes.jpg';
import logo4 from '../../assets/imsa.jpg';
import logo5 from '../../assets/technicongres.jpg';

import './SponsorsSection.scss';

const SponsorsSection = () => {
  const { messages } = useContext(LanguageContext);

  return (
    <Fragment>
      <Header as="h2">
        <ScrollableAnchor text={getKey('home.page.sponsors', messages)} />
      </Header>
      <div className="SponsorsSection__container">
        <Sponsor
          name="Comptoire des Techniques Verticales"
          logo={logo1}
          url="https://techniquesverticales.ch"
        />
        <Sponsor
          name="Office du Tourisme de Vallorbe"
          logo={logo2}
          url="http://www.vallorbe.ch"
        />
        <Sponsor
          name="Grottes de Vallorbes"
          logo={logo3}
          url="https://grottesdevallorbe.ch"
        />
        <Sponsor name="IMSA" logo={logo4} url="http://www.neon-imsa.ch" />
        <Sponsor
          name="Technicongress"
          logo={logo5}
          url="https://www.technicongres.ch/"
        />
      </div>
    </Fragment>
  );
};

export default SponsorsSection;
