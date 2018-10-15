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
  onClick: Function,
  disabled: boolean,
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
    const { onChageFormToEditMode } = this.props;
    const { isDialOpen } = this.state;

    const actionButtons = [{
      icon: <DeleteIcon />,
      name: 'Remover Usuário',
      action: () => this.onToggleRemoveDialog(),
    }, {
      icon: <EditIcon />,
      name: 'Editar Usuário',
      action: () => onChageFormToEditMode(),
    }];

    return (
      <SpeedDial
        ariaLabel="Edit or Remove User"
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
    const { onRemoveItem } = this.props;

    return (
      <Dialog
        description="Se executar esta ação, os dados deste Usuário serão perdidos para sempre, e não poderão ser recuperados de forma alguma."
        title="Tem certeza que quer remover este Usuário?"
        positiveAction={() => onRemoveItem()}
        negativeAction={this.onToggleRemoveDialog}
        onCloseDialog={this.onToggleRemoveDialog}
        isOpen={isRemoveDialogOpen}
        positiveText="SIM"
        negativeText="NÃO"
      />
    );
  };

  render() {
    const { mode } = this.props;

    return (
      <Container>
        {(mode === 'visualize') ? this.renderMultipleChoiceButton() : this.renderDefaultButton(mode)}
        {this.renderRemoveDialog()}
      </Container>
    );
  }
}

export default ActionFormButton;
