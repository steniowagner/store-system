// @flow

import React from 'react';

import Button from '@material-ui/core/Button';
import Save from '@material-ui/icons/Save';

import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as BackupCreators } from '../../../../store/ducks/backup';

const SaveIcon = styled(Save)`
  margin-right: 16px;
`;

type Props = {
  backupRequest: Function,
};

const SaveData = ({ backupRequest }: Props): Object => (
  <Button
    onClick={backupRequest}
    variant="contained"
    color="primary"
  >
    <SaveIcon />
    Fazer o Backup dos meus Dados Atuais
  </Button>
);

const mapDispatchToProps = dispatch => bindActionCreators(BackupCreators, dispatch);

export default connect(null, mapDispatchToProps)(SaveData);
