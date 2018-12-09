// @flow

import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  padding: 96px 28px 0 28px;
  overflow: scroll;
`;

type Props = {
  children: Object,
};

const ContainerWrapper = ({ children }: Props): Object => (
  <Container>
    {children}
  </Container>
);

export default ContainerWrapper;
