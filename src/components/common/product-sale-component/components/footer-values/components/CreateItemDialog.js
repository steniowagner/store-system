// @flow

import React, { Component } from 'react';

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
  ChildrenComponent: Object,
  isOnEditionMode: boolean,
  onCloseDialog: Function,
  onRemoveItem: Function,
  onCreateItem: Function,
  isOpen: boolean,
  entity: string,
  total: ?number,
  mode: string,
  item: Object,
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

  renderContent = (shouldShowRemoveButton: boolean): Object => (
    <DialogWrapper>
      <DialogContent>
        {this.renderChildrenComponent()}
        {shouldShowRemoveButton && this.renderRemoveButton()}
      </DialogContent>
    </DialogWrapper>
  );

  renderActionButtons = (): Object => {
    const { onCloseDialog, onCreateItem } = this.props;
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
          CANCEL
        </Button>
        <Button
          disabled={!value}
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
      isOnEditionMode,
      onCloseDialog,
      entity,
      isOpen,
    } = this.props;

    const title = (isOnEditionMode ? `Edit ${entity}` : `Add ${entity}`);

    return (
      <Dialog
        aria-describedby="alert-dialog-slide-description"
        aria-labelledby="alert-dialog-slide-title"
        TransitionComponent={this.renderSlide}
        fullWidth={entity === 'Observation'}
        onClose={onCloseDialog}
        keepMounted={false}
        open={isOpen}
        maxWidth="sm"
      >
        {this.renderTitle(title)}
        {this.renderContent(isOnEditionMode)}
        {this.renderActionButtons()}
      </Dialog>
    );
  }
}

export default NewItemDialog;
