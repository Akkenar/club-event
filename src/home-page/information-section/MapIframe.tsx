import * as React from 'react';
import { useContext } from 'react';
import getKey from '../../core/intl/getKey';
import LanguageContext from '../../core/intl/LanguageContext';
import { useIntersectionObserver } from '../../core/useIntersectionObserver';

const MapIframe = () => {
  const [isDisplayed, handleRef] = useIntersectionObserver();
  const { messages } = useContext(LanguageContext);

  if (!isDisplayed) {
    return (
      <div data-testid="iframe-placeholder" ref={handleRef}>
        {getKey('loading', messages)}
      </div>
    );
  }

  return (
    <iframe
      title="Vallorbe"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2735.705437069773!2d6.377488315962078!3d46.71154597913546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478db3ee662c90db%3A0x172582dbb0e2b277!2sAuberge+Communale+de+Vallorbe!5e0!3m2!1sen!2sch!4v1541839403749"
      width="100%"
      height="600"
      frameBorder="0"
      style={{ border: 0, margin: '1em 0' }}
      allowFullScreen={true}
    />
  );
};

export default MapIframe;
