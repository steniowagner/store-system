// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const Container = styled.main`
  height: 100%;
  flex-grow: 1;
  min-width: 0;
`;

const Wrapper = styled.div`
  margin-left: 220px;
  height: 100%;
`;

const styles = theme => ({
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    height: '100%',
    padding: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit,
  },
  toolbar: theme.mixins.toolbar,
});

type Props = {
  children: Object,
  classes: Object,
};

const ContainerWrapper = ({ children, classes }: Props): Object => (
  <Container
    className={classes.content}
  >
    <div className={classes.toolbar} />
    <Wrapper>
      {children}
    </Wrapper>
  </Container>
);

export default withStyles(styles)(ContainerWrapper);
