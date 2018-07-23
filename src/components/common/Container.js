import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #00F;  
  height: 100%;
  margin-left: 300px;
  padding: 36px;
`;

const Container = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
);

export default Container;
