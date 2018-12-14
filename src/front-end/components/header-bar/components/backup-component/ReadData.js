// @flow

import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import AttachFile from '@material-ui/icons/AttachFile';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as BackupCreators } from '../../../../store/ducks/backup';

const AttachFileIcon = styled(AttachFile)`
  margin-right: 16px;
`;

type Props = {
  importBackupFile: Function,
};

class ReadData extends Component {
  state = {

  };

  render() {
    return (
      <Button
        onClick={this.props.importBackupFile}
        variant="contained"
        color="primary"
      >
        <AttachFileIcon />
        Ler os dados de um arquivo backup
      </Button>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(BackupCreators, dispatch);

export default connect(null, mapDispatchToProps)(ReadData);
