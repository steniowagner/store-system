import AttachFile from '@material-ui/icons/AttachFile';
import Save from '@material-ui/icons/Save';

import styled from 'styled-components';

const AttachFileIcon = styled(AttachFile)`
  margin-right: 16px;
`;

const SaveIcon = styled(Save)`
  margin-right: 16px;
`;

export const TYPES = {
  IMPORT: 'IMPORT',
  EXPORT: 'EXPORT',
};

export const CONFIG = {
  [TYPES.IMPORT]: {
    message: 'Importar os dados de um arquivo backup',
    Icon: AttachFileIcon,
  },

  [TYPES.EXPORT]: {
    message: 'Fazer o Backup dos meus Dados Atuais',
    Icon: SaveIcon,
  },
};
