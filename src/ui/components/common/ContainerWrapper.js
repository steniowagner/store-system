// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import styled from 'styled-components';
import AppTheme from '../../styles';

const Container = styled.main`
  height: 100%;
  flex-grow: 1;
  min-width: 0;
`;

const Wrapper = styled(Paper)`
  margin-left: 220px;
  height: 80%;
`;

const styles = theme => ({
  container: {
    ...theme.mixins.gutters(),
    backgroundColor: AppTheme.colors.lightGray,
    alignItems: 'center',
    display: 'flex',
    flex: 1,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    paddingTop: theme.spacing.unit * 1.5,
    paddingRight: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 3,
    width: '100%',
  },
});

type Props = {
  children: Object,
  classes: Object,
};

const ContainerWrapper = ({ children, classes }: Props): Object => (
  <Container
    className={classes.container}
  >
    <div
      className={classes.toolbar}
    />
    <Wrapper
      className={classes.content}
    >
      {children}
    </Wrapper>
  </Container>
);

export default withStyles(styles)(ContainerWrapper);
