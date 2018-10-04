import React, { Component } from 'react';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDial from '@material-ui/lab/SpeedDial';
import Button from '@material-ui/core/Button';

import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

type Props = {
  onClick: Function,
  disabled: boolean,
  mode: string,
};

type State = {
  isDialOpen: boolean,
};

class ActionFormButton extends Component<Props, State> {
  state = {
    isDialOpen: false,
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

  render() {
    const { mode } = this.props;

    return (
      <Container>
        {this.renderDefaultButton(mode)}
      </Container>
    );
  }
}

export default ActionFormButton;
