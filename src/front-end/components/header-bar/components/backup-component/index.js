import React, { Component, Fragment } from 'react';

import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloudIcon from '@material-ui/icons/Backup';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

import styled from 'styled-components';
import appStyles from '../../../../styles';

import SaveData from './SaveData';
import ReadData from './ReadData';

const FilePathButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
  margin-right: 16px;
`;

const CheckCircleOutlineIcon = styled(({ ...props }) => (
  <CheckCircleOutline
    {...props}
    style={{
      fontSize: 36,
    }}
  />
))`
  color: ${({ theme }) => theme.colors.success};
  margin-left: 18px;
`;

class Backup extends Component {
  state = {
    isBackupDialogOpen: false,
  };

  onToggleBackupDialog = (): void => {
    const { isBackupDialogOpen } = this.state;

    this.setState({
      isBackupDialogOpen: !isBackupDialogOpen,
    });
  };

  renderSlide = (props: Object): Object => (
    <Slide
      direction="up"
      {...props}
    />
  );

  renderTitlte = (): Object => (
    <DialogTitle
      id="alert-dialog-slide-title"
    >
      Backup
    </DialogTitle>
  );

  renderDescription = (): Object => (
    <DialogContentText
      id="alert-dialog-slide-description"
    >
      A funcionalidade de Backup ajuda a manter seus dados sempre salvos e portáveis.
    </DialogContentText>
  );

  renderSaveDataButton = (): Object => {
    return (
      <FilePathButtonWrapper>
        <SaveData />
      </FilePathButtonWrapper>
    );
  };

  renderReadDataButton = (): Object => {
    return (
      <FilePathButtonWrapper>
        <ReadData />
        <CheckCircleOutlineIcon />
      </FilePathButtonWrapper>
    );
  };

  renderActionButtons = (): Object => (
    <DialogActions>
      <Button
        onClick={this.onToggleBackupDialog}
        color="primary"
      >
        VOLTAR
      </Button>
    </DialogActions>
  );

  renderDialog = (): Object => {
    const { isBackupDialogOpen } = this.state;

    return (
      <Dialog
        aria-describedby="alert-dialog-slide-description"
        aria-labelledby="alert-dialog-slide-title"
        TransitionComponent={this.renderSlide}
        onClose={this.onToggleBackupDialog}
        open={isBackupDialogOpen}
        disableBackdropClick
        maxWidth="sm"
      >
        {this.renderTitlte()}
        <DialogContent>
          {this.renderDescription()}
          {this.renderSaveDataButton()}
          {this.renderReadDataButton()}
        </DialogContent>
        {this.renderActionButtons()}
      </Dialog>
    );
  };

  render() {
    return (
      <Fragment>
        <IconButton
          onClick={this.onToggleBackupDialog}
          aria-label="Icon"
          style={{
            marginRight: 8,
          }}
          color="inherit"
        >
          <CloudIcon />
        </IconButton>
        {this.renderDialog()}
      </Fragment>
    );
  }
}

export default Backup;
