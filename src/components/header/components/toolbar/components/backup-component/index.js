import React, { Component, Fragment } from 'react';

import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import DialogContentText from '@material-ui/core/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Cloud from '@material-ui/icons/Backup';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as BackupCreators } from '../../../../../../store/ducks/backup';

import { TYPES, CONFIG } from './buttons-config';
import ButtonAction from './ButtonAction';

const MessageWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 28px;
`;

const Message = styled.p`
  margin-right: 24px;
  font-size: 18px;
  font-weight: 500;
  font-color: ${({ theme }) => theme.colors.darkText};
`;

const CloudIcon = styled(Cloud)`
  color: ${({ theme }) => theme.colors.headerText};
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
  margin-left: -12px;
`;

const ErrorOutlineIcon = styled(({ ...props }) => (
  <ErrorOutline
    {...props}
    style={{
      fontSize: 36,
    }}
  />
))`
  color: ${({ theme }) => theme.colors.danger};
  margin-left: -12px;
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
      The feature of Backup helps to keep your data always safe and portable.
    </DialogContentText>
  );

  renderSaveDataButton = (): Object => {
    const { exportBackupFile, backup } = this.props;
    const config = CONFIG[TYPES.EXPORT];

    return (
      <ButtonAction
        isDisabled={backup.loading}
        action={exportBackupFile}
        {...config}
      />
    );
  };

  renderReadDataButton = (): Object => {
    const { importBackupFile, backup } = this.props;
    const config = CONFIG[TYPES.IMPORT];

    return (
      <ButtonAction
        isDisabled={backup.loading}
        action={importBackupFile}
        {...config}
      />
    );
  };

  renderActionButtons = (): Object => {
    const { resetState, backup } = this.props;

    return (
      <DialogActions>
        <Button
          disabled={backup.loading}
          onClick={() => {
            this.onToggleBackupDialog();
            resetState();
          }}
          color="primary"
        >
          BACK
        </Button>
      </DialogActions>
    );
  }

  renderMessage = (): Object => {
    const { backup } = this.props;
    const { loading, message, error } = backup;

    const isOperationSuccessful = (!loading && !!message && !error);
    const messageContent = (error || message);

    return (
      <MessageWrapper>
        <Message>
          {messageContent}
        </Message>
        {loading && <CircularProgress />}
        {error && <ErrorOutlineIcon />}
        {isOperationSuccessful && <CheckCircleOutlineIcon />}
      </MessageWrapper>
    );
  }

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
          {this.renderMessage()}
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

const mapDispatchToProps = dispatch => bindActionCreators(BackupCreators, dispatch);

const mapStateToProps = state => ({
  backup: state.backup,
});

export default connect(mapStateToProps, mapDispatchToProps)(Backup);
