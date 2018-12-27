import * as React from 'react';
import { Menu } from 'semantic-ui-react';

import './Footer.scss';

const Footer = () => {
  return (
    <Menu inverted={true} className="Footer">
      <Menu.Item>&#169; GSL 2019</Menu.Item>
      <Menu.Item>
        <a href="mailto:ad-sss-info@speleo-lausanne.ch">Contact</a>
      </Menu.Item>
    </Menu>
  );
};

export default Footer;
