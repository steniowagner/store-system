// @flow

import React, { Component, Fragment } from 'react';

import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Menu from '@material-ui/icons/Menu';

import styled from 'styled-components';

import Card from './components/Card';

const MenuIcon = styled(Menu)`
  color: ${({ theme }) => theme.colors.headerText};
`;

type State = {
  isCardDialogOpen: boolean,
};

class AboutMe extends Component<Props, State> {
  state = {
    isCardDialogOpen: false,
  };

  onToggleCardDialog = (): void => {
    const { isCardDialogOpen } = this.state;

    this.setState({
      isCardDialogOpen: !isCardDialogOpen,
    });
  };

  renderSlide = (props: Object): Object => (
    <Slide
      direction="up"
      {...props}
    />
  );

  renderDialog = (): Object => {
    const { isCardDialogOpen } = this.state;

    return (
      <Dialog
        aria-describedby="alert-dialog-slide-description"
        aria-labelledby="alert-dialog-slide-title"
        TransitionComponent={this.renderSlide}
        onClose={this.onToggleCardDialog}
        open={isCardDialogOpen}
        disableBackdropClick
      >
        <Card
          onToggleCardDialog={this.onToggleCardDialog}
        />
      </Dialog>
    );
  };

  render() {
    return (
      <Fragment>
        <IconButton
          onClick={this.onToggleCardDialog}
          aria-label="Icon"
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        {this.renderDialog()}
      </Fragment>
    );
  }
}

export default AboutMe;
