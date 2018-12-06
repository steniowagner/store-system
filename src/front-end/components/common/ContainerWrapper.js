// @flow

import React from 'react';

import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  padding: 84px 28px 0 28px;
  overflow: scroll;
`;

const ChildrenWrapper = styled(Paper)`
  padding: 28px;
  margin: 32px 0;
`;

type Props = {
  children: Object,
};

const ContainerWrapper = ({ children }: Props): Object => (
  <Container>
    <ChildrenWrapper>
      {children}
    </ChildrenWrapper>
  </Container>
);

export default ContainerWrapper;
