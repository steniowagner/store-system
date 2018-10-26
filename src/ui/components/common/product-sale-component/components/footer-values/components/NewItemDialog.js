import React, { Component } from 'react';

import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

import styled from 'styled-components';

const DialogWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

class NewItemDialog extends Component {
  state = {
    value: '',
    type: '',
  };

  onTypeValue = (type: string, value: string): void => {
    this.setState({
      value,
      type,
    });
  };

  onRestartState = (): void => {
    this.setState({
      value: '',
      type: '',
    });
  };

  renderSlide = (props: Object): Object => (
    <Slide
      direction="up"
      {...props}
    />
  );

  renderTitle = (title: string): Object => (
    <DialogTitle
      id="alert-dialog-slide-title"
    >
      {title}
    </DialogTitle>
  );

  renderContent = (): Object => {
    const {
      ChildrenComponent,
      onRemoveItem,
      entity,
      item,
      mode,
    } = this.props;

    const { value } = this.state;

    return (
      <DialogWrapper>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
          >
            <ChildrenComponent
              onTypeValue={this.onTypeValue}
              onRemove={onRemoveItem}
              entity={entity}
              value={value}
              item={item}
              mode={mode}
            />
          </DialogContentText>
        </DialogContent>
      </DialogWrapper>
    );
  }

  renderActionButtons = (): Object => {
    const { onCloseDialog, onCreateItem, mode } = this.props;
    const { value, type } = this.state;

    return (
      <DialogActions>
        <Button
          onClick={() => {
            this.onRestartState();
            onCloseDialog();
          }}
          color="primary"
        >
          CANCELAR
        </Button>
        <Button
          disabled={(mode === 'edit' || !value)}
          onClick={() => {
            onCreateItem(value, type);
            onCloseDialog();
          }}
          color="primary"
        >
          OK
        </Button>
      </DialogActions>
    );
  };

  render() {
    const {
      onCloseDialog,
      entity,
      isOpen,
      mode,
      item,
    } = this.props;

    const hasItemSelected = (typeof item === 'object' ? !!item.type : !!item);
    const isOnEditionMode = (mode === 'edit');

    const title = ((hasItemSelected || isOnEditionMode) ? `Editar ${entity}` : `Adicionar ${entity}`);

    return (
      <Dialog
        aria-describedby="alert-dialog-slide-description"
        aria-labelledby="alert-dialog-slide-title"
        TransitionComponent={this.renderSlide}
        onClose={onCloseDialog}
        open={isOpen}
        maxWidth="sm"
        fullWidth={entity === 'Observação'}
      >
        {this.renderTitle(title)}
        {this.renderContent()}
        {this.renderActionButtons()}
      </Dialog>
    );
  }
}

export default NewItemDialog;
