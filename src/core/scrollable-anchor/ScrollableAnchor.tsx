import * as React from 'react';
import { normalizeTitle } from './scrollable-anchor.lib';

import './ScrollableAnchor.scss';

interface ScrollableAnchorProps {
  text: string;
}

const ScrollableAnchor = ({ text }: ScrollableAnchorProps) => {
  return (
    <div className="ScrollableAnchor" tabIndex={-1} id={normalizeTitle(text)}>
      {text}
    </div>
  );
};

export default ScrollableAnchor;
