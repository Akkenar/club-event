import React from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';

import './RegistrationsDownloadHelp.scss';

interface RegistrationsDownloadHelpProps {
  className: string;
}

const RegistrationsDownloadHelp = ({
  className,
}: RegistrationsDownloadHelpProps) => {
  const trigger = (
    <Button icon={true} className={className}>
      <Icon name="question" />
    </Button>
  );

  return (
    <Modal trigger={trigger} closeIcon={true}>
      <Modal.Header>Importer le fichier</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>
            Le fichier téléchargé est au format <strong>csv</strong>, séparé par
            des tabulations.
          </p>
          <p>
            Il est nécessaire de l'importer dans Excel en tant que données avec
            un jeu de charactères <strong>Unicode (UTF-8)</strong>.
          </p>
          <p>
            Certaines version d'Excel peuvent cependant ouvrir le fichier
            directement. LibreOffice quant à lui devrait ouvrir le fichier sans
            soucis.
          </p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default RegistrationsDownloadHelp;
