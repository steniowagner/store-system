import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-left: ${({ theme }) => theme.metrics.sideBarWidth}px;
  padding-top: ${({ theme }) => theme.metrics.containerVerticalPadding}px;
  padding-bottom: ${({ theme }) => theme.metrics.containerVerticalPadding}px;
  padding-left: ${({ theme }) => theme.metrics.containerHorizontalPadding}px;
  padding-right: ${({ theme }) => theme.metrics.containerHorizontalPadding}px;
`;

type Props = {
  children: Object,
};

const ContainerWrapper = ({ children }: Props): Object => (
  <Wrapper>
    {children}
  </Wrapper>
);

export default ContainerWrapper;
