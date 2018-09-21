import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const Container = styled.main`
  flex-grow: 1;
  min-width: 0;
  height: 100%;
`;

const Wrapper = styled.div`
  background-color: #f0f;
  margin-left: 200px;
  height: 100%;
`;

const styles = theme => ({
  content: {
    backgroundColor: theme.palette.background.default,
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
