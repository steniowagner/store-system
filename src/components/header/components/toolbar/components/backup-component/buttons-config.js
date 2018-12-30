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
    message: 'Import Data from a Backup file',
    Icon: AttachFileIcon,
  },

  [TYPES.EXPORT]: {
    message: 'Make the Backup of my current Data',
    Icon: SaveIcon,
  },
};
