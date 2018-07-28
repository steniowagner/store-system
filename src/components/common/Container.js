import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #00f;
  height: 100%;
  margin-left: 220px;
  padding: 36px;
`;

type Props = {
  children: React.Node,
};

const Container = ({ children }: Props) => (
  <Wrapper>
    {children}
  </Wrapper>
);

export default Container;
