// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import styled from 'styled-components';

const Container = styled.main`
  height: 100%;
`;

// margin-left: 250px;
const Wrapper = styled(Paper)`
  margin-top: 12px;
  height: 80%;
`;

const styles = theme => ({
  container: {
    ...theme.mixins.gutters(),
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    <Wrapper
      className={classes.content}
    >
      {children}
    </Wrapper>
  </Container>
);

export default withStyles(styles)(ContainerWrapper);
