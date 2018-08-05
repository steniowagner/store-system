import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-left: 220px;
  padding: 36px;
  height: 100%;
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
