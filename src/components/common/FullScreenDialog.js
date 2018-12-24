// @flow

import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';

import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.lightGray};
  overflow-y: auto;
`;

const styles = theme => ({
  container: {
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 6}px`,
  },
  content: {
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 6}px`,
  },
  toolbar: theme.mixins.toolbar,
});

type Props = {
  children: Object,
  classes: Object,
  onClose: Function,
  isOpen: boolean,
  title: string,
};

const TransitionComponent = (props: Object): Object => (
  <Slide
    {...props}
    direction="up"
  />
);

const FullScreenDialog = ({
  children,
  classes,
  onClose,
  isOpen,
  title,
}: Props): Object => (
  <Dialog
    TransitionComponent={TransitionComponent}
    disableBackdropClick
    onClose={onClose}
    open={!!isOpen}
    fullScreen
  >
    <AppBar>
      <Toolbar>
        <IconButton
          aria-label="Close"
          onClick={onClose}
          color="inherit"
        >
          <CloseIcon />
        </IconButton>
        <Typography
          styles={{ flex: 1 }}
          color="inherit"
          variant="title"
        >
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
    <div
      className={classes.toolbar}
    />
    <Wrapper
      className={classes.container}
    >
      <Paper
        className={classes.content}
      >
        {children}
      </Paper>
    </Wrapper>
  </Dialog>
);

export default withStyles(styles)(FullScreenDialog);
