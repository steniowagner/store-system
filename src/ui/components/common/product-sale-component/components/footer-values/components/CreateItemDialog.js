// @flow

import React, { Component } from 'react';

import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

import styled from 'styled-components';

import RemoveButton from './RemoveButton';

const DialogWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

type Props = {
  onCloseDialog: Function,
  onCreateItem: Function,
  onRemoveItem: Function,
  ChildrenComponent: Object,
  item: Object,
  entity: string,
  mode: string,
  isOpen: boolean,
  total: ?number,
};

type State = {
  value: string,
  type: string,
};

class NewItemDialog extends Component<Props, State> {
  state = {
    value: '',
    type: '',
  };

  onSetValues = (type: string, value: string): void => {
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

  renderChildrenComponent = (): Object => {
    const { ChildrenComponent, item, total } = this.props;
    const { value } = this.state;

    return (
      <ChildrenComponent
        onSetValues={this.onSetValues}
        value={value}
        total={total}
        item={item}
      />
    );
  };

  renderContent = (): Object => (
    <DialogWrapper>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-slide-description"
        >
          {this.renderChildrenComponent()}
          {this.renderRemoveButton()}
        </DialogContentText>
      </DialogContent>
    </DialogWrapper>
  );

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
            this.onRestartState();
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

  renderRemoveButton = (): Object => {
    const {
      onRemoveItem,
      entity,
      item,
      mode,
    } = this.props;

    return (
      <RemoveButton
        onRemove={() => {
          onRemoveItem();
          this.onRestartState();
        }}
        entity={entity}
        item={item}
        mode={mode}
      />
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
        fullWidth={entity === 'Observação'}
        onClose={onCloseDialog}
        keepMounted={false}
        open={isOpen}
        maxWidth="sm"
      >
        {this.renderTitle(title)}
        {this.renderContent()}
        {this.renderActionButtons()}
      </Dialog>
    );
  }
}

export default NewItemDialog;
