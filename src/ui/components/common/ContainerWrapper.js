// @flow

import React from 'react';

import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  padding: 90px 20px 0 20px;
  overflow: scroll;
`;

const ChildrenWrapper = styled(Paper)`
  padding: 16px 16px 28px 16px;
  margin-bottom: 32px;
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
