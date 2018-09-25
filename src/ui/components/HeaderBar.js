// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Store from '@material-ui/icons/Store';

type Props = {
  classes: Object,
};

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
});

const Headerbar = ({ classes }: Props): Object => (
  <AppBar
    className={classes.appBar}
  >
    <Toolbar>
      <IconButton
        color="inherit"
      >
        <Store />
      </IconButton>
      <Typography
        variant="title"
        color="inherit"
        noWrap
      >
        Minha Loja
      </Typography>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(Headerbar);
