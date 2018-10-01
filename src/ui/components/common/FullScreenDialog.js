import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';

import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.lightGray};
  overflow-y: auto;
`;

const styles = theme => ({
  container: {
    paddingTop: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 20,
    paddingRight: theme.spacing.unit * 20,
    paddingBottom: theme.spacing.unit * 20,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 8,
    paddingRight: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 5,
  },
});

type Props = {
  actionTitle: string,
  title: string,
  onClose: Function,
  children: Object,
  isOpen: boolean,
};

const TransitionComponent = (props: Object): Object => <Slide direction="up" {...props} />;

const FullScreenDialog = ({
  onClickMainAction,
  actionTitle,
  children,
  classes,
  onClose,
  isOpen,
  title,
}: Props): Object => (
  <Dialog
    TransitionComponent={TransitionComponent}
    onClose={onClose}
    open={isOpen}
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
