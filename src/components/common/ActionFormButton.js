import React, { Component } from 'react';

import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDial from '@material-ui/lab/SpeedDial';
import Button from '@material-ui/core/Button';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

import styled from 'styled-components';

import Dialog from './Dialog';

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

type Props = {
  onChageFormToEditMode: Function,
  onRemoveItem: Function,
  canBeRemoved: boolean,
  onClick: Function,
  disabled: boolean,
  entity: string,
  mode: string,
};

type State = {
  isDialOpen: boolean,
};

class ActionFormButton extends Component<Props, State> {
  state = {
    isRemoveDialogOpen: false,
    isDialOpen: false,
  };

  onToggleDial = (): void => {
    const { isDialOpen } = this.state;

    this.setState({
      isDialOpen: !isDialOpen,
    });
  };

  onToggleRemoveDialog = (): void => {
    const { isRemoveDialogOpen } = this.state;

    this.setState({
      isRemoveDialogOpen: !isRemoveDialogOpen,
    });
  };

  onCloseDial = (): void => {
    this.setState({
      isDialOpen: false,
    });
  };

  renderDefaultButton = (mode: string): Object => {
    const { onClick, disabled } = this.props;

    const IconConfig = (mode === 'create'
      ? { icon: <SaveIcon />, ariaLabel: 'Save' }
      : { icon: <EditIcon />, ariaLabel: 'Edit' }
    );

    return (
      <Button
        onClick={(event) => {
          event.preventDefault();
          onClick();
        }}
        aria-label={IconConfig.ariaLabel}
        disabled={disabled}
        color="primary"
        type="submit"
        variant="fab"
      >
        {IconConfig.icon}
      </Button>
    );
  };

  renderMultipleChoiceButton = (): Object => {
    const { onChageFormToEditMode, canBeRemoved } = this.props;
    const { isDialOpen } = this.state;

    const DeleteOption = {
      action: () => this.onToggleRemoveDialog(),
      name: 'Remove',
      icon: <DeleteIcon />,
    };

    const EditOption = {
      action: () => onChageFormToEditMode(),
      name: 'Edit',
      icon: <EditIcon />,
    };

    const actionButtons = (canBeRemoved ? [DeleteOption, EditOption] : [EditOption]);

    return (
      <SpeedDial
        ariaLabel="Edit or Remove"
        onClick={this.onToggleDial}
        onClose={this.onToggleDial}
        icon={<SpeedDialIcon />}
        open={isDialOpen}
      >
        {actionButtons.map(actionButton => (
          <SpeedDialAction
            onClick={() => {
              actionButton.action();
              this.onCloseDial();
            }}
            tooltipTitle={actionButton.name}
            icon={actionButton.icon}
            tooltipPlacement="left"
            key={actionButton.name}
            tooltipOpen
          />
        ))}
      </SpeedDial>
    );
  };

  // Can't overlap the Form Dialog from User component
  renderRemoveDialog = (): Object => {
    const { isRemoveDialogOpen } = this.state;
    const { onRemoveItem, entity } = this.props;

    return (
      <Dialog
        description={`If you perform this action, the data of this ${entity} will be lost, and wouldn't be recovered in any way.`}
        title={`Are you sure to remove this ${entity}?`}
        positiveAction={() => onRemoveItem()}
        negativeAction={this.onToggleRemoveDialog}
        onCloseDialog={this.onToggleRemoveDialog}
        isOpen={isRemoveDialogOpen}
        disableBackdropClick
        positiveText="YES"
        negativeText="NO"
      />
    );
  };

  render() {
    const { mode } = this.props;

    return (
      <Container>
        {(mode === 'detail') ? this.renderMultipleChoiceButton() : this.renderDefaultButton(mode)}
        {this.renderRemoveDialog()}
      </Container>
    );
  }
}

export default ActionFormButton;
